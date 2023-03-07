from core.pagination.page_pagination import OrderPagePagination

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import DestroyAPIView, GenericAPIView, ListAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.users.models import UserModel

from .filters import OrderFilter
from .models import OrderModel, OrderStatusModel
from .serializers import OrderPhotoSerializer, OrderSerializer, OrderStatusSerializer


class OrderListView(ListAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = AllowAny,
    pagination_class = OrderPagePagination
    filterset_class = OrderFilter


class AddUserOrderToEmployeeView(GenericAPIView):
    queryset = OrderModel.objects.all()

    def patch(self, *args, **kwargs):
        user = self.request.user
        order = self.get_object()

        order.employees_current.add(user)
        order.save()

        order_status_approved = OrderStatusModel.objects.get(name='approved')
        order_status_taken = OrderStatusModel.objects.get(name='taken')
        employees_quantity = order.employees_quantity
        employees_current = OrderModel.objects.filter(id=order.id).values('employees_current').count()

        if employees_current == employees_quantity and order.status == order_status_approved:
            order.status = order_status_taken
            order.save()

        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class PatchTheOrderView(GenericAPIView):
    queryset = OrderModel
    permission_classes = AllowAny,

    def patch(self, *args, **kwargs):
        data = self.request.data
        order = self.get_object()
        serializer = OrderSerializer(order, data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)


class RemoveEmployeeFromOrder(GenericAPIView):
    permission_classes = AllowAny,

    def patch(self, *arks, **kwargs):
        pk = kwargs['pk']
        user_id = kwargs['user']
        order = get_object_or_404(OrderModel, pk=pk)
        user = get_object_or_404(UserModel, pk=user_id)
        order_status = OrderStatusModel.objects.get(name='pending')
        order.employees.remove(user)
        order.status = order_status
        order.save()
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class RejectOrderView(GenericAPIView):
    permission_classes = AllowAny,

    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        order = get_object_or_404(OrderModel, pk=pk)
        order_status = OrderStatusModel.objects.get(name='rejected')
        order.status = order_status
        order.save()
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class ApproveOrderView(GenericAPIView):

    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        order = get_object_or_404(OrderModel, pk=pk)
        order_status = OrderStatusModel.objects.get(name='approved')
        order.status = order_status
        order.save()
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class OrderStatusListCreateView(ListCreateAPIView):
    queryset = OrderStatusModel.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = AllowAny,


class AddPhotoToOrder(GenericAPIView):
    queryset = OrderModel.objects.all()
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        order = self.get_object()
        files = self.request.FILES
        for key in files:
            serializer = OrderPhotoSerializer(data={'photos': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(order=order)
        order_serializer = OrderSerializer(instance=order)
        return Response(order_serializer.data, status.HTTP_200_OK)


class DeleteOrderView(DestroyAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = AllowAny,
