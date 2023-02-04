from django.urls import path

from .views import ServiceListCreateView, ServiceOrdersView

urlpatterns = [
    path('', ServiceListCreateView.as_view()),
    path('/orders', ServiceOrdersView.as_view())
]
