import uuid
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    created = models.DateTimeField(db_column='created', auto_now_add=True, blank=True)
    user = models.ForeignKey(User, db_column='django_user', on_delete=models.CASCADE)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    game_name = models.CharField(db_column='game_name', max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'profile'


class ClientTokenStorage(models.Model):
    created = models.DateTimeField(db_column='created', auto_now_add=True, blank=True)
    user = models.ForeignKey(User, db_column='django_user', on_delete=models.CASCADE)
    client_token = models.CharField(db_column='client_token', max_length=255, null=True, blank=True)
    access_token = models.CharField(db_column='access_token', max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'client_token_storage'
