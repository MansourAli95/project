from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 200)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page) 
    serializer = ProductSerializer(products, many=True,context = {"request":request})
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True,context = {"request":request})
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False,context = {"request":request})
    return Response(serializer.data)

  

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description'] 
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.data.get('image')  
    product.save() 

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')






# store/views.py

from django.db.models import Sum, Avg,F
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User
from ..models import Product, Order, Review, OrderItem
from ..serializers import DashboardSerializer
from datetime import datetime
from django.db import models

class DashboardView(APIView): 

    def get(self, request):
        # Calculate the total number of users
        users_count = User.objects.count()

        # Calculate the number of orders delivered
        orders_delivered_count = Order.objects.filter(isDelivered=True).count()

        # Calculate the total income from all orders
        total_income = Order.objects.filter(isPaid=True).aggregate(Sum('totalPrice'))['totalPrice__sum'] or 0

        # Calculate the number of products
        number_of_products = Product.objects.count()

        # Monthly revenue (assuming paid orders)
        current_year = datetime.now().year
        orders_by_month = (
            Order.objects.filter(isPaid=True, createdAt__year=current_year)
            .annotate(month=models.functions.TruncMonth('createdAt'))
            .values('month')
            .annotate(revenue=Sum('totalPrice'))
            .order_by('month')
        )
        monthly_revenue = [
            {"month": order['month'].strftime('%b'), "revenue": order['revenue']}
            for order in orders_by_month
        ]

        # Top five products by quantity sold
        top_products = (
            OrderItem.objects.values('product__name')
            .annotate(quantity_sold=Sum('qty'))
            .order_by('-quantity_sold')[:5]
        )
        top_products = [{"product":product["product__name"] , "quantity":product["quantity_sold"]} for product in top_products]
 
        top_products_ratings = [{"product":product.name,"rating":product.rating} for product in Product.objects.all()]

        # Products and their in-stock number
        products_in_stock = Product.objects.values('name', 'countInStock').order_by('-countInStock')

        # Prepare data for the response
        data = {
            "users_count": users_count,
            "orders_delivered_count": orders_delivered_count,
            "total_income": total_income,
            "number_of_products": number_of_products,
            "monthly_revenue": monthly_revenue,
            "top_products": list(top_products),
            "top_products_ratings": list(top_products_ratings),
            "products_in_stock": list(products_in_stock)
        }

        serializer = DashboardSerializer(data)
        return Response(serializer.data)
