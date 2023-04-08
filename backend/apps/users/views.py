from abc import ABC, abstractmethod
from typing import Type

from core.pagination.page_pagination import OrderPagePagination, UserPagePagination

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import (
    DestroyAPIView,
    GenericAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveDestroyAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from apps.c_services.models import ServiceModel
from apps.orders.models import OrderModel
from apps.orders.serializers import OrderPhotoSerializer, OrderSerializer
from apps.users.models import UserModel as User

from ..orders.filters import OrderFilter
from .filters import UserFilter
from .permissions import IsSuperUser
from .serializers import ProfileSerializer, UserPhotoSerializer, UserSerializer

UserModel: Type[User] = get_user_model()


class UserListCreateView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    pagination_class = UserPagePagination
    filterset_class = UserFilter

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        if self.request.method == 'GET':
            return [IsAdminUser()]

    def get_queryset(self):
        search_query = self.request.GET.get('searcher', '')

        try:
            query = int(search_query)
            queryset = User.objects.filter(
                Q(id__lte=query) |
                Q(profile__rating__lte=query) |
                Q(profile__age__lte=query) |
                Q(profile__phone__exact=query)
            )
            print(query)
            return queryset
        except (Exception,):
            print(Exception)

        queryset = User.objects.filter(
            Q(email__icontains=search_query) |
            Q(profile__name__icontains=search_query) |
            Q(profile__surname__icontains=search_query)
        )
        return queryset


class ChangeUserServiceView(GenericAPIView):
    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        print(pk)
        user = self.request.user
        service = get_object_or_404(ServiceModel, pk=pk)
        user.service = service
        user.save()
        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status.HTTP_200_OK)


class ChangeEmployeeServiceView(GenericAPIView):
    permission_classes = IsSuperUser,

    def patch(self, *args, **kwargs):
        try:
            user_id = kwargs.get('user')
            service_id = kwargs.get('service')
        except (Exception,):
            return Response('ERROR: Values not provided', status.HTTP_400_BAD_REQUEST)
        service = get_object_or_404(ServiceModel, pk=service_id)
        user = get_object_or_404(UserModel, pk=user_id)
        user.service = service
        user.save()
        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status.HTTP_200_OK)


class AdminTools(GenericAPIView, ABC):
    queryset = UserModel.objects.all()
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return UserModel.objects.exclude(pk=self.request.user.id)

    @abstractmethod
    def patch(self, *args, **kwargs):
        pass


class SuperUserTools(AdminTools, ABC):
    permission_classes = (IsSuperUser,)


class ToAdminView(SuperUserTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_staff:
            user.is_staff = True
            user.is_employee = False
            OrderModel.objects.filter(user_id=user.id).delete()
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class ToUserView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if user.is_staff or user.is_employee and not user.is_superuser:
            user.is_staff = False
            user.is_employee = False
            OrderModel.objects.filter(user_id=user.id).delete()
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class ToEmployeeView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_employee:
            user.is_employee = True
            user.is_staff = False
            OrderModel.objects.filter(user_id=user.id).delete()
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UserActivateView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UserDeactivateView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        print(user.is_active)
        if user.is_active:
            user.is_active = False
            user.save()
        serializer = UserSerializer(user)
        print(user)
        return Response(serializer.data, status.HTTP_200_OK)


class AddOrderToUserView(GenericAPIView):
    def post(self, *args, **kwargs):
        data = self.request.data
        user = self.request.user
        files = self.request.FILES
        service = self.request.user.service
        order_serializer = OrderSerializer(data=data)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save(user=user, service=service, rating=user.profile.rating)
        files = self.request.FILES
        order = OrderModel.objects.latest('id')
        for key in files:
            serializer = OrderPhotoSerializer(data={'photos': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(order=order)
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class ProfileUpdateView(UpdateAPIView):
    serializer_class = ProfileSerializer
    http_method_names = ('patch',)

    def get_object(self):
        return self.request.user.profile


class RetrieveDestroyUserView(RetrieveDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = AllowAny,


class AddUserPhotoView(UpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserPhotoSerializer

    def get_object(self):
        return self.request.user.profile


class ListUserOrdersView(ListAPIView):
    pagination_class = OrderPagePagination
    serializer_class = OrderSerializer
    filterset_class = OrderFilter

    def get_queryset(self):
        return OrderModel.objects.filter(user_id=self.request.user.id)


class DeleteUserView(DestroyAPIView):
    permission_classes = IsSuperUser,
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class GetSelfUserView(GenericAPIView):
    def get(self, *args, **kwargs):
        user = self.request.user
        serializer = UserSerializer(instance=user)
        return Response(serializer.data)
