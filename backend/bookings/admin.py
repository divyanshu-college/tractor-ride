from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = [
        'id',
        'farmer',
        'tractor',
        'service_type',
        'date',
        'hours',
        'status',
        'total_price',
        'created_at'
    ]

    list_filter = [
        'status',
        'service_type',
        'date'
    ]

    search_fields = [
        'farmer__username',
        'tractor__model',
        'tractor__tractor_number'
    ]

    readonly_fields = [
        'total_price',
        'created_at'
    ]