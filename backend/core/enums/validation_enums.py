from enum import Enum


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

    def __init__(self, pattern, message: list[str]):
        self.pattern = pattern
        self.message = message
