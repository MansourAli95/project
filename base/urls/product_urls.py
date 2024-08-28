from django.urls import path
from base.views import product_views as views
from base.views.FavoriteView import FavoriteView
urlpatterns = [

    path('', views.getProducts, name="products"),

    path('favorites/',FavoriteView.as_view() , name = "get-user-favorites"),
    path('favorites/<id>',FavoriteView.as_view() , name = "get-user-favorites"),
  
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name="product"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    
]
