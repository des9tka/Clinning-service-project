from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.users.serializers import UserSerializer

from .models import ServiceModel
from .serializers import ServiceSerializer


class ServiceListCreateView(ListCreateAPIView):
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = AllowAny,

        
