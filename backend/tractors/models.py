
from django.db import models
from users.models import User


class Tractor(models.Model):

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tractors'
    )

    model = models.CharField(max_length=100)
    tractor_number = models.CharField(max_length=50, unique=True)
    price_per_hour = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    location = models.CharField(max_length=200)
    available = models.BooleanField(default=True)

    # Tractor Image
    image = models.ImageField(
        upload_to="tractors/",
        blank=True,
        null=True
    )

    # Tractor Video
    video = models.FileField(
        upload_to="tractor_videos/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.model
