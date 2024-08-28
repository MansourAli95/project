from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import *
from ..serializers import * 



class FavoriteView(APIView):
      def get(self,request):
          favorites = Favourite.objects.filter(user = request.user)
          favorite_serializer = FavoriteSerializer(favorites , many = True)
          return Response(favorite_serializer.data)
      
      def post(self,request):
          product = Product.objects.get(_id = request.data["id"])
          if not (product._id in [fav.product._id for fav in request.user.favourite_set.all()]):
            favorite = FavoriteSerializer(data = {"product":product._id,"user":request.user.id})
            favorite.is_valid(raise_exception=True)
            favorite.save()
            return Response({"message":"the favorite added succesffully"},201)
          
          return Response({"message":"product is already in favorites"})
      
    
      def delete(self,request,id):
         product = request.user.favourite.set.get(product__id= id)
         product.delete()
         return Response({"message":"the product deleted successfully"})
