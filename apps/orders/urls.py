from django.urls import path

from .views import AddUserOrderToEmployeeView, OrderListView, PatchTheOrderView

urlpatterns = [
    path('', OrderListView.as_view()),
    path('/<int:pk>/patch', PatchTheOrderView.as_view()),
    path('/<int:pk>/take', AddUserOrderToEmployeeView.as_view())
]