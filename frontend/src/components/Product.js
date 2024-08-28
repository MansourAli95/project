import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import './Product.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function Product({ product }) {
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
            <Rating value={product.rating} 
                    text={`${product.numReviews} reviews`} 
                    color={'#f1c40f'} /> {/* Gold color for rating */}
          </div>
        </Card.Text>
        <div className="fav-container">
          <FontAwesomeIcon icon={faHeart} className="fav-icon" />
        </div>
        <Card.Text as="h3" className="product-price">
          <span className="price-symbol">$</span> 
          <span className="price-value">{product.price}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
