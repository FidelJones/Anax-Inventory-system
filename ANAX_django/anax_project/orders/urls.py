from django.urls import path
from .views import OrderListAPIView, OrderDetailAPIView, OrderCreateAPIView

urlpatterns = [
    path('', OrderListAPIView.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('create/', OrderCreateAPIView.as_view(), name='order-create'),
]
