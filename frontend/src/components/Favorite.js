import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product'; // Import your Product component
import { useSelector } from 'react-redux';

function Favorite() {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userInfo = useSelector((state) => state.userLogin.userInfo);
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const accessToken = JSON.parse(localStorage.getItem('userInfo'))?.access;
                if (!accessToken) throw new Error('Access token is missing');

                const response = await fetch('/api/products/favorites', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }

                const data = await response.json();
                setFavoriteProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [favoriteProducts]);


 

    if (loading) return <Container><h1>Loading...</h1></Container>;

    if (error) return <Container><h1>Error: {error}</h1></Container>;

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
                            <Product product={product.product} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default Favorite;
