from abc import ABC, abstractmethod
from typing import Type

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from apps.services.models import ServiceModel
from apps.users.models import UserModel as User

from .models import ProfileModel
from .permissions import IsSuperUser
from .serializers import ProfileSerializer, UserSerializer

UserModel: Type[User] = get_user_model()


class UserListCreateView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return AllowAny(),
        if self.request.method == 'GET':
            return IsAdminUser(),
        return IsAuthenticated(),


class ChangeUserService(GenericAPIView):
    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        user = self.request.user
        service = get_object_or_404(ServiceModel, pk=pk)
        user.service = service
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


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


class UserToAdminView(SuperUserTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_staff:
            user.is_staff = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class AdminToUserView(SuperUserTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if user.is_staff:
            user.is_staff = False
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserToEmployeeView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_employee:
            user.is_employee = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class EmployeeToUserView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if user.is_employee:
            user.is_employee = False
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserActivateView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserDeactivateView(AdminTools, ABC):

    def patch(self, *args, **kwargs):
        user: User = self.get_object()
        print(user.is_active)
        if user.is_active:
            user.is_active = False
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
