from django.urls import path
from .views import TractorListCreateView, TractorDetailView


urlpatterns = [
    path('', TractorListCreateView.as_view()),
    path('<int:pk>/', TractorDetailView.as_view()),
]