import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./login.css";
import Title from "../../assets/matetravellerlogo.png";
export const Login = () => {
  return (
    <div className="loginDesign">
      <div className="loginTitle">
        <img className="homeLogo" src={Title} alt="" />
      </div>
      <div className="formDesignShadow">
        <Form className="formDesign">
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Button className="bsSubmit" bsSize="small">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
