from django.db import models

# Create your models here.
from django.db import models
from orders.models import Order

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
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