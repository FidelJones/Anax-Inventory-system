# products/permissions.py

from rest_framework import permissions

class IsStoreManagerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (
            request.user.is_staff or  # Admin
            request.user.groups.filter(name="store_manager").exists()
        )
