import { Link } from "react-router-dom";
interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  isAuthenticated: boolean;
  onLogout: () => void;
}

function NavBar({
  brandName,
  imageSrcPath,
  isAuthenticated,
  onLogout,
}: NavBarProps) {
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? (
            <>
              <ul
                className="navbar-nav me-auto mb-2 mb-md-1"
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <li className="nav-item">
                  <span style={{ cursor: "pointer" }} className={"nav-link"}>
                    Home
                  </span>
                </li>
                <li className="nav-item">
                  <span style={{ cursor: "pointer" }} className={"nav-link"}>
                    Your Collection
                  </span>
                </li>

                <li className="nav-item">
                  <span style={{ cursor: "pointer" }} className={"nav-link"}>
                    Your Point is ?
                  </span>
                </li>
              </ul>
              <button
                className="btn btn-outline-primary me-3"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ul
                className="navbar-nav me-auto mb-2 mb-md-1"
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <li className="nav-item">
                  <span style={{ cursor: "pointer" }} className={"nav-link"}>
                    Home
                  </span>
                </li>
              </ul>
              <Link
                to="/login"
                className="login-link"
                style={{ margin: "auto 10px" }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
