from rest_framework.serializers import ModelSerializer

from .models import OrderModel, OrderStatusModel


class OrderSerializer(ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'

        read_only_fields = ('id', 'user', 'employees', 'service', 'status')


class OrderStatusSerializer(ModelSerializer):
    class Meta:
        model = OrderStatusModel
        fields = '__all__'
