from rest_framework.serializers import ModelSerializer

from apps.orders.serializers import OrderSerializer
from apps.users.serializers import UserSerializer

from .models import PhotoServiceModel, ServiceModel


class ServicePhotoSerializer(ModelSerializer):
    class Meta:
        model = PhotoServiceModel
        fields = ('photos',)

    def to_representation(self, instance):
        return instance.photos.url


class ServiceSerializer(ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    orders = OrderSerializer(many=True, read_only=True)
    photos = ServicePhotoSerializer(many=True)

    class Meta:
        model = ServiceModel
        fields = '__all__'
