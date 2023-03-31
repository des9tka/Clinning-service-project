import json

from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken

from django.contrib.auth.hashers import check_password

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.users.models import UserModel

from .serializers import EmailSerializer, PasswordSerializer


class ActivateUserByTokenView(GenericAPIView):
    permission_classes = AllowAny,

    def get(self, *args, **kwargs):
        token = kwargs.get('token')
        user = JWTService.validate_token(token, ActivateToken)
        user.is_active = True
        user.save()
        return Response('activated', status.HTTP_200_OK)


class RequestRecoveryPasswordView(GenericAPIView):
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = UserModel.objects.find_by_email(email=serializer.data['email'])
        EmailService.recovery_password_by_email(user)
        return Response(status=status.HTTP_200_OK)


class RecoveryPasswordByTokenView(GenericAPIView):
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        token = kwargs.get('token')
        data = self.request.data
        serializer = PasswordSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except (Exception,):
            return Response('Invalid password.', status=status.HTTP_400_BAD_REQUEST)

        user = JWTService.validate_token(token, RecoveryToken)
        old_password = user.password

        if check_password(serializer.data['password'], old_password):
            new_token = JWTService.create_token(user, RecoveryToken)
            return Response(str(new_token), status.HTTP_400_BAD_REQUEST)
        else:
            user.set_password(serializer.data['password'])
            user.save()
        return Response(status=status.HTTP_200_OK)


class TokenValidCheck(GenericAPIView):
    def get(self, *args, **kwargs):
        return Response('Authenticated')
