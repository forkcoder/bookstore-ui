import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookPage from "../pages/BookPage";
import NavBar from "../components/Navbar";
import imagePath from "../assets/bookstore.jpeg";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <NavBar
        brandName="Bookstore"
        imageSrcPath={imagePath}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      <BookPage />
    </>
  );
};

export default Home;
