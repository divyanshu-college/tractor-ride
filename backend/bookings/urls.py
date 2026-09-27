from django.urls import path
from .views import BookingListCreateView, BookingActionView


urlpatterns = [
    path('', BookingListCreateView.as_view()),

    path(
        '<int:pk>/<str:action>/',
        BookingActionView.as_view()
    ),
]