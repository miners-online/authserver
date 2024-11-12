from django.contrib import admin
from .models import OAuth2Client, OAuth2Token, OAuth2AuthorizationCode

# Register your models here.

admin.site.register(OAuth2Client)
admin.site.register(OAuth2Token)
admin.site.register(OAuth2AuthorizationCode)