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

        read_only_fields = [
            'id',
            'farmer',
            'status',
            'total_price',
            'created_at'
        ]

    def create(self, validated_data):

        tractor = validated_data['tractor']
        hours = validated_data['hours']

        total_price = tractor.price_per_hour * hours

        validated_data['total_price'] = total_price

        return Booking.objects.create(
            **validated_data
        )