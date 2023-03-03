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

    address = models.CharField(max_length=128)
    footage = models.IntegerField()
    task_description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    price = models.FloatField(default=0)
    status = models.ForeignKey(OrderStatusModel, on_delete=models.CASCADE, related_name='orders', default=1)
    service = models.ForeignKey(ServiceModel, on_delete=models.CASCADE, related_name='orders')
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='orders')
    employees_quantity = models.IntegerField(default=1)
    employees_current = models.ManyToManyField(UserModel, blank=True, related_query_name='employees_orders')


class PhotoOrderModel(models.Model):
    class Meta:
        db_table = 'orders_photos'

    photos = models.ImageField(upload_to=upload_orders_photos)
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE, related_name='photos')



