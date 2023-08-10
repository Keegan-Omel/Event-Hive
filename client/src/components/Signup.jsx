// // IMPORT DEPENDENCIES
// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import { useMutation } from "@apollo/client";

// import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

// const Signup = () => {
//   // SET INITIAL FORM STATE
//   const [userFormData, setUserFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // SET STATE FOR FORM VALIDATION
//   const [validate] = useState(false);
//   // SET STATE FOR ALERT
//   const [showAlert, setShowAlert] = useState(false);

//   // FUNCTION TO HANDLE INPUT CHANGES IN THE FORM FIELDS
//   const userInputUpdate = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   // MUTATION HOOK FOR ADDING A NEW USER
//   const [createUser] = useMutation(ADD_USER);

//   // FUNCTION TO HANDLE FORM SUBMISSION
//   const handleFormSubmission = async (event) => {
//     event.preventDefault();
//     // CHECK IF FORM HAS VALID INPUT ACCORDING TO REACT-BOOTSTRAP DOCS
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       const { data } = await createUser({
//         variables: { ...userFormData },
//       });

//       // CHECK IF RESPONSE DATA IS PRESENT
//       if (!data) {
//         throw new Error("Something doesn't look right!");
//       }

//       const token = await data.createUser.token;

//       // CALL THE Auth.login METHOD TO SET THE USER'S AUTHENTICATION TOKEN
//       Auth.login(token);
//     } catch (err) {
//       console.error(err);
//       // SHOW ALERT IN CASE OF AN ERROR DURING SIGNUP
//       setShowAlert(true);
//     }

//     // RESET FORM FIELDS AFTER SUBMISSION
//     setUserFormData({
//       username: "",
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <Form
//       id="signup-form"
//       className="chess-signup-form"
//       noValidate
//       validate={validate}
//       onSubmit={handleFormSubmission}
//     >
//       <Alert
//         dismissible
//         onClose={() => setShowAlert(false)}
//         show={showAlert}
//         variant="danger"
//       >
//         SOMETHING WENT WRONG WITH YOUR SIGNUP!
//       </Alert>

//       {/* USERNAME INPUT */}
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="username" className="form-label">
//           Username:
//         </Form.Label>
//         <Form.Control
//           type="text"
//           className="form-control"
//           id="username"
//           placeholder="Username"
//           name="username"
//           onChange={userInputUpdate}
//           value={userFormData.username}
//           required
//         />
//         <Form.Control.Message type="invalid">
//           Username is invalid, please enter username!
//         </Form.Control.Message>
//       </Form.Group>

//       {/* EMAIL INPUT */}
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="email" className="form-label">
//           Email:
//         </Form.Label>
//         <Form.Control
//           type="email"
//           className="form-control"
//           id="email"
//           placeholder="Email"
//           name="email"
//           onChange={userInputUpdate}
//           value={userFormData.email}
//           required
//         />
//         <Form.Control.Message type="invalid">
//         Email is invalid, please enter email!
//         </Form.Control.Message>
//       </Form.Group>

//       {/* PASSWORD INPUT */}
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="password" className="form-label">
//           Password:
//         </Form.Label>
//         <Form.Control
//           type="password"
//           className="form-control"
//           id="password"
//           placeholder="Password must be over (8) Characters long"
//           name="password"
//           onChange={userInputUpdate}
//           value={userFormData.password}
//           required
//         />
//         <Form.Control.Message type="invalid">
//         password is invalid, please enter password!
//         </Form.Control.Message>
//       </Form.Group>

//       {/* SIGN UP BUTTON */}
//       <Button type="submit" className="btn btn-primary">
//         SIGN-UP!
//       </Button>
//     </Form>
//   );
// };

// // EXPORT SIGNUP COMPONENT
// export default Signup;


import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// import appolo hook and add user mutation
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // declared the addUser with the useMutation
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // use addUser function
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Signup;
