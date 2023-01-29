from django.urls import path

from .views import ServiceListCreateView

urlpatterns = [
    path('', ServiceListCreateView.as_view()),
]
