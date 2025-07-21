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
        fields = '__all__'
        

class ProductCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True
    )

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category', 'images']

    def create(self, validated_data):
        images = validated_data.pop('images')
        product = Product.objects.create(**validated_data)
        for image in images:
            ProductImage.objects.create(product=product, image=image)
        return product