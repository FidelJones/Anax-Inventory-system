from django.contrib import admin
from .models import Notification, EmailTemplate


admin.site.register(Notification)
admin.site.register(EmailTemplate)

# Register your models here.
