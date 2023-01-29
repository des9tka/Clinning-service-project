from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from apps.services.models import ServiceModel

from .managers import UserManager


class UserModel(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'auth_user'

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    service = models.ForeignKey(ServiceModel, on_delete=models.CASCADE, related_name='users', default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()


class ProfileModel(models.Model):
    class Meta:
        db_table = 'profiles'

    name = models.CharField(max_length=128)
    surname = models.CharField(max_length=128)
    age = models.IntegerField()
    phone = models.IntegerField()
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')

