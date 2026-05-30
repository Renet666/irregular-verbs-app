from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("all_verbs", views.all_verbs, name="all_verbs"),
    path("beginner_verbs", views.beginner, name="beginner_verbs"),
    path("intermediate_verbs", views.intermediate, name="intermediate_verbs"),
    path("advanced_verbs", views.advanced, name="advanced_verbs"),
]