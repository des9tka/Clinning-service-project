from enum import Enum

from rest_framework import status


class ErrorEnum(Enum):
    JWT = (
        {'details': 'Token invalid or expired.'},
        status.HTTP_400_BAD_REQUEST
    )

    def __init__(self, message: dict, code: status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.code = code
