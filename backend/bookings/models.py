from django.db import models
from users.models import User
from tractors.models import Tractor


class Booking(models.Model):

    SERVICE_CHOICES = (
        ('ploughing', 'Ploughing'),
        ('sowing', 'Sowing'),
        ('harvesting', 'Harvesting'),
        ('loading', 'Loading'),
    )

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    farmer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    tractor = models.ForeignKey(
        Tractor,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    service_type = models.CharField(
        max_length=20,
        choices=SERVICE_CHOICES
    )

    date = models.DateField()
    hours = models.PositiveIntegerField()
    location = models.CharField(max_length=200)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.farmer.username} - {self.tractor.model}"
