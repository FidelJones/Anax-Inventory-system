from django.db import models
from orders.models import Order

class PaymentMethod(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)
    transaction_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class MobileMoneyTransaction(models.Model):
    PROVIDERS = [
        ('mtn', 'MTN Mobile Money'),
        ('airtel', 'Airtel Money'),
    ]
    
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    provider = models.CharField(max_length=20, choices=PROVIDERS)
    phone_number = models.CharField(max_length=15)
    transaction_reference = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    response_log = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
