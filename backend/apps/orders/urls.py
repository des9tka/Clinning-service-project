from django.urls import path

from .views import (
    AddPhotoToOrder,
    AddUserOrderToEmployeeView,
    ApproveOrderView,
    DeleteOrderView,
    OrderListView,
    OrderStatusListCreateView,
    PatchTheOrderView,
    RejectOrderView,
    RemoveEmployeeFromOrder,
)

urlpatterns = [
    path('', OrderListView.as_view()),
    path('/<int:pk>/patch', PatchTheOrderView.as_view()),
    path('/<int:pk>/take', AddUserOrderToEmployeeView.as_view()),
    path('/statuses', OrderStatusListCreateView.as_view()),
    path('/<int:pk>/remove/<int:user>', RemoveEmployeeFromOrder.as_view()),
    path('/<int:pk>/reject', RejectOrderView.as_view()),
    path('/<int:pk>/approve', ApproveOrderView.as_view()),
    path('/<int:pk>/add_photos', AddPhotoToOrder.as_view()),
    path('/<int:pk>/delete', DeleteOrderView.as_view()),


]