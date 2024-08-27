import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import './ProductCarousel.css' // Import the CSS file

function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <Carousel pause='hover' className='product-carousel' indicators={true} controls={true}>
                        {products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/product/${product._id}`} className='carousel-link'>
                                    <Image src={product.image} alt={product.name} fluid className='carousel-image' />
                                    <Carousel.Caption className='carousel-caption'>
                                        <h4 className='carousel-title'>{product.name}</h4>
                                        <p className='carousel-price'>${product.price}</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )
    )
}

export default ProductCarousel
