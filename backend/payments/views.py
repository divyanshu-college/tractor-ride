
import razorpay
import hmac
import hashlib

from decimal import Decimal

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from bookings.models import Booking
from .models import Payment


User = get_user_model()


def get_razorpay_client():
    return razorpay.Client(
        auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET
        )
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment_order(request):
    booking_id = request.data.get("booking_id")

    if not booking_id:
        return Response(
            {"error": "booking_id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        booking = Booking.objects.get(
            id=booking_id,
            farmer=request.user
        )
    except Booking.DoesNotExist:
        return Response(
            {"error": "Booking not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if booking.status != "accepted":
        return Response(
            {"error": "Only accepted bookings can be paid"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not booking.total_price or booking.total_price <= 0:
        return Response(
            {"error": "Invalid booking amount"},
            status=status.HTTP_400_BAD_REQUEST
        )

    amount = Decimal(str(booking.total_price))

    # Razorpay accepts amount in paise (INR * 100)
    amount_paise = int(amount * 100)

    client = get_razorpay_client()

    try:
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "receipt": f"booking_{booking.id}"
        })
    except Exception:
        return Response(
            {"error": "Could not create payment order"},
            status=status.HTTP_502_BAD_GATEWAY
        )

    payment = Payment.objects.create(
        booking=booking,
        user=request.user,
        razorpay_order_id=order["id"],
        amount=amount,
        status="created"
    )

    return Response({
        "key": settings.RAZORPAY_KEY_ID,
        "order_id": order["id"],
        "amount": amount_paise,
        "currency": "INR",
        "payment_id": payment.id
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    order_id = request.data.get("razorpay_order_id")
    payment_id = request.data.get("razorpay_payment_id")
    signature = request.data.get("razorpay_signature")

    if not all([order_id, payment_id, signature]):
        return Response(
            {"error": "Payment verification fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        payment = Payment.objects.get(
            razorpay_order_id=order_id,
            user=request.user
        )
    except Payment.DoesNotExist:
        return Response(
            {"error": "Payment order not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Do not allow a successful payment record to be reused.
    if payment.status == "paid":
        return Response(
            {"message": "Payment already verified"},
            status=status.HTTP_200_OK
        )

    try:
        client = get_razorpay_client()

        client.utility.verify_payment_signature({
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": signature
        })
    except Exception:
        return Response(
            {"error": "Payment signature verification failed"},
            status=status.HTTP_400_BAD_REQUEST
        )

    payment.razorpay_payment_id = payment_id
    payment.status = "paid"
    payment.save(
        update_fields=[
            "razorpay_payment_id",
            "status"
        ]
    )

    return Response({
        "message": "Payment verified successfully",
        "status": payment.status
    })
