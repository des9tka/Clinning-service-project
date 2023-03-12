from django.urls import path

from .views import (
    AddOrderToUserView,
    AddUserPhotoView,
    AdminToUserView,
    ChangeEmployeeServiceView,
    ChangeUserServiceView,
    DeleteUserView,
    EmployeeToUserView,
    GetSelfUserView,
    ListUserOrdersView,
    ProfileUpdateView,
    RetrieveDestroyUserView,
    UserActivateView,
    UserDeactivateView,
    UserListCreateView,
    UserToAdminView,
    UserToEmployeeView,
)

urlpatterns = [
    path('', UserListCreateView.as_view()),
    path('/orders', ListUserOrdersView.as_view()),
    path('/self', GetSelfUserView.as_view()),
    path('/change_service/<int:pk>', ChangeUserServiceView.as_view()),
    path('/<int:user>/change_employee_service/<int:service>', ChangeEmployeeServiceView.as_view()),
    path('/<int:pk>/activate', UserActivateView.as_view()),
    path('/<int:pk>/deactivate', UserDeactivateView.as_view()),
    path('/<int:pk>/user_to_admin', UserToAdminView.as_view()),
    path('/<int:pk>/admin_to_user', AdminToUserView.as_view()),
    path('/<int:pk>/user_to_employee', UserToEmployeeView.as_view()),
    path('/<int:pk>/employee_to_user', EmployeeToUserView.as_view()),
    path('/new_order', AddOrderToUserView.as_view()),
    path('/profile_update', ProfileUpdateView.as_view()),
    path('/<int:pk>', RetrieveDestroyUserView.as_view()),
    path('/add_photo', AddUserPhotoView.as_view()),
    path('/<int:pk>/delete', DeleteUserView.as_view()),

]