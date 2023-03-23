from core.enums.validation_enums import RegEx

from django.core import validators as V
from django.db import models

from apps.extra_tools.services import upload_services_photos


class ServiceModel(models.Model):
    class Meta:
        db_table = 'services'
        ordering = ['id']

    name = models.CharField(max_length=30, validators=[
        V.RegexValidator(RegEx.SERVICE_V.pattern, RegEx.SERVICE_V.message)
    ])
    city = models.CharField(max_length=30, validators=[
        V.RegexValidator(RegEx.SERVICE_V.pattern, RegEx.SERVICE_V.message)
    ])
    address = models.CharField(max_length=128)


class PhotoServiceModel(models.Model):
    class Meta:
        db_table = 'services_photos'

    photos = models.ImageField(upload_to=upload_services_photos, max_length=500)
    service = models.ForeignKey(ServiceModel, on_delete=models.CASCADE, related_name='photos')
