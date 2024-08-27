import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Spinner } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import styles from './HomeScreen.module.css' // Import the CSS module

function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    const keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <Container fluid className={styles.container}>
            {!keyword && (
                <div className={styles.carouselContainer}>
                    <ProductCarousel />
                </div>
            )}

            <div className="text-center mb-4">
                <h1 className={styles.heading}>Latest Products</h1>
            </div>

            {loading ? (
                <div className={styles.loaderContainer}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <Message variant="danger">{error}</Message>
                </div>
            ) : (
                <div>
                    <Row className={styles.rowSpacing}>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className={styles.rowSpacing}>
                                <Product className={styles.productCard} product={product} />
                            </Col>
                        ))}
                    </Row>
                    <div className={styles.paginationContainer}>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
                </div>
            )}
        </Container>
    )
}

export default HomeScreen
