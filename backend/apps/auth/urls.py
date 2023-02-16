from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.urls import path

from.views import ActivateUserByTokenView, RequestRecoveryPasswordView, RecoveryPasswordByTokenView

urlpatterns = [
    path('', TokenObtainPairView.as_view()),
    path('/refresh', TokenRefreshView.as_view()),
    path('/<str:token>/activate', ActivateUserByTokenView.as_view()),
    path('/request_password_recovery', RequestRecoveryPasswordView.as_view()),
    path('/<str:token>/recovery', RecoveryPasswordByTokenView.as_view()),
]
