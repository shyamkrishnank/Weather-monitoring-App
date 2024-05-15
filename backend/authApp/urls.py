from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('login/', LoginView.as_view()),
    path('getuser/', GetUserDetailsView.as_view()),
    path('getlocation/', GetAddressDetails.as_view()),
    path('addlocation/', AddLocation.as_view()),
]
