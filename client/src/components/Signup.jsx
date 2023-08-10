// IMPORT DEPENDENCIES
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  // SET INITIAL FORM STATE
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // SET STATE FOR FORM VALIDATION
  const [validate] = useState(false);
  // SET STATE FOR ALERT
  const [showAlert, setShowAlert] = useState(false);

  // FUNCTION TO HANDLE INPUT CHANGES IN THE FORM FIELDS
  const userInputUpdate = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // MUTATION HOOK FOR ADDING A NEW USER
  const [createUser] = useMutation(ADD_USER);

  // FUNCTION TO HANDLE FORM SUBMISSION
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    // CHECK IF FORM HAS VALID INPUT ACCORDING TO REACT-BOOTSTRAP DOCS
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      // CHECK IF RESPONSE DATA IS PRESENT
      if (!data) {
        throw new Error("Something doesn't look right!");
      }

      const token = await data.createUser.token;

      // CALL THE Auth.login METHOD TO SET THE USER'S AUTHENTICATION TOKEN
      Auth.login(token);
    } catch (err) {
      console.error(err);
      // SHOW ALERT IN CASE OF AN ERROR DURING SIGNUP
      setShowAlert(true);
    }

    // RESET FORM FIELDS AFTER SUBMISSION
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form
      id="signup-form"
      className="chess-signup-form"
      noValidate
      validate={validate}
      onSubmit={handleFormSubmission}
    >
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        SOMETHING WENT WRONG WITH YOUR SIGNUP!
      </Alert>

      {/* USERNAME INPUT */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username" className="form-label">
          Username:
        </Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
          name="username"
          onChange={userInputUpdate}
          value={userFormData.username}
          required
        />
        <Form.Control.Message type="invalid">
          Username is invalid, please enter username!
        </Form.Control.Message>
      </Form.Group>

      {/* EMAIL INPUT */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email" className="form-label">
          Email:
        </Form.Label>
        <Form.Control
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          name="email"
          onChange={userInputUpdate}
          value={userFormData.email}
          required
        />
        <Form.Control.Message type="invalid">
        Email is invalid, please enter email!
        </Form.Control.Message>
      </Form.Group>

      {/* PASSWORD INPUT */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password" className="form-label">
          Password:
        </Form.Label>
        <Form.Control
          type="password"
          className="form-control"
          id="password"
          placeholder="Password must be over (8) Characters long"
          name="password"
          onChange={userInputUpdate}
          value={userFormData.password}
          required
        />
        <Form.Control.Message type="invalid">
        password is invalid, please enter password!
        </Form.Control.Message>
      </Form.Group>

      {/* SIGN UP BUTTON */}
      <Button type="submit" className="btn btn-primary">
        SIGN-UP!
      </Button>
    </Form>
  );
};

// EXPORT SIGNUP COMPONENT
export default Signup;

