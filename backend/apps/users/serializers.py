from typing import Type

from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework.serializers import ModelSerializer

from .models import ProfileModel
from .models import UserModel as User

from backend.apps.orders.serializers import OrderSerializer
from backend.core.services.email_service import EmailService

UserModel: Type[User] = get_user_model()


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = ('name', 'surname', 'age', 'phone')


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel

        fields = (
            'id', 'email', 'password', 'is_active', 'is_employee', 'is_staff', 'is_superuser', 'service', 'last_login', 'created_at', 'updated_at', 'profile', 'orders',
        )
        read_only_fields = (
            'id', 'is_active', 'is_staff', 'is_employee', 'is_superuser', 'last_login', 'service', 'created_at', 'updated_at'
        )
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    @transaction.atomic
    def create(self, validated_data: dict):
        profile = validated_data.pop('profile')
        user = UserModel.objects.create_user(**validated_data)
        ProfileModel.objects.create(**profile, user=user)
        EmailService.register_email(user)
        return user
