from django.shortcuts import render
from rest_framework import generics, filters
from .models import Product
from .serializers import ProductSerializer,  ProductCreateSerializer
from .permissions import IsStoreManagerOrAdmin
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductCreateSerializer
    permission_classes = []


class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsStoreManagerOrAdmin]
    lookup_field = 'id'

class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated, IsStoreManagerOrAdmin]
    lookup_field = 'id'


class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # 🔍 Searchable fields
    search_fields = ['name', 'description']
    
    # 🧪 Filterable fields
    filterset_fields = {
        'category': ['exact'],
        'price': ['gte', 'lte'],
        'available': ['exact'],
    }

    ordering_fields = ['price', 'created_at']

    