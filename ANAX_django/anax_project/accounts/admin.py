from django.contrib import admin
from .models import StaffProfile, CustomerProfile, User, Address
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


admin.site.register(User, BaseUserAdmin)
admin.site.register(CustomerProfile)
admin.site.register(StaffProfile)
admin.site.register(Address)

