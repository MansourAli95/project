import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./About.css"; // استيراد ملف CSS لتنسيق الصفحة

function AboutUs() {
  return (
    <Container className="about-container">
      <Row className="my-5">
        <Col md={12} className="text-center">
          <h2 className="about-title">About Us</h2>
          <h3> Simply </h3>
          <p className="about-text">
          "Welcome to our humble platform specializing in e-commerce, where we provide you with all the details about the products sold through it. Please note that our platform is dedicated to handmade products.
          </p>
          <p className="about-text">
          "We are TIC students who came together to present this project, which represents the culmination of our years of study in this field. We hope it meets your expectations and that you enjoy it."
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        {/* Person 1 */}
        <Col md={4} className="text-center">
          <Image
            src="https://res.cloudinary.com/duws0azyi/image/upload/v1724848154/team1_ffu0ng.jpg"
            roundedCircle
            fluid
            alt="Team Member 1"
            className="team-image"
          />
          <h5 className="mt-3">Ali Mansour</h5>
          <p>ID: 219625</p>
          <p>Email: mansouraaa77@gmail.com</p>
          <p>Phone: (963) 0991-999235</p>
        </Col>

        {/* Person 2 */}
        <Col md={4} className="text-center">
          <Image
            src="https://res.cloudinary.com/duws0azyi/image/upload/v1724848256/team3_owfwd7.jpg"
            roundedCircle
            fluid
            alt="Team Member 2"
            className="team-image"
          />
          <h5 className="mt-3">Muna Alras</h5>
          <p>ID: 67890</p>
          <p>Email: monaalrass123@gmail.com</p>
          <p>Phone: (963) 0946-441830</p>
        </Col>

        {/* Person 3 */}
        <Col md={4} className="text-center">
          <Image
            src="https://res.cloudinary.com/duws0azyi/image/upload/v1724847928/6951dfb8-2a07-4b06-9718-001d516855ad_gfp1vn.jpg"
            roundedCircle
            fluid
            alt="Team Member 3"
            className="team-image"
          />
          <h5 className="mt-3">Aram Alazzam</h5>
          <p>ID: 159596</p>
          <p>Email: aram.alazzam.2002@gmail.com</p>
          <p>Phone: (963) 0934-178575</p>
        </Col>
      </Row>
    </Container>
  );
}


export default AboutUs;
