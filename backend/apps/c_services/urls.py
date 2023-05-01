from django.urls import path

from .views import AddPhotoToService, ServiceListCreateView, ServiceRetrieveUpdateDestroyView

urlpatterns = [
    path('', ServiceListCreateView.as_view(), name='services_list_create'),
    path('/<int:pk>', ServiceRetrieveUpdateDestroyView.as_view(), name='services_list_path_delete_by_id'),
    path('/<int:pk>/add_photos', AddPhotoToService.as_view(), name='services_add_photo'),
]
