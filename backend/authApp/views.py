from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

from .models import CustomUser, CurrentLocation
from .serializers import *
from .token import get_tokens_for_user


class SignUpView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        user = CustomUser.objects.filter(Q(email=data['email']) | Q(username=data['username']))
        if user:
            return Response({'message':'User with Email or Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = SignUpSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Successfully Signed Up'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'Please fill all the fields'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        try:
            user = authenticate(username=data['username'], password=data['password'])
            if user is not None:
                token = get_tokens_for_user(user)
                if user.is_superuser:
                    return Response({'message': 'Successfully Logged In', 'tokens': token, 'is_admin': True}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'message': 'Successfully Logged In', 'tokens':token, 'is_admin': False }, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'message': 'Invalid Credentials'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response({'message': 'Please fill all fileds'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserDetailsView(APIView):
    def get(self, request):
        serializer = SignUpSerializer(request.user)
        return Response({"message":'success',"user":serializer.data}, status=status.HTTP_200_OK )

class GetAddressDetails(APIView):
    def get(self, request):
        address = CurrentLocation.objects.filter(user=request.user).first()
        if address:
            serializer = UserLocationSerializer(address)
            return Response({'message':'No Address Found','location':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'No Address Found'}, status=status.HTTP_400_BAD_REQUEST)



class AddLocation(APIView):
    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = UserLocationSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Location Addedd Succesfully','location':serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({'message':'Please check whether all fields are filled'}, status=status.HTTP_200_OK)

