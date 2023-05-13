import re
from enum import Enum

from django.core.exceptions import ValidationError
from django.utils import timezone

current_year = timezone.now().year
next_year = current_year + 1
year_regex = f"^(?:{current_year}|{next_year})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$"


def validate_order_date(value):
    if not re.match(year_regex, value):
        raise ValidationError("Order date must be in the format YYYY-MM-DD.")

    selected_date = timezone.datetime.strptime(value, "%Y-%m-%d")
    if selected_date.date() < timezone.now().date():
        raise ValidationError("Order date cannot be earlier than the current date.")


class RegEx(Enum):
    PASSWORD = (
        r'^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$',
        [
            'Password demands: 8-20 chars',
            'contains a number(0-9)',
            'contains at least one UpperCase latter',
            'contains at least one LowerCase latter',
            'contains at least one SpecialChar latter.'
        ]
    )

    NAME_SURNAME = (
        r'^[a-zA-Zа-яА-Я]{2,30}$',
        [
            'Name and surname demands: contain 2-30 letters.'
        ]
    )

    PHONE = (
        r'^(?:\+?3[80]|0)\d{9,12}$',
        [
            'Invalid phone number.'
        ]
    )

    AGE = (
        r'^(1[4-9]|[2-9]\d)$',
        [
            'For 14+ y.o. users.'
        ]
    )

    SERVICE_NAME = (
        r'^[a-zA-Zа-яА-Я]{2,30}$',
        [
            'Service name demands: contains 2-30 letters.'
        ]
    )

    SERVICE_ADDRESS = (
        r'^[a-zA-Zа-яА-Я0-9]{2,50}$',
        [
            'Service address demands: contains 2-50 chars.'
        ]
    )

    SERVICE_CITY = (
        r'^[a-zA-Zа-яА-Я]{2,30}$',
        [
            'Service city demands: contains 2-30 letters.'
        ]
    )

    ORDER_ADDRESS = (
        r'^[a-zA-Zа-яА-Я]{2,30}$',
        [
            'Order address demands: contains 2-30 letters.'
        ]
    )

    ORDER_DATE = (
        validate_order_date,
        [
            'Order date must be in the format YYYY-MM-DD and cannot be earlier than the current date.'
        ]
    )

    ORDER_TIME = (
        r'^([01]\d|2[0-3]):[0-5]\d$',
        [
            'Order time demands: format  HH-MM.'
        ]
    )

    ORDER_FOOTAGE = (
        r'^\d{1,5}$',
        [
            'Order footage demands: 1-5 digits.'
        ]
    )

    ORDER_TASK_DESCRIPTION = (
        r'^[a-zA-Zа-яА-Я0-9]{2,300}$',
        [
            'Order task demands: 2-300 letters.'
        ]
    )

    ORDER_PRICE = (
        r'^[a-zA-Zа-яА-Я0-9]{2,300}$',
        [
            'Order task demands: 2-300 letters.'
        ]
    )

    ORDER_RATING = (
        r'^[a-zA-Zа-яА-Я0-9]{2,300}$',
        [
            'Order task demands: 2-300 letters.'
        ]
    )

    ORDER_EMPLOYEE_QUANTITY = (
        r'^[a-zA-Zа-яА-Я0-9]{2,300}$',
        [
            'Order task demands: 2-300 letters.'
        ]
    )

    def __init__(self, pattern, message: list[str]):
        self.pattern = pattern
        self.message = message
