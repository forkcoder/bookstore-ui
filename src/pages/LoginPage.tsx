import React from "react";
import Login from "../components/Login/Login";

const LoginPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexGrow: "1", alignSelf: "center" }}>
      <Login />
    </div>
  );
};

export default LoginPage;
