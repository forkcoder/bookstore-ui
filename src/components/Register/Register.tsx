import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss";
import landingPageImage from "../../assets/landing.jpg";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

interface ErrorResponse {
  errors: FieldErrors;
}

interface LoginResponse {
  token: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        formData,
      );

      const responseData = response.data as LoginResponse;
      localStorage.setItem("token", responseData.token);
      setSuccessMessage("Registration successful.");
      setErrors({});
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorResponse = error.response.data as ErrorResponse;
        setErrors(errorResponse.errors);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "An error occurred while registering.",
        }));
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          {errors.general && <div className="error">{errors.general}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <Link
            to="/login"
            className="login-link"
            style={{ margin: "auto 10px" }}
          >
            Login
          </Link>
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="image-container">
        <img
          src={landingPageImage}
          alt="Landing Page"
          className="responsive-image"
        />
      </div>
    </div>
  );
};

export default Register;
