from rest_framework import serializers
from .models import Tractor


class TractorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tractor
        fields = [
            'id',
            'owner',
            'model',
            'tractor_number',
            'price_per_hour',
            'location',
            'available'
        ]