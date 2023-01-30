from django.urls import path

from .views import (
    AdminToUserView,
    ChangeUserService,
    EmployeeToUserView,
    UserActivateView,
    UserDeactivateView,
    UserListCreateView,
    UserToAdminView,
    UserToEmployeeView,
)

urlpatterns = [
    path('', UserListCreateView.as_view()),
    path('/change_service/<int:pk>', ChangeUserService.as_view()),
    path('/<int:pk>/activate', UserActivateView.as_view()),
    path('/<int:pk>/deactivate', UserDeactivateView.as_view()),
    path('/<int:pk>/user_to_admin', UserToAdminView.as_view()),
    path('/<int:pk>/admin_to_user', AdminToUserView.as_view()),
    path('/<int:pk>/user_to_employee', UserToEmployeeView.as_view()),
    path('/<int:pk>/employee_to_user', EmployeeToUserView.as_view()),
]