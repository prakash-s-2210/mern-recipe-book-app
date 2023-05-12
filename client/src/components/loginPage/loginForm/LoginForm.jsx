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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show error popup message
const notifyError = ( message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// Function to show success popup message
const notifySuccess = ( message, delay) => {
  toast.success(message, {
    position: "top-center",
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};


// validation schema for register form
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  picture: yup.string().required("required"),
});

// validation schema for login form
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
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
    try {
      // this allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picture", values.picture.name);
      const savedUserResponse = await axios.post(
        "https://recipe-book-ycpw.onrender.com/auth/register",
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
        notifySuccess("Successfully Registered!",1000);
        setPageType("login");
      }
    } catch (error) {
      notifyError("Email id already exists!");
    }
  };

  // function to handle login form submission
  const login = async (values, onSubmitProps) => {
    try{
    const loggedInResponse = await axios.post(
      "https://recipe-book-ycpw.onrender.com/auth/login",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
  }
  catch(error){
    if(error.response.data.msg === "User does not exist. "){
      notifyError("User does not exist !");
    }
    else{
      notifyError("Invalid credentials !")
    }
  }
  };

  // function to handle form submission for both login and register forms
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit} // Define the function to handle form submission
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} // Define the initial values based on whether the user is logging in or registering
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
                      ) : (
                        // Render the uploaded picture and an edit icon if a picture has been uploaded
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
              {props.errors.picture && (
                <div className="error">{props.errors.picture}</div>
              )}
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
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
