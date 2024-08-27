import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./About.css"; // استيراد ملف CSS لتنسيق الصفحة

function AboutUs() {
  return (
    <Container className="about-container">
      <Row className="my-5">
        <Col md={6}>
          <Image
            src="https://via.placeholder.com/500"
            rounded
            fluid
            alt="About Us"
            className="about-image"
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2 className="about-title">About Us</h2>
          <p className="about-text">
            Welcome to Simply Market! We are dedicated to providing the best
            shopping experience for our customers. Our goal is to offer
            high-quality products at competitive prices, ensuring that every
            purchase is a satisfying one.
          </p>
          <p className="about-text">
            Our team is passionate about finding the best products for you, and
            we strive to make your online shopping experience as seamless and
            enjoyable as possible. Thank you for choosing Simply Market!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
