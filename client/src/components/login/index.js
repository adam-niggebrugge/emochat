import React, { useState } from "react";

// import { Link } from "react-router-dom";

import logo from "../../assets/emochat_logo.svg";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const toast = useToast();
  const history = useNavigate();

  const [login ] = useMutation(LOGIN_USER);

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
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      Auth.login(data.login.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      history("/chats");
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
                      {/* <div className="flex-column align-items-center justify-content-center pb-4">
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
                      </div> */}
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
