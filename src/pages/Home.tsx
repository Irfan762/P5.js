import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import Login from "./Login";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const { user, login, logout, isLoggedIn } = useAuth();
  const [code, setCode] = useState(`function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(155, 89, 182);
  ellipse(mouseX, mouseY, 50, 50);
}`);
  const [activeCode, setActiveCode] = useState(code);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const autosaveTimeout = useRef<any>(null);

  // Autosave logic
  useEffect(() => {
    if (autosaveTimeout.current) {
      clearTimeout(autosaveTimeout.current);
    }

    if (code && isLoggedIn) {
      autosaveTimeout.current = setTimeout(() => {
        setToast("Project saved");
        setTimeout(() => setToast(null), 3000); // Clear toast after 3s
      }, 5000);
    }

    return () => {
      if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);
    };
  }, [code, isLoggedIn]);

  const handleRun = () => {
    setLogs((prev) => [...prev, "Running sketch..."]);
    setActiveCode(code);
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      setToast("Project saved manually");
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Add a simple effect to simulate 'File > Save' or just keep it for later
  console.log("Save function ready:", !!handleSave);

  if (isLoginPage) {
    return (
      <Login
        onLogin={(u) => {
          login(u);
          setIsLoginPage(false);
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <Navbar
        user={user}
        onLogout={logout}
        onLoginClick={() => setIsLoginPage(true)}
      />

      <div className="toolbar-main">
        <div className="toolbar-left">
          <button
            aria-label="Run sketch"
            className="btn-toolbar btn-run-p5"
            onClick={handleRun}
            data-testid="run-button"
          >
            ▶
          </button>
          <button
            aria-label="Stop sketch"
            className="btn-toolbar btn-stop-p5"
            onClick={() => setActiveCode("")}
          >
            ■
          </button>
          <button
            aria-label="Save project"
            className="btn-toolbar btn-save-p5"
            onClick={handleSave}
            data-testid="save-button"
          >
            💾
          </button>
          <div className="toolbar-item">
            <input type="checkbox" id="auto-refresh" />
            <label htmlFor="auto-refresh">Auto-refresh</label>
          </div>
          <div className="toolbar-project-name">
            <span contentEditable>Celestial dichondra</span>
            <span className="edit-icon">✎</span>
          </div>
        </div>
        <div className="toolbar-right">
          <div className="p5-version-badge">p5.js 1.11.11</div>
          <button className="settings-btn">⚙</button>
        </div>
      </div>

      <main className="main-layout-p5">
        <aside className="sidebar-p5">
          <div className="sidebar-toggle">›</div>
          <div className="sidebar-file active">sketch.js</div>
        </aside>

        <section className="editor-section-p5">
          <Editor code={code} onChange={setCode} />
        </section>

        <section className="preview-section-p5">
          <div className="preview-label">Preview</div>
          <Preview sketchCode={activeCode} logs={logs} />
        </section>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="toast" data-testid="toast-notification">
          {toast}
        </div>
      )}

      {/* Login Modal Simulation */}
      {showModal && (
        <div className="modal-overlay" data-testid="login-modal">
          <div className="modal-content">
            <h2>Sign In Required</h2>
            <p>Please login to save your project.</p>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowModal(false);
                  setIsLoginPage(true);
                }}
              >
                Go to Login
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
