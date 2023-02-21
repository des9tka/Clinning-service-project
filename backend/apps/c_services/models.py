from django.core import validators as V
from django.db import models

from apps.extra_tools.enums import RegEx


class ServiceModel(models.Model):

    class Meta:
        db_table = 'c_services'
        ordering = ['id']

    name = models.CharField(max_length=30, validators=[
        V.RegexValidator(RegEx.SERVICE_CALL.pattern, RegEx.SERVICE_CALL.message)
    ])
    address = models.CharField(max_length=128)
    photos = models.ImageField
