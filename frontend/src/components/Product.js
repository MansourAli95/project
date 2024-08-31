import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import './Product.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useSelector } from 'react-redux'; 
import { FaHeart } from "react-icons/fa";
function ProductCard({ product }) {
    const userInfo = useSelector((state) => state.userLogin.userInfo);
    const [isFavorite, setIsFavorite] = useState(product.is_favorite);

    const toggleFavorite = async () => {
        if (!userInfo) return;

        try {
            const response = await fetch(`/api/products/favorites/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.access}`,
                },
                body: JSON.stringify({ id: product._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }

            const data = await response.json();
            setIsFavorite(true);
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    const deleteFavorite = async (productId) => {
      if (!userInfo) return;

      try {
          const accessToken = JSON.parse(localStorage.getItem('userInfo'))?.access;
          if (!accessToken) throw new Error('Access token is missing');

          const response = await fetch(`/api/products/favorites/${productId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
              },
          });

          if (!response.ok) {
              throw new Error('Failed to delete favorite');
          }

          setIsFavorite(false)
           
      } catch (error) {
          console.error('Error deleting favorite:', error);
      }
  };

  
    return (
        <Card className="product-card my-3 p-3 rounded glass-effect">
            <Link to={`/product/${product._id}`} className="card-link">
                <Card.Img src={product.image} alt={product.name} className="product-img" />
                <div className="overlay">
                    <div className="overlay-content">View Details</div>
                </div>
            </Link>

            <Card.Body className="card-body">
                <Link to={`/product/${product._id}`} className="card-link">
                    <Card.Title as="div">
                        <strong className="product-name">{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div" className="rating-container">
                    <div className="my-3">
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color={'#f1c40f'}
                        />
                    </div>
                </Card.Text>

                {userInfo && (
                    <FaHeart
                    className={`${isFavorite ? "text-red-600" : "text-slate-500"
                      } hover:cursor-pointer`}
                    onClick={ () => {if (isFavorite) {
                      deleteFavorite(product._id);
                  } else {
                      toggleFavorite();
                  } }}
                  />
                )}

                <Card.Text as="h3" className="product-price">
                    <span className="price-symbol">$</span>
                    <span className="price-value">{product.price}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
