import React, { useState, FormEvent } from "react";
import axios from "axios";
import "./Login.scss";
import loginImage from "../../assets/landing.jpg";
import { useNavigate, Link } from "react-router-dom";

interface LoginResponse {
  token: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/login",
        {
          email,
          password,
        },
      );

      console.log("Login successful");
      console.log("Response:", response.data);

      const responseData = response.data as LoginResponse;
      localStorage.setItem("token", responseData.token);
      console.log("Token:", responseData.token);
      setErrors({});
      navigate("/");

      setErrors({});
    } catch (error: any) {
      console.error("Error occurred:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorResponse = error.response.data.errors as FieldErrors;
        setErrors(errorResponse);
      } else {
        setErrors({
          general: "Invalid email or password.",
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-error">
            {errors.general && <span className="error">{errors.general}</span>}
          </div>
          <button type="submit">Login</button>
          <Link
            to="/register"
            className="register-link"
            style={{ margin: "auto 10px" }}
          >
            Register
          </Link>
        </form>
      </div>
      <div className="image-container">
        <img src={loginImage} alt="Landing Page" className="responsive-image" />
      </div>
    </div>
  );
};

export default Login;
