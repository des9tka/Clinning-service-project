from django.urls import path

from .views import ChangeUserService, UserListCreateView

urlpatterns = [
    path('', UserListCreateView.as_view()),
    path('/change_service/<int:pk>', ChangeUserService.as_view())
]