from core.pagination.page_pagination import OrderPagePagination, ServicePagePagination

from rest_framework import status
from rest_framework.generics import (
    DestroyAPIView,
    GenericAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.orders.serializers import OrderSerializer
from apps.users.permissions import IsSuperUser

from ..orders.models import OrderModel
from .models import ServiceModel
from .serializers import ServicePhotoSerializer, ServiceSerializer


class ServiceListCreateView(ListCreateAPIView):
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer
    pagination_class = ServicePagePagination

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsSuperUser()]
        else:
            return super().get_permissions()


class ServiceOrdersView(ListAPIView):
    pagination_class = OrderPagePagination
    serializer_class = OrderSerializer

    def get_queryset(self):
        service_id = self.request.user.service.id
        return OrderModel.objects.filter(service=service_id)


class ServiceOrderRetrieveView(GenericAPIView):
    permission_classes = AllowAny,

    def get(self, *args, **kwargs):
        pk = kwargs['pk']
        orders = OrderModel.objects.filter(service=pk)
        serializer = OrderSerializer(instance=orders, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class ServiceRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    permission_classes = IsSuperUser,
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer


class AddPhotoToService(GenericAPIView):
    queryset = ServiceModel.objects.all()
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        service = self.get_object()
        files = self.request.FILES
        print(files)
        for key in files:
            serializer = ServicePhotoSerializer(data={'photos': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(service=service)
        service_serializer = ServiceSerializer(instance=service)
        return Response(service_serializer.data, status.HTTP_200_OK)


