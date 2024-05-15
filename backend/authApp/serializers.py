from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import CustomUser, CurrentLocation


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        password = make_password(validated_data['password'])
        user = CustomUser.objects.create(username=validated_data['username'],
                                    email=validated_data['email'],
                                    password=password
                                    )

        return user

class UserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentLocation
        fields = '__all__'



class UserBasicDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username']