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
        r'^[a-zA-Z]{2,30}$',
        [
            'Name and surname demands: contain 2-30 letters.'
        ]
    )

    PHONE = (
        r'^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
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

    SERVICE_V = (
        r'^[a-zA-Z]{2,30}$',
        [
            'Service name demands: contains 2-30 letters.'
        ]
    )

    def __init__(self, pattern, message: list[str]):
        self.pattern = pattern
        self.message = message
