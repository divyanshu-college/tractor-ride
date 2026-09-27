from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = [
            'id',
            'farmer',
            'tractor',
            'service_type',
            'date',
            'hours',
            'location',
            'status',
            'total_price',
            'created_at'
        ]

        read_only_fields = ['status', 'created_at']