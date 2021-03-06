import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";

// //functionality uses these mui components
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Collapse from '@mui/material/Collapse';
//graphql required imports
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Register = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // set state for alert
  const [open, setOpen] = useState(false);
  //allow for form submission via graphql
  const [addUser, { error }] = useMutation(ADD_USER);
  const history = useNavigate();

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

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
       const { data } = await addUser({
        variables: { ...userFormData },
      });
     
      Auth.login(data.addUser.token);
      localStorage.setItem("userInfo", JSON.stringify(data.addUser));
      history("/chats");
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#2E2E2E" }}>
      <div className="container py-0">
      {/* <Collapse in={open}>
          <Alert
            onClick={() => {
              setOpen(false);
            }}
            severity="warning"
          > 
            <AlertTitle>Error</AlertTitle>
            Something went wrong with your login credentials!
          </Alert>
        </Collapse> */}
        <div
          id="frame"
          className="row d-flex justify-content-center align-items-center"
        >
          <div className="col-lg-8 col-xl-6">
            <div className="rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-light mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 pt-5">
                  {/* Registration Info */}
                </h3>
                <form className="px-md-2" onSubmit={handleFormSubmit}>
                  <div className="form-outline mb-4">
                    <label
                      className="text-light form-label w-100 text-left mb-2"
                      htmlFor="form3Example1q"
                    >
                      name
                    </label>
                    <input
                      type="text"
                      id="form3Example1q"
                      name="name"
                      autoComplete="name"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label text-light"
                        >
                          email
                        </label>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          className="form-control"
                          id="exampleDatepicker1"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                    <div className="col-md-6">
                      <div className="form-outline">
                        <label
                          className="form-label text-light"
                          htmlFor="form3Example1w"
                        >
                          password
                        </label>
                        <input
                          type="password"
                          id="form3Example1w"
                          name="password"
                          autoComplete="new-password"
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline">
                        <label
                          className="form-label text-light"
                          htmlFor="form3ExampleConfirm"
                        >
                          confirm password
                        </label>
                        <input
                          type="password"
                          id="form3ExampleConfirm"
                          className="form-control"
                          placeholder="Confirm password"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mt-5 file-upload-wrapper">
                        <label className="form-label text-light">
                          upload your photo
                        </label>
                        <input
                          type="file"
                          id="input-file-max-fs"
                          className="file-upload text-light"
                          data-max-file-size="2M"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-lg mb-1 text-dark"
                  >
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
