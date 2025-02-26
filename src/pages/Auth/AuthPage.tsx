import "../../assets/css/global.css";
import React from "react";
import "./AuthPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets//images/icons/clock.svg";

const AuthPage: React.FC = () => {
  return (
    <>
      <div className="container" style={{ fontFamily: "Nunito" }}>
        <div className="logo_box">
          <img src={logo} alt="icon" className="logo" />
          <p>Контролька</p>
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default AuthPage;
