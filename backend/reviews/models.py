from django.db import models
from users.models import User
from tractors.models import Tractor
from bookings.models import Booking


class Review(models.Model):

    farmer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews_given"
    )

    tractor = models.ForeignKey(
        Tractor,
        on_delete=models.CASCADE,
        related_name="reviews"
    )

    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name="review"
    )

    rating = models.PositiveIntegerField()

    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.farmer.username} - {self.tractor.model} - {self.rating}"