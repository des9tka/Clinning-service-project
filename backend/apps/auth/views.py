import os
import time
from datetime import datetime, timedelta

from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import check_password
from django.core.cache import cache
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.users.models import UserModel

from .serializers import CustomTokenObtainPairSerializer, EmailSerializer, PasswordSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Creating a pairs tokens.
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class ActivateUserByTokenView(GenericAPIView):
    """
    Self changing 'active' status of user by token, from false to true.
    """
    permission_classes = AllowAny,

    def patch(self, *args, **kwargs):
        token = kwargs.get('token')
        user = JWTService.validate_token(token, ActivateToken)
        user.is_active = True
        user.save()
        return Response('activated', status.HTTP_200_OK)


class RequestRecoveryPasswordView(GenericAPIView):
    """
    Request of recovery password link to email.
    """
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, email=serializer.data['email'])

        cache_key = f"password_recovery:{user.email}"
        last_request_time = cache.get(cache_key)
        if last_request_time and (datetime.now() - last_request_time) < timedelta(minutes=10):
            print(1)
            return Response('You can do only one request every 10 minutes.', status=status.HTTP_403_FORBIDDEN)

        EmailService.recovery_password_by_email(user)
        cache.set(cache_key, datetime.now(), timeout=600)

        return Response(status=status.HTTP_200_OK)


class RecoveryPasswordByTokenView(GenericAPIView):
    """
    Changing password by token.
    """
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        token = kwargs.get('token')
        data = self.request.data
        serializer = PasswordSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except (Exception,):
            return Response('Invalid email or password.', status=status.HTTP_400_BAD_REQUEST)

        user = JWTService.validate_token(token, RecoveryToken)
        old_password = user.password

        if check_password(serializer.data['password'], old_password):
            return Response('Same password.', status.HTTP_400_BAD_REQUEST)
        else:
            user.set_password(serializer.data['password'])
            user.save()
            EmailService.password_changed(user)
        return Response(status=status.HTTP_200_OK)


class TokenValidCheck(GenericAPIView):
    """
    Checking of valid token.
    """
    def get(self, *args, **kwargs):
        return Response('Authenticated')


class StripeTokenView(GenericAPIView):
    def get(self, *args, **kwargs):
        stripe_token = os.environ.get('STRIPE_PUBLIC_KEY')
        return Response(stripe_token, status=status.HTTP_200_OK)


class RequestOfActivationLinkView(GenericAPIView):
    """
     Request of activation link to email.
    """
    permission_classes = AllowAny,

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(UserModel, email=self.request.data.get('email'))

        cache_key = f'request_activation_{user.id}'
        last_request = cache.get(cache_key)

        if last_request and (last_request + 300) > time.time():
            return Response('You can make only one request every 5 minutes.', status.HTTP_403_FORBIDDEN)

        EmailService.activate_request(user)
        cache.set(cache_key, time.time())

        return Response('Activation link has been sent.', status.HTTP_200_OK)
