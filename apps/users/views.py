from typing import Type

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from apps.services.models import ServiceModel
from apps.services.serializers import ServiceSerializer
from apps.users.models import UserModel as User

from .serializers import UserSerializer

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
    queryset = UserModel

    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        user = self.request.user
        service = get_object_or_404(ServiceModel, pk=pk)
        user.service = service
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class AdminTools():
    pass


class UserToAdminView(AdminTools):
    pass


class AdminToUserView(GenericAPIView):
    pass


class UserToEmployeeView(GenericAPIView):
    pass


class EmployeeToUserView(GenericAPIView):
    pass

