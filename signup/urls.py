from django.urls import path
from .views import SignUpView, ResetPasswordView, PasswordResetConfirmView, PasswordResetCompleteView, ChangePasswordView


urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path('password_reset/', ResetPasswordView.as_view(), name='password_reset'),
    path('password_change/', ChangePasswordView.as_view(), name='password_change'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password_reset_complete/', PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]