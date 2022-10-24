import React from "react";
import { AuthForm } from "../../components";

import "./Authentication.css";

const Authentication = (props) => {
  const { page } = props;
  return (
    <>
      <div className="login__container">
        <AuthForm page={page}/>
      </div>
    </>
  );
};

export default Authentication;
