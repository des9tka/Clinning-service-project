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
    path('', OrderListView.as_view(), name='orders_list'),
    path('/employee_orders', EmployeeOrdersView.as_view(), name='orders_list_employee_orders'),
    path('/<int:pk>/patch', PatchTheOrderView.as_view(), name='orders_patch'),
    path('/<int:pk>/employees', GetOrderEmployeeView.as_view(), name='orders_list_all_orders_employee'),
    path('/<int:pk>/take', AddUserOrderToEmployeeView.as_view(), name='orders_take_order_by_employee'),
    path('/statuses', OrderStatusListCreateView.as_view(), name='orders_list_create_order_statuses'),
    path('/<int:pk>/remove/<int:user>', RemoveEmployeeFromOrder.as_view(), name='orders_remove_employee_from_order'),
    path('/<int:pk>/reject', RejectOrderView.as_view(), name='orders_reject'),
    path('/<int:pk>/confirm', UserConfirmOrderView.as_view(), name='orders_confirm'),
    path('/<int:pk>/add_photos', AddPhotoToOrder.as_view(), name='orders_add_photo'),
    path('/<int:pk>', RetrieveDeleteOrderView.as_view(), name='orders_get_by_id'),
    path('/<int:pk>/done/<str:rate>', EmployeeDoneOrderView.as_view(), name='orders_done_and_rate_order'),
    path('/<int:pk>/payment/<str:rate>', StripePaymentIntentView.as_view(), name='orders_pay_and_rate_employee'),

]
