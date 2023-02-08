from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.orders.serializers import OrderSerializer

from ..orders.models import OrderModel
from .models import ServiceModel
from .serializers import ServiceSerializer


class ServiceListCreateView(ListCreateAPIView):
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = AllowAny,


class ServiceOrdersView(GenericAPIView):

    def get(self, *args, **kwargs):
        service_id = self.request.user.service.id
        orders = OrderModel.objects.filter(service=service_id)
        serializer = OrderSerializer(instance=orders, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class ServiceOrderRetrieveView(GenericAPIView):
    permission_classes = AllowAny,

    def get(self, *args, **kwargs):
        pk = kwargs['pk']
        orders = OrderModel.objects.filter(service=pk)
        serializer = OrderSerializer(instance=orders, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
