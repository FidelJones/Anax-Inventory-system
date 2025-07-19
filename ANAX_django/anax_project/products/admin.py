# products/admin.py
from django.contrib import admin
from .models import Category, Product, ProductImage, Inventory, ProductVariant

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Inventory)
admin.site.register(ProductVariant)

