import React, { useState } from "react";
import "../loginForm/LoginForm.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../state/index";
import Dropzone from "react-dropzone";
import Input from "../customInput/Input";

// validation schema for register form
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// validation schema for login form
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// initial values for register form
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  // set initial state for page type
  const [pageType, setPageType] = useState("register");

  // define dispatch and navigate hooks for state management and routing
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set variables to determine if form is login or register
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // function to handle register form submission
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture", values.picture.name);
    const savedUserResponse = await axios.post(
      "http://localhost:8080/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const savedUser = await savedUserResponse.data;
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  // function to handle login form submission
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await axios.post("http://localhost:8080/auth/login",
    values,
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const loggedIn = await loggedInResponse.data;
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  // function to handle form submission for both login and register forms
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}// Define the function to handle form submission
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}  // Define the initial values based on whether the user is logging in or registering
      validationSchema={isLogin ? loginSchema : registerSchema} // Define the validation schema based on whether the user is logging in or registering
    >
      {(props) => (
        <Form>
          {isRegister && ( // Render additional inputs if the user is registering
            <>
              <Input label="First Name" name="firstName" type="text" />
              <Input label="Last Name" name="lastName" type="text" />
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  props.setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone-container">
                    <div className="dropzone-wrapper" {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!props.values.picture ? ( // Render text to prompt user to add picture if no picture has been uploaded
                        <p className="add-picture">Add Picture Here</p>
                      ) : ( // Render the uploaded picture and an edit icon if a picture has been uploaded
                        <div className="upload">
                          <span className="uploaded-file-text">
                            {props.values.picture.name}
                          </span>
                          <FontAwesomeIcon className="edit-icon" icon={faPen} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </>
          )}
          <Input label="Email Id" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <div className="button-wrapper">
            <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
          </div>
          <div
            onClick={() => {
              setPageType(isLogin ? "register" : "login"); // Set the page type to "register" or "login" based on whether the user clicked "Don't have an account? Sign Up here." or "Already have an account? Login here."
              props.resetForm(); // Reset the form values when the user switches between the "login" and "register" pages
            }}
            className="login-or-register"
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
