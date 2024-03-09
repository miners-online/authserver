from django.urls import path
from . import views

urlpatterns = [
    path('', views.miners_index, name='index'),
    path('authenticate/', views.miners_authenticate, name='authenticate'),
    path('refresh/', views.miners_refresh, name='refresh'),
    path('join/', views.miners_join, name='join'),
    path('hasJoined/', views.miners_hasJoined, name='hasJoined'),
]