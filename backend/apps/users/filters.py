from django_filters import rest_framework as filters

from apps.users.models import UserModel


class UserFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name='id', lookup_expr='startswith')
    email = filters.CharFilter(field_name='email', lookup_expr='istartswith')
    is_staff = filters.BooleanFilter(field_name='is_staff', lookup_expr='exact')
    is_employee = filters.BooleanFilter(field_name='is_employee', lookup_expr='exact')
    is_superuser = filters.BooleanFilter(field_name='is_superuser', lookup_expr='exact')

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'is_employee', 'is_superuser')
