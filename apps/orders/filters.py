from django_filters import rest_framework as filters

from apps.orders.models import OrderModel


class OrderFilter(filters.FilterSet):
    address_start = filters.CharFilter(field_name='address', lookup_expr='istartswith')
    date = filters.CharFilter(field_name='date', lookup_expr='istartswith')

    class Meta:
        model = OrderModel
        fields = ('address_start', 'date')
