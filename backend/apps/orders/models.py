from core.enums.validation_enums import RegEx

from django.core import validators as V
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from apps.c_services.models import ServiceModel
from apps.extra_tools.services import upload_orders_photos
from apps.users.models import UserModel


class OrderStatusModel(models.Model):
    class Meta:
        db_table = 'orders_status'

    name = models.CharField(max_length=128)


class OrderModel(models.Model):
    class Meta:
        db_table = 'orders'
        ordering = ['id']

    address = models.CharField(max_length=128, validators=[
        V.RegexValidator(RegEx.ORDER_ADDRESS.pattern, RegEx.ORDER_ADDRESS.message)
    ])
    footage = models.IntegerField(validators=[
        V.RegexValidator(RegEx.ORDER_FOOTAGE.pattern, RegEx.ORDER_FOOTAGE.message)
    ])
    task_description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    price = models.FloatField(default=0)
    status = models.ForeignKey(OrderStatusModel, on_delete=models.CASCADE, related_name='orders', default=1)
    service = models.ForeignKey(ServiceModel, on_delete=models.CASCADE, related_name='orders')
    rating = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5.0)])
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='orders')
    employees_quantity = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    employees_current = models.ManyToManyField(UserModel, blank=True, related_query_name='employees_orders')
    done_at = models.DateField(blank=True, default='1000-01-01')


class PhotoOrderModel(models.Model):
    class Meta:
        db_table = 'orders_photos'

    photos = models.ImageField(upload_to=upload_orders_photos, max_length=500)
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE, related_name='photos')
