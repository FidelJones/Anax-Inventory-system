from django.db import models
from accounts.models import User

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    type = models.CharField(max_length=50)  # e.g. order_update, promo, system
    created_at = models.DateTimeField(auto_now_add=True)

class EmailTemplate(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=150)
    body = models.TextField()
