import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "./login.css";
import Title from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { loginUser } from "../../services/apiCalls";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUserData = useSelector(userData);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputLoginHandler = (e) => {
    setCredentials((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUserFunction = () => {
    loginUser(credentials)
      .then((result) => {

        const data = {
          jwt: result.data.token,
          token: result.data.data,
        };

        dispatch(login({ credentials: data }));
        navigate("/");
      })

      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (rdxUserData.credentials.token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="loginDesign">
      <div className="loginTitle">
        <img className="homeLogo" src={Title} alt="" />
      </div>
      <div className="formDesignShadow">
        <Form className="formDesign">
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={(e) => inputLoginHandler(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => inputLoginHandler(e)}
            />
          </Form.Group>

          <Button className="bsSubmit" bsSize="small" onClick={() => loginUserFunction()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
