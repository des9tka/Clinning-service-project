import os

import stripe
from core.pagination.page_pagination import OrderPagePagination
from core.services.email_service import EmailService

from django.db.models import Q
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.users.models import ProfileModel, UserModel
from apps.users.permissions import IsSuperUser

from ..users.permissions import IsAdmin, IsEmployee
from .filters import OrderFilter
from .models import OrderModel, OrderStatusModel
from .serializers import OrderPhotoSerializer, OrderSerializer, OrderStatusSerializer


class OrderListView(ListAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdmin | IsEmployee | IsSuperUser | IsAuthenticated]
    pagination_class = OrderPagePagination
    filterset_class = OrderFilter

    def get_queryset(self):
        user = self.request.user
        order_status = OrderStatusModel.objects.get(name='user_confirmed')

        if user.is_employee and not user.is_superuser:
            return OrderModel.objects.filter(service_id=user.service, status=order_status, rating__lte=user.profile.rating).order_by('-rating')
        elif user.is_superuser:
            return OrderModel.objects.all().order_by('-rating')
        elif user.is_staff and not user.is_superuser:
            return OrderModel.objects.filter(service_id=user.service).order_by('-rating')
        else:
            return OrderModel.objects.filter(user_id=user.id).order_by('-rating')


class OrderSearchView(ListAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdmin | IsEmployee | IsSuperUser | IsAuthenticated]
    pagination_class = OrderPagePagination
    filterset_class = OrderFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return OrderModel.objects.filter(service_id=user.service_id)
        else:
            return OrderModel.objects.filter(user_id=user)


class AddUserOrderToEmployeeView(GenericAPIView):
    queryset = OrderModel.objects.all()

    def patch(self, *args, **kwargs):
        employee = self.request.user
        order = self.get_object()
        user = UserModel.objects.get(id=order.user_id)

        order.employees_current.add(employee)
        order.save()

        order_status_user_confirmed = OrderStatusModel.objects.get(name='user_confirmed')
        order_status_taken = OrderStatusModel.objects.get(name='taken')
        employees_quantity = order.employees_quantity
        employees_current = OrderModel.objects.filter(id=order.id).values('employees_current').count()

        if employees_current == employees_quantity and order.status == order_status_user_confirmed:
            order.status = order_status_taken
            order.save()
            EmailService.taken_order_email(user, order.id)

        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class PatchTheOrderView(GenericAPIView):
    queryset = OrderModel
    permission_classes = IsAdmin,

    def patch(self, *args, **kwargs):
        data = self.request.data
        order = self.get_object()
        user = UserModel.objects.get(id=order.user_id)
        order_status = OrderStatusModel.objects.get(name='admin_approved')
        serializer = OrderSerializer(order, data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(status_id=order_status)
        EmailService.confirm_order_email(user, order.id)
        return Response(serializer.data, status.HTTP_200_OK)


class RemoveEmployeeFromOrder(GenericAPIView):
    permission_classes = AllowAny,

    def patch(self, *arks, **kwargs):
        pk = kwargs['pk']
        user_id = kwargs['user']
        employee = UserModel.objects.get(id=user_id)
        order = get_object_or_404(OrderModel, pk=pk)
        user = UserModel.objects.get(id=order.user_id)
        print(employee)
        order_status = OrderStatusModel.objects.get(name='user_confirmed')
        order.employees_current.remove(employee)
        order.status = order_status
        order.save()
        EmailService.employee_remove_order_email(user, order.id, employee)
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class RejectOrderView(GenericAPIView):
    permission_classes = IsAuthenticated,
    queryset = OrderModel.objects.all()

    def patch(self, *args, **kwargs):
        order = self.get_object()
        user = self.request.user
        print(user.is_staff)
        order_status = OrderStatusModel.objects.get(name='rejected')
        order.status = order_status
        order.save()
        if user.is_staff:
            order_user = UserModel.objects.get(id=order.user_id)
            data = self.request.data
            EmailService.admin_reject_order_email(user=order_user, order_id=order.id, data=data, admin=user)
            return Response(status.HTTP_200_OK)
        else:
            EmailService.user_reject_order_email(user, order.id)
            return Response(status.HTTP_200_OK)


class UserConfirmOrderView(GenericAPIView):

    def patch(self, *args, **kwargs):
        pk = kwargs['pk']
        order = get_object_or_404(OrderModel, pk=pk)
        order_status = OrderStatusModel.objects.get(name='user_confirmed')
        print(order_status)
        order.status = order_status
        order.save()
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class EmployeeDoneOrderView(GenericAPIView):
    queryset = OrderModel.objects.all()

    def patch(self, *args, **kwargs):
        rate = kwargs.get('rate')
        order = self.get_object()
        user = UserModel.objects.get(id=order.user_id)
        order_status = OrderStatusModel.objects.get(name='done')

        try:
            if user.profile.rating == 0:
                user.profile.rating = float(rate)
                user.profile.save()
            else:
                user.profile.rating = (user.profile.rating + float(rate)) / 2
                user.profile.save()
                print(1)

            order.rating = float(rate)
            order.status = order_status
            order.save()
            EmailService.done_order_email(user, order.id)

        except (Exception,):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


# class AdminApproveOrderView(GenericAPIView):
#     def patch(self, *args, **kwargs):
#         pk = kwargs['pk']
#         order = get_object_or_404(OrderModel, pk=pk)
#         user = get_object_or_404(UserModel, pk=order.user_id)
#         order_status = OrderStatusModel.objects.get(name='admin_approve')
#         order.status = order_status
#         order.save()
#         print(order.id)
#         EmailService.confirm_order_email(user=user, order_id=order.id)
#         serializer = OrderSerializer(instance=order)
#         return Response(serializer.data, status.HTTP_200_OK)


class OrderStatusListCreateView(ListCreateAPIView):
    queryset = OrderStatusModel.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = AllowAny,


class AddPhotoToOrder(GenericAPIView):
    queryset = OrderModel.objects.all()
    permission_classes = AllowAny,

    def post(self, *args, **kwargs):
        order = self.get_object()
        files = self.request.FILES
        for key in files:
            serializer = OrderPhotoSerializer(data={'photos': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(order=order)
        order_serializer = OrderSerializer(instance=order)
        return Response(order_serializer.data, status.HTTP_200_OK)


class RetrieveDeleteOrderView(RetrieveDestroyAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = IsAuthenticated,


class EmployeeOrdersView(ListAPIView):
    permission_classes = IsEmployee,
    pagination_class = OrderPagePagination
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    filterset_class = OrderFilter

    def get_queryset(self):
        search_query = self.request.GET.get('searcher', '')
        user = self.request.user
        try:
            query = int(search_query)
            queryset = OrderModel.objects.filter(
                Q(price__exact=query) |
                Q(rating__exact=query) |
                Q(time__hour=query) |
                Q(status__exact=query) |
                Q(footage__lt=query)
            )
            print(query)
            return queryset.objects.filter(employees_current=user.id)
        except (Exception,):
            print(Exception)

        queryset = OrderModel.objects.filter(
            Q(address__contains=search_query) |
            Q(task_description__contains=search_query)
        )
        return queryset.filter(employees_current=user.id)


class StripePaymentIntentView(GenericAPIView):
    permission_classes = IsAuthenticated,
    queryset = OrderModel

    def post(self, *args, **kwargs):
        order = self.get_object()
        rate = kwargs.get('rate')
        user = UserModel.objects.get(id=order.user_id)
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
        payment_method = self.request.data.get("id")
        amount = self.request.data.get("amount")
        order_status = get_object_or_404(OrderStatusModel, name='paid')

        try:
            payment_intent = stripe.PaymentIntent.create(
                payment_method=payment_method,
                amount=amount,
                currency="UAH",
                description="paymentReactApi",
                confirm=True,
            )

            employees = order.employees_current.all()
            for e in employees:
                profile = ProfileModel.objects.get(user_id=e.id)
                if profile.rating == 0:
                    profile.rating = float(rate)
                    profile.save()
                else:
                    profile.rating = (profile.rating + float(rate)) / 2
                    profile.save()

            order.status = order_status
            order.save()
            EmailService.payed_order_email(user, order.id)
            return Response({"status": payment_intent.status}, status=200)
        except stripe.error.StripeError as e:
            return Response({"error": e.user_message}, status=400)
