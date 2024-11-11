from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.models import User
from django.contrib.auth.views import PasswordResetView, PasswordChangeView, PasswordResetConfirmView, PasswordResetCompleteView
from django.contrib.messages.views import SuccessMessageMixin


class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email",)


class SignUpView(CreateView):
    form_class = SignupForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"


class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
    template_name = 'registration/password/reset.html'
    email_template_name = 'registration/password/reset_email.html'
    subject_template_name = 'registration/password/reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    success_url = reverse_lazy('home')


class ChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    template_name = 'registration/password/change.html'
    success_message = "Successfully Changed Your Password"
    success_url = reverse_lazy('home')

class PasswordResetConfirmView(SuccessMessageMixin, PasswordResetConfirmView):
    template_name = 'registration/password/reset_confirm.html'

class PasswordResetCompleteView(SuccessMessageMixin, PasswordResetCompleteView):
    template_name = 'registration/password/reset_complete.html'
    success_url = reverse_lazy('login')
