from django.urls import path

from .views import (
    AddPhotoToOrder,
    AddUserOrderToEmployeeView,
    EmployeeDoneOrderView,
    EmployeeOrdersView,
    GetOrderEmployeeView,
    OrderListView,
    OrderStatusListCreateView,
    PatchTheOrderView,
    RejectOrderView,
    RemoveEmployeeFromOrder,
    RetrieveDeleteOrderView,
    StripePaymentIntentView,
    UserConfirmOrderView,
)

urlpatterns = [
    path('', OrderListView.as_view()),
    path('/employee_orders', EmployeeOrdersView.as_view()),
    path('/<int:pk>/patch', PatchTheOrderView.as_view()),
    path('/<int:pk>/employees', GetOrderEmployeeView.as_view()),
    path('/<int:pk>/take', AddUserOrderToEmployeeView.as_view()),
    path('/statuses', OrderStatusListCreateView.as_view()),
    path('/<int:pk>/remove/<int:user>', RemoveEmployeeFromOrder.as_view()),
    path('/<int:pk>/reject', RejectOrderView.as_view()),
    path('/<int:pk>/confirm', UserConfirmOrderView.as_view()),
    path('/<int:pk>/add_photos', AddPhotoToOrder.as_view()),
    path('/<int:pk>', RetrieveDeleteOrderView.as_view()),
    path('/<int:pk>/done/<str:rate>', EmployeeDoneOrderView.as_view()),
    path('/<int:pk>/payment/<str:rate>', StripePaymentIntentView.as_view()),

]
