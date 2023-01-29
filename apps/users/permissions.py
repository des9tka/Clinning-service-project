from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.response import Response


class IsSuperUser(BasePermission):
    def has_permission(self, request: Request, view):
        return bool(request.user and request.user.is_superuser)


class IsEmployee(BasePermission):

    def has_permission(self, request, view):
        try:
            is_employee = request.user.__getattribute__('is_employee')
            return bool(request.user and is_employee)
        except (Exception,):
            return False

