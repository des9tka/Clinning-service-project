from rest_framework.serializers import ModelSerializer

from apps.users.serializers import UserSerializer

from .models import ServiceModel


class ServiceSerializer(ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceModel
        fields = '__all__'





