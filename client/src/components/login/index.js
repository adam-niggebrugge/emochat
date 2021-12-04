import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
//functionality uses these mui components
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Collapse } from '@mui/material';

import logo from "../../assets/emochat_logo.svg";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [open, setOpen] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: '',
      password: '',
    });
  };


  return (
    <section className="gradient-form" style={{ backgroundColor: "#2E2E2E" }}>
      <div className="container py-0">
        <Collapse in={open}>
          <Alert
            onClick={() => {
              setOpen(false);
            }}
            severity="warning"
          > 
            <AlertTitle>Error</AlertTitle>
            Something went wrong with your login credentials!
          </Alert>
        </Collapse>
        <div
          id="frame"
          className="row d-flex justify-content-center align-items-center"
        >
          <div className="col-xl-10">
            <div className="rounded-3 text-light">
              <div className="row g-0">
                <div className="col-xl-6 mx-auto">
                  <div className=" card-body mx-md-4">
                    <div className="d-flex justify-content-center">
                      <img src={logo} alt="logo" />
                    </div>
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">
                          username
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          placeholder="username"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="text-center pt-1 mb-1 pb-1">
                        <button
                          className="btn btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          log in
                        </button>
                      </div>
                      <div className="flex-column align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/register">
                          <button
                            id="main_button"
                            type="button"
                            className="btn w-100"
                          >
                            create new
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
