import React from "react";
import "./Profile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import avatar from "../../assets/avatar.png";
import { userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../services/functions";
import { Button } from "react-bootstrap";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUserData = useSelector(userData);

  const birthday = rdxUserData.credentials.token.birthday;
  const formattedBirthday = dateFormat(birthday);

  return (
    <div className="profileDesign">
      <Container className="profileContainer">
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="centerContent">
            <img className="profileLogo" src={avatar} alt="" />
          </Col>
          <Col md={3}></Col>
        </Row>
        <Row>
        <Col md={4}></Col>
          <Col className="profileColumn mb-3 flexEnd" md={2}>
            <a>Name</a>
          </Col>
          <Col className="profileColumn mb-3" md={4}>
            {rdxUserData.credentials.token.name}{" "}
            {rdxUserData.credentials.token.lastname}
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
            <Col md={4}></Col>
          <Col className="profileColumn mb-3 flexEnd" md={2}>
            <a>Email</a>
          </Col>
          <Col className="profileColumn mb-3" md={4}>
            {rdxUserData.credentials.token.email}
          </Col>
          <Col md={2}></Col>
        </Row>
        {rdxUserData.credentials.token.birthday != null ? (
          <Row>
            <Col md={4}></Col>
            <Col className="profileColumn mb-3 flexEnd" md={2}>
              <a>Birthday</a>
            </Col>
            <Col className="profileColumn mb-3" md={4}>
              {formattedBirthday}
            </Col>
            <Col md={2}></Col>
          </Row>
        ) : (
          <></>
        )}
        {rdxUserData?.credentials?.token?.country ? (
          <Row>
            <Col md={4}></Col>
            <Col className="profileColumn mb-3 flexEnd" md={2}>
              <a>Country</a>
            </Col>
            <Col className="profileColumn mb-3" md={4}>
              {rdxUserData.credentials.token.country}
            </Col>
            <Col md={2}></Col>
          </Row>
        ) : (
          <></>
        )}
            <Button className="editProfileBtn" size="md">
              Edit your profile
            </Button>
      </Container>
    </div>
  );
};
