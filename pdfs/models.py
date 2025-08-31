from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = [('admin', 'Admin'), ('user', 'User')]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_paid = models.BooleanField(default=False)

class PDF(models.Model):
    file = models.FileField(upload_to='pdfs/')
    title = models.CharField(max_length=255)
    year = models.CharField(max_length=4)
    subject_name = models.CharField(max_length=255)
    chapter_name = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_free = models.BooleanField(default=False)  

