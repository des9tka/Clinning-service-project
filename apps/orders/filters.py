from django_filters import rest_framework as filters

from apps.orders.models import OrderModel


class OrderFilter(filters.FilterSet):
    address_start = filters.CharFilter(field_name='address', lookup_expr='istartswith')
    date_gte = filters.DateFilter(field_name='date', lookup_expr='gte')
    date_lte = filters.DateFilter(field_name='date', lookup_expr='lte')
    time_gte = filters.TimeFilter(field_name='time', lookup_expr='gte')
    time_lte = filters.TimeFilter(field_name='time', lookup_expr='lte')
    price_lte = filters.NumberFilter(field_name='price', lookup_expr='lte')
    price_gte = filters.NumberFilter(field_name='price', lookup_expr='gte')
    task = filters.CharFilter(field_name='task_description', lookup_expr='istartswith')
    employees_lte = filters.NumberFilter(field_name='employees_quantity', lookup_expr='lte')
    employees_gte = filters.NumberFilter(field_name='employees_quantity', lookup_expr='gte')
    footage_lte = filters.NumberFilter(field_name='footage', lookup_expr='lte')
    footage_gte = filters.NumberFilter(field_name='footage', lookup_expr='gte')


    class Meta:
        model = OrderModel
        fields = ('address_start', 'date_gte', 'date_lte', 'time_gte', 'time_lte', 'price_lte', 'price_gte', 'task', 'employees_lte', 'employees_gte',
                  'footage_gte', 'footage_lte')
