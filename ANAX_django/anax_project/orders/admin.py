from django.contrib import admin
from .models import Order, OrderItem, OrderTracking, Address

admin.site.register(Order)
admin.site.register(OrderItem) 
admin.site.register(OrderTracking)
admin.site.register(Address)

# Register your models here.
