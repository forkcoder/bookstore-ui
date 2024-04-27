import { useState } from "react";

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onNavItemClicked: (itemName: string) => void;
}

function NavBar({ brandName, imageSrcPath, navItems, isAuthenticated, onLogin, onLogout, onNavItemClicked }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const onClickHandler = (index:number)=>{
    setSelectedIndex(index);
    const selectedItem = navItems[index];
    onNavItemClicked(selectedItem)
  }
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={imageSrcPath}
            width="60"
            height="60"
            className="d-inline-block align-center"
            alt=""
          />
          <span className="fw-bolder fs-4"> {brandName}</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse
         navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((items, index) => (
              <li
                key={items}
                className="nav-item"
                onClick={() => onClickHandler(index)}
              >
                <span
                  style={{cursor:'pointer'}}
                  className={
                    selectedIndex === index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                >
                  {items}
                </span>
              </li>
            ))}
          </ul>
          {/* Render login/logout button based on authentication status */}
          {isAuthenticated ? (
            <button className="btn btn-outline-primary me-3" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary me-3" onClick={onLogin}>
              Login
            </button>
          )}
          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
