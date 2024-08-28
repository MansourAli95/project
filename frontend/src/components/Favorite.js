import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product'; // Assuming you want to reuse the Product component

function Favorite() {
  const favoriteProducts = useSelector(state => state.favoriteProducts.favorites);

  return (
    <Container>
      <h1>Favorites</h1>
      <Row>
        {favoriteProducts.length === 0 ? (
          <Col>
            <p>No favorite products yet.</p>
          </Col>
        ) : (
          favoriteProducts.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Favorite;
