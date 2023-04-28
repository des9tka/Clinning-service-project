from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from typing import Type

from core.pagination.page_pagination import OrderPagePagination, UserPagePagination
from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService

from django.contrib.auth import get_user_model
from django.core.cache import cache
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
    """
    get:
        List all users.
    post:
        Create new user.

    (provided filter)
    """
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
        queryset = UserModel.objects.all()
        if self.request.method == 'GET':
            search_query = self.request.GET.get('searcher', '')

            if search_query and search_query != '':
                if search_query.isnumeric():
                    queryset = queryset.filter(
                        Q(id__exact=int(search_query)) |
                        Q(service_id__exact=int(search_query)) |
                        Q(profile__age__lte=int(search_query)) |
                        Q(profile__phone__exact=int(search_query)) |
                        Q(profile__rating__exact=float(search_query))
                    )
                else:
                    queryset = queryset.filter(
                        Q(email__icontains=search_query) |
                        Q(profile__name__icontains=search_query) |
                        Q(profile__surname__icontains=search_query) |
                        Q(profile__name__icontains=search_query)
                    )
                return queryset


class ChangeUserServiceView(GenericAPIView):
    """
    Changing service to making an order.
    """

    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        user = self.request.user
        service = get_object_or_404(ServiceModel, pk=pk)
        user.service = service
        user.save()
        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status.HTTP_200_OK)


class ChangeEmployeeServiceView(GenericAPIView):
    """
    Changing service of employee.
    """
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
    """
    Changing status of user - from employee to user.
    """

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
    """
        Changing status of user - from user to employee.
    """

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
    """
        Changing active status of user, from false to true.
    """

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UserDeactivateView(AdminTools, ABC):
    """
        Changing active status of user, from true to false.
    """

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
    """
    Making an order by user.
    """

    def post(self, *args, **kwargs):
        data = self.request.data
        user = self.request.user
        files = self.request.FILES
        service = self.request.user.service
        order_serializer = OrderSerializer(data=data)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save(user=user, service=service, rating=user.profile.rating)
        order = OrderModel.objects.latest('id')
        for key in files:
            serializer = OrderPhotoSerializer(data={'photos': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(order=order)
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class ProfileUpdateView(UpdateAPIView):
    """
    Patch the profile of user.
    """
    serializer_class = ProfileSerializer
    http_method_names = ('patch',)

    def get_object(self):
        if not hasattr(self.request.user, 'profile'):
            data = self.request.data
            serializer = ProfileSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=self.request.user)
        return self.request.user.profile


class RetrieveDestroyUserView(RetrieveDestroyAPIView):
    """
    get:
        List user by id.
    delete:
        Delete user by Id.
    """
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = AllowAny,


class AddUserPhotoView(UpdateAPIView):
    """
    Add photo to profile user.
    """
    queryset = UserModel.objects.all()
    serializer_class = UserPhotoSerializer

    def get_object(self):
        return self.request.user.profile


class ListUserOrdersView(ListAPIView):
    """
    List user`s orders.
    """
    pagination_class = OrderPagePagination
    serializer_class = OrderSerializer
    filterset_class = OrderFilter

    def get_queryset(self):
        return OrderModel.objects.filter(user_id=self.request.user.id)


class DeleteUserView(DestroyAPIView):
    """
    Delete user by Id.
    """
    permission_classes = IsSuperUser,
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class GetSelfUserView(GenericAPIView):
    """
    List self request user.
    """

    def get(self, *args, **kwargs):
        user = self.request.user
        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status.HTTP_200_OK)


class GetUserByTokenView(GenericAPIView):
    """
    List user by token.
    """
    permission_classes = AllowAny,

    def get(self, *args, **kwargs):
        token = kwargs.get('token')
        user = JWTService.validate_token(token, ActivateToken)
        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status.HTTP_200_OK)


class ListBestEmployeeView(ListAPIView):
    """
    List best 5 employees.
    """
    permission_classes = AllowAny,
    queryset = UserModel
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        return UserModel.objects.filter(is_employee='True', is_superuser='False').order_by('-profile__rating')[:5]


class EmployeeRejectRequestView(GenericAPIView):
    """
    Request for reject order from employee side.
    """
    def post(self, *args, **kwargs):
        pk = kwargs.get('pk')
        message = self.request.data.get('reason', None)
        employee = self.request.user

        cache_key = f"employee_request_reject:{employee.email}/{pk}"
        last_request_time = cache.get(cache_key)
        if last_request_time and (datetime.now() - last_request_time) < timedelta(minutes=10):
            return Response('You can do only one request every 10 minutes.', status=status.HTTP_403_FORBIDDEN)

        admin = UserModel.objects.filter(is_staff='True', service_id=employee.service).order_by('?').first()
        EmailService.request_of_reject(admin, employee, message, pk)
        cache.set(cache_key, datetime.now(), timeout=600)
        return Response(status=status.HTTP_200_OK)

