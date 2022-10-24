import React, { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import { RotatingLines } from "react-loader-spinner";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import "./AuthForm.css";

import AuthContext from "../../context/AuthContext";

function AuthForm(props) {
  const { page } = props;

  const {
    handleLogin,
    handleRegister,
    handleResetPassword,
    handleRequestResetPassword,
    message,
    setMessage,
    loading,
  } = useContext(AuthContext);

  const [params] = useSearchParams();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [hidePassword1, setHidePassword1] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);

  const [notify, setNotify] = useState(() => {
    if (page === "login") {
      if (params.get("verified") === "True")
        return "Your email has been verified. You can login to website.";
      if (params.get("verified") === "False")
        return "Time to verify your email has expired. You can check lastest email to reverify your email.";
      if (params.get("verified") === "Error")
        return "Your link to activate your account have not correct. Recheck your email.";
    }
    if (page === "reset-password") {
      if (params.get("token-verified") === "INVALID")
        return "Token to verify your email not true ỏr expired. Please try a new one forgot password in login page.";
    }
    return "";
  });

  const handleLoginForm = async () => {
    if (
      userData.email &&
      userData.email.includes("@") &&
      userData.email.includes(".com")
    ) {
      handleLogin(userData.email, userData.password);
    } else {
      setMessage({
        error: "Entered invalid email. (Email must contain @ and .com)",
        success: "",
      });
    }
  };

  const checkPasswordInput = (password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setMessage({
        error: "Password and password confirm does't match.",
        success: "",
      });
      return 0;
    }
    if (password.length < 8) {
      setMessage({
        error: "Password so short. (Password should be >=8 character.)",
        success: "",
      });
      return 0;
    }
    return 1;
  };

  const handleRigisterForm = async () => {
    if (checkPasswordInput(userData.password, userData.passwordConfirm) === 1) {
      handleRegister(userData.email, userData.username, userData.password);
    }
  };

  const handleResetPasswordForm = async () => {
    if (checkPasswordInput(userData.password, userData.passwordConfirm) === 1) {
      handleResetPassword(
        userData.password,
        params.get("uidb64"),
        params.get("token")
      );
    }
  };

  const handleRequestResetPasswordForm = async () => {
    if (
      userData.email &&
      userData.email.includes("@") &&
      userData.email.includes(".com")
    ) {
      handleRequestResetPassword(userData.email);
    } else {
      setMessage({
        error: "Entered invalid email. (Email must contain @ and .com)",
        success: "",
      });
    }
  };

  const handleKeydownPasswordInput = async (e) => {
    if (e.which === 13 && page === "login") {
      handleLoginForm();
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="background"
          />
        </MDBCol>

        <MDBCol
          col="4"
          md="6"
          className="d-flex flex-column justify-content-center"
        >
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-bold mb-3 me-3 text-primary">
              {page === "login"
                ? "Sign in"
                : page === "register"
                ? "Register Account"
                : page === "reset-password"
                ? "Reset password"
                : "Request reset password"}
            </p>
          </div>{" "}

          {page === "request-reset-password" && (
            <dir className="text-center text-small mb-3 text__font-family__custom">
              Enter your email
            </dir>
          )}
          {message.success && (
            <div className="text-center text-small text-success mb-3 text__font-family__custom">
              {message.success}
            </div>
          )}
          {notify && (
            <div className="text-center text-small text-success mb-3 text__font-family__custom">
              {notify}
            </div>
          )}
          {(page === "login" ||
            page === "register" ||
            page === "request-reset-password") && (
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="formControlLgEmail"
              type="email"
              size="lg"
              autoFocus
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          )}
          {page === "register" && (
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="formControlLgUsername"
              type="text"
              size="lg"
              autoFocus
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          )}
          {page !== "request-reset-password" && (
            <div className="password__input__swapper">
              <div>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLgPassword"
                  type={hidePassword1 ? "password" : "text"}
                  size="lg"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => handleKeydownPasswordInput(e)}
                />
              </div>

              <div
                className="password__input__icon"
                onClick={() => setHidePassword1((prev) => !prev)}
              >
                {hidePassword1 ? (
                  <BsEyeFill size={20} />
                ) : (
                  <BsEyeSlashFill size={20} />
                )}
              </div>
            </div>
          )}
          {(page === "register") | (page === "reset-password") ? (
            <div className="password__input__swapper">
              <div>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password confirm"
                  id="formControlLgPasswordConfirm"
                  type={hidePassword2 ? "password" : "text"}
                  size="lg"
                  value={userData.passwordConfirm}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      passwordConfirm: e.target.value,
                    }))
                  }
                />
              </div>
              <div
                className="password__input__icon"
                onClick={() => setHidePassword2((prev) => !prev)}
              >
                {hidePassword2 ? (
                  <BsEyeFill size={20} />
                ) : (
                  <BsEyeSlashFill size={20} />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="d-flex justify-content-between mb-2"
            onClick={() => {
              setMessage({ success: "", error: "" });
              setNotify("");
            }}
          >
            {page === "login" ? (
              <Link to="/request-reset-password">Forgot password?</Link>
            ) : (
              ""
            )}
          </div>
          {message.error && (
            <div className="text-center text-small text-md-start mb-3 text-danger text__font-family__custom">
              {message.error}
            </div>
          )}
          {loading && (
            <>
              <div className="text-small text-danger d-flex justify-content-center">
                <RotatingLines strokeColor="#1266f1" width="42" />
              </div>
              <div className="text-center text-small fs-6 text-primary text__font-family__custom">
                please wait a minute
              </div>
            </>
          )}
          <div className="text-center text-md-start pt-2">
            <MDBBtn
              className="mb-0 px-5"
              size="lg"
              onClick={
                page === "login"
                  ? handleLoginForm
                  : page === "register"
                  ? handleRigisterForm
                  : page === "reset-password"
                  ? handleResetPasswordForm
                  : handleRequestResetPasswordForm
              }
            >
              {page === "login"
                ? "Login"
                : page === "register"
                ? "Register"
                : page === "reset-password"
                ? "Reset password"
                : "Request reset password"}
            </MDBBtn>
          </div>
          {page === "login" ? (
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="link-danger"
                onClick={() => {
                  setMessage({ success: "", error: "" });
                  setNotify("");
                  setHidePassword1(true);
                  setHidePassword2(true);
                }}
              >
                Register
              </Link>
            </p>
          ) : (
            <p className="small fw-bold mt-2 pt-1 mb-2">
              You already have an account?{" "}
              <Link
                to="/login"
                className="link-primary"
                onClick={() => {
                  setMessage({ success: "", error: "" });
                  setNotify("");
                  setHidePassword1(true);
                  setHidePassword2(true);
                }}
              >
                Login
              </Link>
            </p>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AuthForm;
