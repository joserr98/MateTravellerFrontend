import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { BsTriangleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
export const Header = () => {
  
  const navigate = useNavigate();
  return (
    <div className="navbarDesign">
        <Navbar expand="md" className="navbarDesign">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>M<BsTriangleFill/>TETRAVELLER</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav">
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="navbarLinks" onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link className="navbarLinks" onClick={() => navigate("/register")}>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
};
