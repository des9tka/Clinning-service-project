from rest_framework.serializers import ModelSerializer

from .models import OrderModel, OrderStatusModel, PhotoOrderModel


class OrderPhotoSerializer(ModelSerializer):
    class Meta:
        model = PhotoOrderModel
        fields = ('photos',)

    def to_representation(self, instance):
        return instance.photos.url


class OrderSerializer(ModelSerializer):
    photos = OrderPhotoSerializer(many=True)

    class Meta:
        model = OrderModel
        fields = '__all__'

        read_only_fields = ('id', 'user', 'employees', 'service', 'status')


class OrderStatusSerializer(ModelSerializer):
    class Meta:
        model = OrderStatusModel
        fields = '__all__'
