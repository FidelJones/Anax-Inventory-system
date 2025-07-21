from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, ProductCreateAPIView, ProductUpdateAPIView, ProductDeleteAPIView

urlpatterns = [
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('products/create/', ProductCreateAPIView.as_view(), name='product-create'),
    path('products/<int:id>/delete/', ProductDeleteAPIView.as_view(), name='product-delete'),
    path('products/<int:id>/update/', ProductUpdateAPIView.as_view(), name='product-update'),

]
