import React, { useState } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import { nonAuthRoutes, authRoutes } from './routers/AppRouter';
import NavBar from "./components/Navbar";
import imagePath from "./assets/bookstore.jpeg";

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem('isAuthenticated');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const navigate = useNavigate();
  
  const handleLogin = () => {
    
    setIsAuthenticated(true);
    
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  
  const handleLogout = () => {
    
    setIsAuthenticated(false);
    
    localStorage.removeItem('isAuthenticated');
  };

  
  let navLinks = isAuthenticated ? ["Home", "Orders", "Books", "Users"] : ["Home", "Login", "Register"];
  const handleNavItemClicked = (itemName:string)=>{
    if(itemName === 'Books')
      navigate('/books');
    else  if(itemName === 'Orders')
      navigate('/orders');
    else  if(itemName === 'Users')
      navigate('/users');
    else  if(itemName === 'Home')
      navigate('/home');
    else  if(itemName === 'Login')
      navigate('/login');
    else  if(itemName === 'Register')
      navigate('/register');
  }
  return (
    <>
      <NavBar
        brandName="Bookstore"
        imageSrcPath={imagePath}
        navItems={navLinks}
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
        onNavItemClicked={handleNavItemClicked}
      />
      <div style={{display:'flex', flexDirection:'column',margin:'10px 10%'}}>
        <Routes>
          {/* Render authenticated routes */}
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={idx}
            />
          ))}

          {/* Render non-authenticated routes */}
          {nonAuthRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={idx}
            />
          ))}
        </Routes>
        </div>
    </>
  );
}

export default App;
