import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/SignUp.css';

const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [validation, setValidation] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error }] = useMutation(CREATE_USER); // Use the CREATE_USER mutation

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleInputBlur = (event) => {
    const { name, value } = event.target;
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: value.trim() === '',
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidation({
        username: userFormData.username.trim() === '',
        email: !/^\S+@\S+\.\S+$/.test(userFormData.email),
        password: userFormData.password.length < 8,
      });
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    } finally {
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
      setSubmitting(false);
    }
  };

  return (
    <Container className="Container mt-2"> {/* Replace "mt-5" with your desired margin */}
  <h2 className="FormLabel">Sign Up</h2>
      <Form noValidate validated={false} onSubmit={handleFormSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={userFormData.username}
            required
            isInvalid={validation.username}
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={userFormData.email}
            required
            isInvalid={validation.email}
          />
          <Form.Control.Feedback type="invalid">
            Email is required and must be a valid email address!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password (min. 8 characters)"
            name="password"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={userFormData.password}
            required
            isInvalid={validation.password}
          />
          <Form.Control.Feedback type="invalid">
            Password is required and must be at least 8 characters long!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={submitting}
          type="submit"
          variant="primary"
        >
          {submitting ? 'Signing up...' : 'Submit'}
        </Button>
        {showAlert && (
          <Alert variant="danger" className="mt-3">
            Something went wrong with your signup!
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default Signup;
