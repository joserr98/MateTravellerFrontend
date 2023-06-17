import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Title from "../../assets/finallogo.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUser } from "../../services/apiCalls";
import { ErrorToast } from "../../common/ErrorToast/ErrorToast";

export const Register = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUserFunction = () => {
    registerUser(credentials)
    .then(() => {
      navigate("/login");
    })
    .catch((err) => {
      setErrorMessage(err.response.data.message);
      setShowToast(true);});
  }

  const inputHandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="registerDesign">
      <div className="loginTitle mb-4">
        <img className="homeLogo"  src={Title} alt="SVG Image" />
      </div>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control name={"name"} type="text" placeholder="Your name..." onChange={(e) => inputHandlerFunction(e)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control name={"email"} type="email" placeholder="name@example.com" onChange={(e) => inputHandlerFunction(e)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control name={"password"} type="password" onChange={(e) => inputHandlerFunction(e)}/>
      </Form.Group>

      <div className="d-grid gap-1">
        <Button className="registerBtn" size="xs" onClick={() => registerUserFunction()}>
          Create account
        </Button>
      </div>
    </Form>
    <ErrorToast
          setShowToast={setShowToast} 
          showToast={showToast}
          errorMessage={errorMessage}
        />
    </div>
  );
};
