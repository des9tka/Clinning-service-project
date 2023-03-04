from core.enums.validation_enums import RegEx

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core import validators as V
from django.db import models

from apps.c_services.models import ServiceModel

from ..extra_tools.services import upload_users_photos
from .managers import UserManager


class UserModel(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'auth_user'
        ordering = ['id']

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, validators=[
        V.RegexValidator(RegEx.PASSWORD.pattern, RegEx.PASSWORD.message)
    ])
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

    name = models.CharField(max_length=30, validators=[
        V.RegexValidator(RegEx.NAME_SURNAME.pattern, RegEx.NAME_SURNAME.message)
    ])
    surname = models.CharField(max_length=30, validators=[
        V.RegexValidator(RegEx.NAME_SURNAME.pattern, RegEx.NAME_SURNAME.message)
    ])
    age = models.IntegerField(validators=[
        V.RegexValidator(RegEx.AGE.pattern, RegEx.AGE.message)
    ])
    phone = models.BigIntegerField(validators=[
        V.RegexValidator(RegEx.PHONE.pattern, RegEx.PHONE.message)
    ])
    user_photo = models.ImageField(upload_to=upload_users_photos, blank=True, max_length=500)
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')

