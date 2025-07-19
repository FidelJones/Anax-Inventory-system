from django.contrib import admin
from .models import SiteConfig, AuditLog

admin.site.register(SiteConfig)
admin.site.register(AuditLog)


# Register your models here.
