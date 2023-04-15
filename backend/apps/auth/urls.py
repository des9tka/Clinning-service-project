from rest_framework_simplejwt.views import TokenRefreshView

from django.urls import path

from .views import (
    ActivateUserByTokenView,
    CustomTokenObtainPairView,
    RecoveryPasswordByTokenView,
    RequestOfActivationLinkView,
    RequestRecoveryPasswordView,
    StripeTokenView,
    TokenValidCheck,
)

urlpatterns = [
    path('', CustomTokenObtainPairView.as_view()),
    path('/refresh', TokenRefreshView.as_view()),
    path('/<str:token>/activate', ActivateUserByTokenView.as_view()),
    path('/request_password_recovery', RequestRecoveryPasswordView.as_view()),
    path('/<str:token>/recovery', RecoveryPasswordByTokenView.as_view()),
    path('/token_check', TokenValidCheck.as_view()),
    path('/stripe_token', StripeTokenView.as_view()),
    path('/activate_request', RequestOfActivationLinkView.as_view())
]
