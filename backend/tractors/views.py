from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Tractor
from .serializers import TractorSerializer


class TractorListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role == "owner":

            # Owner ko sirf apne tractors dikhenge
            tractors = Tractor.objects.filter(
                owner=request.user
            )

        elif request.user.role == "farmer":

            # Farmer ko available tractors dikhenge
            tractors = Tractor.objects.filter(
                available=True
            )

        else:

            tractors = Tractor.objects.none()

        serializer = TractorSerializer(
            tractors,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        # Sirf owner tractor add kar sakta hai
        if request.user.role != "owner":

            return Response(
                {
                    "error": "Only tractor owners can add tractors"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = TractorSerializer(
            data=request.data
        )

        if serializer.is_valid():

            # Owner automatically current logged-in user hoga
            serializer.save(
                owner=request.user
            )

            return Response(
                {
                    "message": "Tractor added successfully",
                    "tractor": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class TractorDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            tractor = Tractor.objects.get(id=pk)

        except Tractor.DoesNotExist:

            return Response(
                {
                    "error": "Tractor not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TractorSerializer(tractor)

        return Response(serializer.data)

    def put(self, request, pk):

        try:
            tractor = Tractor.objects.get(id=pk)

        except Tractor.DoesNotExist:

            return Response(
                {
                    "error": "Tractor not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Sirf tractor ka owner update kar sakta hai
        if tractor.owner != request.user:

            return Response(
                {
                    "error": "You can update only your own tractor"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = TractorSerializer(
            tractor,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Tractor updated successfully",
                    "tractor": serializer.data
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):

        try:
            tractor = Tractor.objects.get(id=pk)

        except Tractor.DoesNotExist:

            return Response(
                {
                    "error": "Tractor not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Sirf owner apna tractor delete kar sakta hai
        if tractor.owner != request.user:

            return Response(
                {
                    "error": "You can delete only your own tractor"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        tractor.delete()

        return Response(
            {
                "message": "Tractor deleted successfully"
            }
        )