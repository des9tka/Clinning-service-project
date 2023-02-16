from core.enums.errors_enum import ErrorEnum
from core.exceptions.jwt_exception import JWTException

from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_error_handler(exc: Exception, context: dict) -> Response:
    handlers = {
        'JWTException': _jwt_validate_error
    }

    response = exception_handler(exc, context)
    exception_class = exc.__class__.__name__

    if exception_class in handlers:
        return handlers[exception_class](exc, context)

    return response


def _jwt_validate_error(exc: JWTException, context: dict) -> Response:
    return Response(ErrorEnum.JWT.message, ErrorEnum.JWT.code)
