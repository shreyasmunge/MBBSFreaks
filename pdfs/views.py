from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import PDF, CustomUser
from .serializers import PDFSerializer
from django.http import HttpResponseForbidden
import stripe

stripe.api_key = 'your-stripe-secret'

def is_admin(user):
    return user.role == 'admin'

from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from django.views.generic import TemplateView

class FrontendAppView(TemplateView):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
class RegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
    
class PDFListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_paid:
            pdfs = PDF.objects.all()
        else:
            # Only PDFs marked is_free=True are accessible to free users
            pdfs = PDF.objects.filter(is_free=True)
        return Response(PDFSerializer(pdfs, many=True).data)

class PDFUploadView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if not is_admin(request.user):
            return HttpResponseForbidden()
        serializer = PDFSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class StripeCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': 'your_price_id',  # Replace with your Stripe price ID
                    'quantity': 1,
                }],
                mode='payment',
                success_url='http://localhost:8000/success',
                cancel_url='http://localhost:8000/cancel',
            )
            return Response({'checkout_url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=400)