import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { BsTriangleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../pages/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const logoutUserFunction = () => {
    dispatch(logout({ credentials: {} }));
    navigate("/");
  };

  return (
    <div className="navbarDesign">
      {!rdxUserData?.credentials?.token ? (
        <Navbar expand="md" className="navbarDesign">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>M<BsTriangleFill/>TETRAVELER</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav">
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="navbarLinks" onClick={() => navigate("/trips")}>Trips</Nav.Link>
                <Nav.Link className="navbarLinks" onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link className="navbarLinks" onClick={() => navigate("/register")}>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <>
        <Navbar expand="md" className="navbarDesign">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>M<BsTriangleFill/>TETRAVELER</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav">
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/profile")}>
                      {rdxUserData.credentials.token.name}
                </Nav.Link>
                <Nav.Link className="navbarLinks" onClick={() => navigate("/trips")}>Trips</Nav.Link>
                <Nav.Link className="navbarLinks" onClick={() => logoutUserFunction()}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
      )}
    </div>
    
  );
};
