from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Review
from .serializers import ReviewSerializer
from bookings.models import Booking


class ReviewListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role == "owner":

            reviews = Review.objects.filter(
                tractor__owner=request.user
            ).order_by("-created_at")

        elif request.user.role == "farmer":

            reviews = Review.objects.filter(
                farmer=request.user
            ).order_by("-created_at")

        else:

            reviews = Review.objects.none()

        serializer = ReviewSerializer(
            reviews,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        # Sirf farmer review de sakta hai
        if request.user.role != "farmer":

            return Response(
                {
                    "error": "Only farmers can give reviews"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        booking_id = request.data.get("booking")
        tractor_id = request.data.get("tractor")
        rating = request.data.get("rating")
        comment = request.data.get("comment", "")

        # Basic validation
        if not booking_id:

            return Response(
                {
                    "error": "Booking is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not tractor_id:

            return Response(
                {
                    "error": "Tractor is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not rating:

            return Response(
                {
                    "error": "Rating is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Rating check
        try:

            rating = int(rating)

        except ValueError:

            return Response(
                {
                    "error": "Rating must be a number"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if rating < 1 or rating > 5:

            return Response(
                {
                    "error": "Rating must be between 1 and 5"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Booking check
        try:

            booking = Booking.objects.get(
                id=booking_id
            )

        except Booking.DoesNotExist:

            return Response(
                {
                    "error": "Booking not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Booking farmer ki hi honi chahiye
        if booking.farmer != request.user:

            return Response(
                {
                    "error": "You can review only your own booking"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Booking completed honi chahiye
        if booking.status != "completed":

            return Response(
                {
                    "error": "You can review only completed bookings"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Tractor booking wala hi hona chahiye
        if booking.tractor.id != int(tractor_id):

            return Response(
                {
                    "error": "This tractor does not belong to this booking"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Already reviewed?
        if Review.objects.filter(
            booking=booking
        ).exists():

            return Response(
                {
                    "error": "This booking has already been reviewed"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create review
        review = Review.objects.create(
            farmer=request.user,
            tractor=booking.tractor,
            booking=booking,
            rating=rating,
            comment=comment
        )

        serializer = ReviewSerializer(review)

        return Response(
            {
                "message": "Review submitted successfully",
                "review": serializer.data
            },
            status=status.HTTP_201_CREATED
        )