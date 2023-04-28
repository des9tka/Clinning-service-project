import datetime
import os
from datetime import date, datetime

import pytz
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
from ..users.serializers import UserSerializer
from .filters import OrderFilter
from .models import OrderModel, OrderStatusModel
from .serializers import OrderPhotoSerializer, OrderSerializer, OrderStatusSerializer


class OrderListView(ListAPIView):
    """
    List all orders. (provided filters, first - checks validity of the order, second - filters by status)
    """
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdmin | IsEmployee | IsSuperUser | IsAuthenticated]
    pagination_class = OrderPagePagination
    filterset_class = OrderFilter

    def get_queryset(self):
        user = self.request.user
        tz = pytz.timezone('Europe/Kiev')
        queryset = OrderModel.objects.all()
        search_query = self.request.GET.get('search')
        rejected_status = OrderStatusModel.objects.get(name='rejected')
        user_confirmed_status = OrderStatusModel.objects.get(name='user_confirmed')

        time = datetime.now(tz).strftime("%H:%M:%S")
        date = datetime.now(tz).strftime("%Y-%m-%d")

        date_filter = Q(date__lt=date)
        time_filter = Q(date__exact=date, time__lte=time)

        # Checking for invalid orders by date/time.
        OrderModel.objects.filter(
            Q(status_id__lte=6) & (date_filter | time_filter)
        ).update(status=rejected_status)

        if search_query and search_query != '':
            if search_query.isnumeric():
                queryset = queryset.filter(
                    Q(service_id__exact=int(search_query)) |
                    Q(id__exact=int(search_query)) |
                    Q(price=int(search_query)) |
                    Q(footage=int(search_query))
                )
            elif search_query.replace('.', '', 1).isdigit():
                queryset = queryset.filter(
                    Q(rating=float(search_query))
                )
            else:
                queryset = queryset.filter(
                    Q(address__istartswith=search_query) |
                    Q(task_description__icontains=search_query)
                )

            if user.is_staff:
                return queryset.filter(service_id=user.service_id).order_by('-rating')
            elif user.is_employee:
                return queryset.filter(service_id=user.service_id, rating__lte=user.profile.rating)
            else:
                return queryset.filter(user_id=user)

        else:
            if user.is_employee and not user.is_superuser:
                print('qfsefse')
                return OrderModel.objects.filter(service_id=user.service, status=user_confirmed_status, rating__lte=user.profile.rating).order_by('-rating')
            elif user.is_superuser:
                return OrderModel.objects.all().order_by('-rating')
            elif user.is_staff and not user.is_superuser:
                return OrderModel.objects.filter(service_id=user.service).order_by('-rating')
            else:
                return OrderModel.objects.filter(user_id=user.id).order_by('-rating')


class AddUserOrderToEmployeeView(GenericAPIView):
    """
    Adds employees to user order. (if order employees quantity full - status changes)
    """
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

            for e in order.employees_current.all():
                EmailService.employee_order_taken(e, order)
            EmailService.taken_order_email(user, order.id)

        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class PatchTheOrderView(GenericAPIView):
    """
    Partially changing order. (provides price and employees quantity)
    """
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
    """
    Remove employee from user order by employee and order id.
    """
    permission_classes = AllowAny,

    def patch(self, *arks, **kwargs):
        pk = kwargs['pk']
        user_id = kwargs['user']
        employee = UserModel.objects.get(id=user_id)
        order = get_object_or_404(OrderModel, pk=pk)
        user = UserModel.objects.get(id=order.user_id)
        order_status = OrderStatusModel.objects.get(name='user_confirmed')
        order.employees_current.remove(employee)
        order.status = order_status
        order.save()
        EmailService.employee_remove_order_email(user, order.id, employee)
        serializer = OrderSerializer(instance=order)
        return Response(serializer.data, status.HTTP_200_OK)


class RejectOrderView(GenericAPIView):
    """
    Changing status of order on 'rejected'.
    """
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
    """
    User confirm order which was pathed by admin.
    """

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
    """
    Changing status of order on 'done', rate user and order.
    """
    queryset = OrderModel.objects.all()

    def patch(self, *args, **kwargs):
        rate = kwargs.get('rate')
        order = self.get_object()
        user = UserModel.objects.get(id=order.user_id)
        order_status = OrderStatusModel.objects.get(name='done')
        date_done = date.today()

        try:
            if user.profile.rating == 0:
                user.profile.rating = float(rate)
                user.profile.save()
            else:
                user.profile.rating = (user.profile.rating + float(rate)) / 2
                user.profile.save()

            order.rating = float(rate)
            order.status = order_status
            order.done_at = date_done
            order.save()
            EmailService.done_order_email(user, order.id)

        except (Exception,):
            return Response(Exception, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class OrderStatusListCreateView(ListCreateAPIView):
    """
    List of order statuses.
    """
    queryset = OrderStatusModel.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = AllowAny,


class AddPhotoToOrder(GenericAPIView):
    """
    Add photo to order by user.
    """
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
    """
    get:
        List order by Id.
    delete:
        Delete order by Id.
    """
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = IsAuthenticated,


class EmployeeOrdersView(ListAPIView):
    """
    List all orders which contains request employee id. (provided filters, first - checks validity of the order, second - filters by status)
    """
    permission_classes = IsEmployee,
    pagination_class = OrderPagePagination
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    filterset_class = OrderFilter

    def get_queryset(self):
        rejected_status = OrderStatusModel.objects.get(name='rejected')
        search_query = self.request.GET.get('searcher', '')
        user = self.request.user
        tz = pytz.timezone('Europe/Kiev')

        time = datetime.now(tz).strftime("%H:%M:%S")
        date = datetime.now(tz).strftime("%Y-%m-%d")

        date_filter = Q(date__lt=date)
        time_filter = Q(date__exact=date, time__lte=time)

        OrderModel.objects.filter(
            Q(status_id__lte=6) & (date_filter | time_filter)
        ).update(status=rejected_status)

        print(search_query)

        try:
            query = int(search_query)
            print(type(query))
            queryset = OrderModel.objects.filter(
                Q(price__exact=query) |
                Q(rating__exact=query) |
                Q(time__hour=query) |
                Q(status__exact=query) |
                Q(footage__lt=query)
            )
            return queryset.objects.filter(employees_current=user.id)
        except (Exception,):
            print('exc')

        queryset = OrderModel.objects.filter(
            Q(address__contains=search_query) |
            Q(task_description__contains=search_query)
        )
        return queryset.filter(employees_current=user.id)


class StripePaymentIntentView(GenericAPIView):
    """
    Setting rating to employees and pay for order.
    """
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


class GetOrderEmployeeView(GenericAPIView):
    """
    Getting all employees from current order by Id.
    """
    queryset = OrderModel.objects.all()

    def get(self, *args, **kwargs):
        order = self.get_object()
        employees = order.employees_current.all()
        serializer = UserSerializer(instance=employees, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
