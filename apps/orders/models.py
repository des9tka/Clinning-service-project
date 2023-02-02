from django.db import models

from apps.users.models import UserModel


class OrderStatusModel(models.Model):
    class Meta:
        db_table = 'orders_status'

    name = models.CharField(max_length=128)


class OrderModel(models.Model):
    class Meta:
        db_table = 'orders'

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='orders')
    brand = models.CharField(max_length=128)
    model = models.CharField(max_length=128)
    year_realize = models.IntegerField()
    photo = models.CharField(max_length=128)
    problem_description = models.TextField()
    date = models.IntegerField(default=01.01)
    price = models.IntegerField(default=0)
    status = models.ForeignKey(OrderStatusModel, on_delete=models.CASCADE, related_name='orders', default=1)


