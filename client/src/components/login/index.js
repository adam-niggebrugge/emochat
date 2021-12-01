import React from "react";

const Login = () => {
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
                      <img src="../public/assets/emochat_logo.svg" alt="logo" />
                    </div>
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">
                          username
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          placeholder="username"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          password
                        </label>
                        <input
                          type="text"
                          id="password"
                          className="form-control"
                        />
                      </div>
                      <div className="text-center pt-1 mb-1 pb-1">
                        <button
                          className="btn btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                        >
                          log in
                        </button>
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button id="main_button" type="button" className="btn">
                          create new
                        </button>
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
