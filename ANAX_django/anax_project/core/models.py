from django.db import models

class SiteConfig(models.Model):
    site_name = models.CharField(max_length=100)
    support_email = models.EmailField()
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    enable_inventory_tracking = models.BooleanField(default=True)

class AuditLog(models.Model):
    action = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
