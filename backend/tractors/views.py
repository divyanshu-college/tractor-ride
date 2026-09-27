from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tractor
from .serializers import TractorSerializer


class TractorListCreateView(APIView):

    def get(self, request):

        tractors = Tractor.objects.all()

        serializer = TractorSerializer(tractors, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = TractorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

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

    def get(self, request, pk):

        try:
            tractor = Tractor.objects.get(id=pk)
        except Tractor.DoesNotExist:
            return Response(
                {"error": "Tractor not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TractorSerializer(tractor)

        return Response(serializer.data)

    def put(self, request, pk):

        try:
            tractor = Tractor.objects.get(id=pk)
        except Tractor.DoesNotExist:
            return Response(
                {"error": "Tractor not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TractorSerializer(
            tractor,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response({
                "message": "Tractor updated successfully",
                "tractor": serializer.data
            })

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):

        try:
            tractor = Tractor.objects.get(id=pk)
        except Tractor.DoesNotExist:
            return Response(
                {"error": "Tractor not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        tractor.delete()

        return Response({
            "message": "Tractor deleted successfully"
        })