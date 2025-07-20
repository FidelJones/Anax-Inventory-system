from rest_framework import serializers
from .models import Product, ProductImage, Category

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()  # Shows category name

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price',
            'category', 'created_at', 'updated_at', 'images',
        ]
