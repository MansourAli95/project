import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./footer.css"; // استيراد ملف CSS لتنسيق الصفحة

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; Simply</Col>
                </Row>
                <Row>
                    <Col md={4} className="text-center py-2">
                        <h6>Contact Us:</h6>
                        <p>Email: simply9990@gmail.com</p>
                        </Col>

                    <Col md={4} className="text-center py-2">
                        <h6>Address:</h6>
                        <p>Syria</p>
                        <p>Damsacous - Mazzah</p>
                    </Col>
                    <Col md={4} className="text-center py-2">
                        <h6>Follow Us:</h6>
                        <p>
                            <a href="https://www.facebook.com">Facebook</a> | 
                            <a href="https://www.twitter.com">Twitter</a> |
                            <a href="https://www.instagram.com">Instagram</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
