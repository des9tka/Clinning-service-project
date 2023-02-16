from typing import Type

from core.enums.token_action_enum import ActionEnum
from core.exceptions.jwt_exception import JWTException
from rest_framework_simplejwt.tokens import BlacklistMixin, Token

from django.shortcuts import get_object_or_404

from apps.users.models import UserModel

TokenClass = Type[BlacklistMixin | Token]


class ActivateToken(BlacklistMixin, Token):
    lifetime = ActionEnum.ACTIVATE.expired_time
    token_type = ActionEnum.ACTIVATE.token_type


class RecoveryToken(BlacklistMixin, Token):
    lifetime = ActionEnum.RECOVERY.expired_time
    token_type = ActionEnum.RECOVERY.token_type


class JWTService:
    @staticmethod
    def create_token(user, token_class: TokenClass):
        return token_class.for_user(user)

    @staticmethod
    def validate_token(token, token_class: TokenClass):
        try:
            token_valid = token_class(token)
            token_valid.check_blacklist()
        except (Exception,):
            raise JWTException
        token_valid.blacklist()
        user_id = token_valid.payload.get('user_id')
        return get_object_or_404(UserModel, pk=user_id)

