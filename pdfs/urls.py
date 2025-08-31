from django.urls import path
from .views import PDFListView, PDFUploadView, StripeCheckoutSession,RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('pdfs/', PDFListView.as_view()),
    path('upload/', PDFUploadView.as_view()),
    path('stripe/checkout/', StripeCheckoutSession.as_view()),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]


