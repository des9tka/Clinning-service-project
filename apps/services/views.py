from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.orders.serializers import OrderSerializer
from apps.users.models import UserModel
from apps.users.serializers import UserSerializer

from ..orders.models import OrderModel
from .models import ServiceModel
from .serializers import ServiceSerializer


class ServiceListCreateView(ListCreateAPIView):
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = AllowAny,


class ServiceOrdersView(GenericAPIView):
    # queryset = UserModel.objects.all()
    # serializer_class = UserSerializer
    # # orders = []
    #
    # # def get_queryset(self):
    # #     service_id = self.request.user.service.id
    # #     queryset = super().get_queryset()
    # #     queryset = queryset.filter(service=service_id)
    # #     return queryset
    # #
    # # def get(self, *args, **kwargs):
    # #     orders = self.queryset.all()
    # #     print(orders)
    # #     return Response('ok')
    #
    # def get(self, *args, **kwargs):
    #     service_id = self.request.user.service.id
    #     # orders_id = UserModel.objects.filter(service=service_id).values('orders')
    #     users = UserModel.objects.all().filter(service=service_id)
    #     user_serializer = UserSerializer(instance=users, many=True)
    #
    #     # for o in orders_id:
    #     #     pk = o.get('orders')
    #     #     print(pk)
    #     #     order = OrderModel.objects.filter(id=pk)
    #     #     print(order)
    #     #     serializer = OrderSerializer(instance=order)
    #     #     self.orders.append(serializer.data)
    #     print(user_serializer.)
    #     return Response('ok')

    def get(self, *args, **kwargs):
        service_id = self.request.user.service.id
        orders = OrderModel.objects.filter(service=service_id)
        print(orders)
        serializer = OrderSerializer(instance=orders, many=True)
        return Response(serializer.data)
