import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import "./Header.css"; // Import custom CSS for styling

import { useHistory } from 'react-router-dom';
function Header({match}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const history = useHistory()
  const logoutHandler = () => {
    dispatch(logout()); 
    history.push('/')
  };

  //adding span
  
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          {/* <img
           src="" // Replace with your logo URL
            alt="Simply Market Logo"
             className="logo"
           /> */}
            <Navbar.Brand > <span className="brand-name">  Simply</span> </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox className="modern-search" />
            <Nav className="ml-auto">
              {userInfo ? (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <div></div>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenue"
                  className="nav-dropdown"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item
                      className="nav-dropdown-item"
                      to="/admin/userlist"
                    >
                      <i className="fas fa-users nav-dropdown-icon"></i> Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="nav-dropdown-item">
                      <i className="fas fa-box nav-dropdown-icon"></i> Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      <i className="fas fa-receipt nav-dropdown-icon"></i>{" "}
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              <LinkContainer to="/about">
                <Nav.Link>
                  <i className="about"></i> About Us
               </Nav.Link>
              </LinkContainer>
              {userInfo &&
              <LinkContainer to="/favorite">
              <Nav.Link>
              <i className="fav"></i> Favorite
              </Nav.Link>

              </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
