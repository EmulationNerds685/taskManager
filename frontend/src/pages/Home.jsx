import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .home-root {
          min-height: 100vh;
          background: #f7f7fb;
          display: flex;
          flex-direction: column;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .home-bg-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .home-bg-circle-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(109,93,193,0.08) 0%, transparent 70%);
          top: -160px; right: -120px;
        }
        .home-bg-circle-2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(109,93,193,0.05) 0%, transparent 70%);
          bottom: -100px; left: -80px;
        }

        .home-nav {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 40px;
        }
        .home-nav-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }
        .home-nav-icon {
          width: 30px; height: 30px;
          background: #6d5dc1;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .home-nav-name {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .home-hero {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 24px 80px;
        }

        .home-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(109,93,193,0.1);
          color: #6d5dc1;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease both;
        }
        .home-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6d5dc1;
        }

        .home-h1 {
          font-size: clamp(34px, 6vw, 56px);
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 18px;
          max-width: 580px;
          animation: fadeUp 0.5s 0.1s ease both;
          opacity: 0;
        }
        .home-h1 span { color: #6d5dc1; }

        .home-sub {
          font-size: 16px;
          color: #7a7a9d;
          line-height: 1.75;
          max-width: 400px;
          margin: 0 auto 40px;
          font-weight: 400;
          animation: fadeUp 0.5s 0.18s ease both;
          opacity: 0;
        }

        .home-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.5s 0.26s ease both;
          opacity: 0;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #6d5dc1;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 13px 26px;
          border-radius: 10px;
          border: none;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(109,93,193,0.28);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(109,93,193,0.36);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          background: #fff;
          color: #4a4a6e;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 13px 26px;
          border-radius: 10px;
          border: 1.5px solid #e4e4f0;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .btn-secondary:hover {
          transform: translateY(-2px);
          border-color: #b8b0dc;
          box-shadow: 0 4px 14px rgba(0,0,0,0.07);
        }

        .home-features {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 52px;
          animation: fadeUp 0.5s 0.38s ease both;
          opacity: 0;
        }
        .home-feature-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1.5px solid #ebebf5;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 12px;
          color: #6a6a90;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .home-footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #b8b8cc;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="home-root">
        <div className="home-bg-circle home-bg-circle-1" />
        <div className="home-bg-circle home-bg-circle-2" />

        <nav className="home-nav">
          <Link to="/" className="home-nav-brand">
            <div className="home-nav-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <span className="home-nav-name">TaskManager</span>
          </Link>
        </nav>

        <main className="home-hero">
          <div className="home-chip">
            <span className="home-chip-dot" />
            Simple task management
          </div>

          <h1 className="home-h1">
            Get things done,<br /><span>stay organised.</span>
          </h1>

          <p className="home-sub">
            A clean, focused space to manage your tasks and track progress — without the clutter.
          </p>

          <div className="home-actions">
            <Link to="/login" className="btn-primary">
              Sign in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/register" className="btn-secondary">
              Create an account
            </Link>
          </div>

          <div className="home-features">
            {[
              { label: "Track progress", path: "M9 11l3 3L22 4" },
              { label: "Stay focused",   path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" },
              { label: "Your workspace", path: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" },
            ].map(({ label, path }) => (
              <div className="home-feature-pill" key={label}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6d5dc1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
                {label}
              </div>
            ))}
          </div>
        </main>

        <footer className="home-footer">© {new Date().getFullYear()} TaskManager</footer>
      </div>
    </>
  );
}

export default Home;