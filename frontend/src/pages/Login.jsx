import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .auth-root {
          min-height: 100vh;
          background: #f7f7fb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .auth-root::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,93,193,0.07) 0%, transparent 70%);
          top: -180px; right: -150px;
          pointer-events: none;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-bottom: 32px;
          animation: fadeUp 0.5s ease both;
        }
        .auth-brand-icon {
          width: 30px; height: 30px;
          background: #6d5dc1;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .auth-brand-name {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .auth-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(109,93,193,0.08), 0 1px 4px rgba(0,0,0,0.04);
          padding: 36px 36px 32px;
          width: 100%;
          max-width: 400px;
          animation: fadeUp 0.5s 0.08s ease both;
          opacity: 0;
        }

        .auth-heading {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 4px;
        }
        .auth-subheading {
          font-size: 13px;
          color: #9090b0;
          margin: 0 0 28px;
          font-weight: 400;
        }

        .auth-field {
          margin-bottom: 16px;
        }
        .auth-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #3a3a5c;
          margin-bottom: 7px;
        }
        .auth-input {
          width: 100%;
          background: #fafafa;
          border: 1.5px solid #e8e8f2;
          border-radius: 9px;
          color: #1a1a2e;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          padding: 11px 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .auth-input::placeholder { color: #b8b8d0; }
        .auth-input:focus {
          border-color: #6d5dc1;
          box-shadow: 0 0 0 3px rgba(109,93,193,0.1);
          background: #fff;
        }

        .auth-error {
          font-size: 12px;
          color: #d94f4f;
          margin-bottom: 14px;
          font-weight: 500;
        }

        .auth-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #6d5dc1;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 13px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(109,93,193,0.28);
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          margin-top: 4px;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 7px 22px rgba(109,93,193,0.35);
        }
        .auth-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .auth-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: #9090b0;
          animation: fadeUp 0.5s 0.2s ease both;
          opacity: 0;
        }
        .auth-footer a {
          color: #6d5dc1;
          font-weight: 600;
          text-decoration: none;
        }
        .auth-footer a:hover { text-decoration: underline; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="auth-root">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <span className="auth-brand-name">TaskManager</span>
        </Link>

        <div className="auth-card">
          <h1 className="auth-heading">Welcome back</h1>
          <p className="auth-subheading">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing in…" : (
                <>
                  Sign in
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="auth-footer">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </>
  );
}

export default Login;