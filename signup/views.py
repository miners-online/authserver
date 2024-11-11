from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.models import User
from django.contrib.auth.views import PasswordResetView, PasswordChangeView, PasswordResetConfirmView, PasswordResetCompleteView, LoginView
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm, PasswordResetForm, SetPasswordForm, AuthenticationForm
from django.contrib.messages.views import SuccessMessageMixin

class AuthenticationForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs.update({'class': 'input'})
        self.fields['password'].widget.attrs.update({'class': 'input'})


class LoginView(LoginView):
    form_class = AuthenticationForm
    success_url = reverse_lazy("login")
    template_name = "registration/login.html"


class UserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email",)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs.update({'class': 'input'})
        self.fields['email'].widget.attrs.update({'class': 'input'})
        self.fields['password1'].widget.attrs.update({'class': 'input'})
        self.fields['password2'].widget.attrs.update({'class': 'input'})


class SignUpView(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"


class PasswordResetForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['email'].widget.attrs.update({'class': 'input'})


class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
    form_class = PasswordResetForm
    template_name = 'registration/password/reset.html'
    email_template_name = 'registration/password/reset_email.html'
    subject_template_name = 'registration/password/reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    success_url = reverse_lazy('home')


class PasswordChangeForm(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['old_password'].widget.attrs.update({'class': 'input'})
        self.fields['new_password1'].widget.attrs.update({'class': 'input'})
        self.fields['new_password2'].widget.attrs.update({'class': 'input'})


class ChangePasswordView(SuccessMessageMixin, PasswordChangeView):
    form_class = PasswordChangeForm
    template_name = 'registration/password/change.html'
    success_message = "Successfully Changed Your Password"
    success_url = reverse_lazy('home')


class SetPasswordForm(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['new_password1'].widget.attrs.update({'class': 'input'})
        self.fields['new_password2'].widget.attrs.update({'class': 'input'})


class PasswordResetConfirmView(SuccessMessageMixin, PasswordResetConfirmView):
    template_name = 'registration/password/reset_confirm.html'
    form_class = SetPasswordForm


class PasswordResetCompleteView(SuccessMessageMixin, PasswordResetCompleteView):
    template_name = 'registration/password/reset_complete.html'
    success_url = reverse_lazy('login')
