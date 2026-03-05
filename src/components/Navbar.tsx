import React from "react";

interface NavbarProps {
  user: string | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLoginClick }) => {
  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <span className="logo-p5">p5</span>
          <span className="logo-star">*</span>
        </div>
        <ul className="navbar-menu">
          <li>File ▾</li>
          <li>Edit ▾</li>
          <li>Sketch ▾</li>
          <li>Help ▾</li>
          <li>English ▾</li>
        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            <span className="username" data-testid="username-display">
              {user}
            </span>
            <button className="nav-link" onClick={onLogout} data-testid="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <button className="nav-link" onClick={onLoginClick} data-testid="login-button">
              Log in
            </button>
            <span className="separator">or</span>
            <button className="nav-link">Sign up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
