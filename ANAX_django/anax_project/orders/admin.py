from django.contrib import admin
from .models import Order, OrderItem, OrderTracking

admin.site.register(Order)
admin.site.register(OrderItem) 
admin.site.register(OrderTracking)


# Register your models here.
