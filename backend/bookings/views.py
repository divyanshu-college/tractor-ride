from datetime import date

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Booking
from .serializers import BookingSerializer


class BookingListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role == "farmer":

            bookings = Booking.objects.filter(
                farmer=request.user
            )

        elif request.user.role == "owner":

            bookings = Booking.objects.filter(
                tractor__owner=request.user
            )

        else:

            bookings = Booking.objects.none()

        serializer = BookingSerializer(
            bookings,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        # Only farmer can create booking
        if request.user.role != "farmer":

            return Response(
                {
                    "error": "Only farmers can create bookings"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Check required data
        tractor_id = request.data.get("tractor")
        booking_date = request.data.get("date")
        hours = request.data.get("hours")

        if not tractor_id:

            return Response(
                {
                    "error": "Tractor is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not booking_date:

            return Response(
                {
                    "error": "Date is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not hours:

            return Response(
                {
                    "error": "Hours is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check hours
        try:
            hours = int(hours)

        except ValueError:

            return Response(
                {
                    "error": "Hours must be a valid number"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if hours <= 0:

            return Response(
                {
                    "error": "Hours must be greater than 0"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check date
        try:
            booking_date_obj = date.fromisoformat(booking_date)

        except ValueError:

            return Response(
                {
                    "error": "Invalid date format"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if booking_date_obj < date.today():

            return Response(
                {
                    "error": "You cannot book a tractor for a past date"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check tractor
        try:
            from tractors.models import Tractor

            tractor = Tractor.objects.get(
                id=tractor_id
            )

        except Tractor.DoesNotExist:

            return Response(
                {
                    "error": "Tractor not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Check tractor availability
        if not tractor.available:

            return Response(
                {
                    "error": "This tractor is currently unavailable"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check duplicate booking
        existing_booking = Booking.objects.filter(
            tractor=tractor,
            date=booking_date_obj,
            status__in=["pending", "accepted"]
        ).exists()

        if existing_booking:

            return Response(
                {
                    "error": "This tractor is already booked for this date"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create booking
        serializer = BookingSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                farmer=request.user
            )

            return Response(
                {
                    "message": "Booking created successfully",
                    "booking": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class BookingActionView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk, action):

        try:
            booking = Booking.objects.get(id=pk)

        except Booking.DoesNotExist:

            return Response(
                {
                    "error": "Booking not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if action == "accept":

            if request.user != booking.tractor.owner:

                return Response(
                    {
                        "error": "Only tractor owner can accept booking"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

            if booking.status != "pending":

                return Response(
                    {
                        "error": "Only pending bookings can be accepted"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            booking.status = "accepted"
            booking.tractor.available = True
            booking.tractor.save()

        elif action == "reject":

            if request.user != booking.tractor.owner:

                return Response(
                    {
                        "error": "Only tractor owner can reject booking"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

            if booking.status != "pending":

                return Response(
                    {
                        "error": "Only pending bookings can be rejected"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            booking.status = "rejected"

        elif action == "complete":

            if request.user != booking.tractor.owner:

                return Response(
                    {
                        "error": "Only tractor owner can complete booking"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

            if booking.status != "accepted":

                return Response(
                    {
                        "error": "Only accepted bookings can be completed"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            booking.status = "completed"

            booking.tractor.available = True
            booking.tractor.save()

        elif action == "cancel":

            if request.user != booking.farmer:

                return Response(
                    {
                        "error": "Only farmer can cancel booking"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

            if booking.status not in ["pending", "accepted"]:

                return Response(
                    {
                        "error": "This booking cannot be cancelled"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            booking.status = "cancelled"

        else:

            return Response(
                {
                    "error": "Invalid action"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.save()

        return Response(
            {
                "message": f"Booking {action}ed successfully",
                "status": booking.status
            }
        )