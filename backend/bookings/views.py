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

        if request.user.role != "farmer":

            return Response(
                {
                    "error": "Only farmers can create bookings"
                },
                status=status.HTTP_403_FORBIDDEN
            )

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