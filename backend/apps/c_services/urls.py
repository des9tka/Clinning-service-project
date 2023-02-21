from django.urls import path

from .views import ServiceListCreateView, ServiceOrderRetrieveView, ServiceOrdersView, ServiceRetrieveUpdateDestroyView

urlpatterns = [
    path('', ServiceListCreateView.as_view()),
    path('/orders', ServiceOrdersView.as_view()),
    path('/<int:pk>/orders', ServiceOrderRetrieveView.as_view()),
    path('/<int:pk>', ServiceRetrieveUpdateDestroyView.as_view())
]
