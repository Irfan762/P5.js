import React, { useState } from "react";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("gsoc_candidate");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-card glass">
        <h2>Login to p5.js Prototype</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              data-testid="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <p className="hint">Hint: Any username will work. It's a prototype.</p>
          <button
            type="submit"
            aria-label="Enter Prototype"
            className="btn btn-primary btn-block"
            data-testid="submit-login"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
