from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ('farmer', 'Farmer'),
        ('owner', 'Tractor Owner'),
    )

    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )
    location = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.username