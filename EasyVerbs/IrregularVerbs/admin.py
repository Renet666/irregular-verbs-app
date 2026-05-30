from django.contrib import admin
from .models import Verbs
# Register your models here.


class VerbsAdmin(admin.ModelAdmin):
    model = Verbs
    ordering = ['infinitive']
    search_fields = ['infinitive']
    db_table = 'Verbs'

admin.site.register(Verbs, VerbsAdmin)