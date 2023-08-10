// IMPORT DEPENDENCIES
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  // INITIALIZE STATE FOR USER FORM DATA
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  // INITIALIZE STATE FOR FORM VALIDATION
  const [isFormValid, setFormValidity] = useState(false);

  // INITIALIZE STATE FOR ALERT DISPLAY
  const [isAlertVisible, setAlertVisibility] = useState(false);

  // USE LOGIN_USER MUTATION FROM APOLLO CLIENT
  const [loginUser] = useMutation(LOGIN_USER);

  // HANDLE INPUT CHANGE EVENT
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // UPDATE USER FORM DATA STATE
    setUserFormData({ ...userFormData, [name]: value });
  };

  // HANDLE FORM SUBMISSION EVENT
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // CHECK FORM VALIDITY USING REACT-BOOTSTRAP VALIDATED PROP
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // CALL LOGIN_USER MUTATION WITH USER FORM DATA
      const response = await loginUser({ variables: { ...userFormData } });

      if (!response) {
        throw new Error("An error occurred while processing your request.");
      }

      // EXTRACT TOKEN FROM RESPONSE AND LOGIN USER
      const { token } = await response.data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      // DISPLAY ALERT FOR LOGIN ERROR
      setAlertVisibility(true);
    }

    // RESET USER FORM DATA AFTER SUBMISSION
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={isFormValid} onSubmit={handleFormSubmit}>
        {/* DISPLAY ALERT FOR LOGIN ERROR */}
        <Alert
          dismissible
          onClose={() => setAlertVisibility(false)}
          show={isAlertVisible}
          variant="danger"
        >
          Something is wrong with your login details.
        </Alert>
        {/* EMAIL INPUT FIELD */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/* FEEDBACK FOR INVALID EMAIL */}
          <Form.Control.Feedback type="invalid">
            Please use a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        {/* PASSWORD INPUT FIELD */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {/* FEEDBACK FOR INVALID PASSWORD */}
          <Form.Control.Feedback type="invalid">
            Invalid Password! 
          </Form.Control.Feedback>
        </Form.Group>
        
        {/* SUBMIT BUTTON */}
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Log-In
        </Button>
      </Form>
    </>
  );
};

export default Login;

