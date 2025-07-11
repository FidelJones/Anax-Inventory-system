
# Register your models here.
from django.contrib import admin
from .models import Product, Order, OrderItem

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')
    search_fields = ('name',)
    list_filter = ('created_at',)

admin.site.register(Product, ProductAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)