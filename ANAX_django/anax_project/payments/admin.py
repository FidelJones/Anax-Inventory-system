from django.contrib import admin
from .models import PaymentMethod, Payment, MobileMoneyTransaction  

admin.site.register(PaymentMethod)
admin.site.register(Payment)        
admin.site.register(MobileMoneyTransaction)

#
