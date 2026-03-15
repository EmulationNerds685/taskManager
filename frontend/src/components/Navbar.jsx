import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 32px;
          height: 62px;
          background: #fff;
          border-bottom: 1.5px solid #ebebf5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 1px 8px rgba(109,93,193,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }
        .navbar-brand-icon {
          width: 30px; height: 30px;
          background: #6d5dc1;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .navbar-brand-name {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .navbar-page-tag {
          font-size: 12px;
          font-weight: 500;
          color: #b0b0c8;
          background: #f4f4fa;
          padding: 5px 12px;
          border-radius: 999px;
        }

        .navbar-logout {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: 1.5px solid #e4e4f0;
          color: #7070a0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 9px;
          cursor: pointer;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
        }
        .navbar-logout:hover {
          color: #d94f4f;
          border-color: #f0d4d4;
          background: #fff8f8;
        }
      `}</style>

      <nav className="navbar">
        <Link to="/dashboard" className="navbar-brand">
          <div className="navbar-brand-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <span className="navbar-brand-name">TaskManager</span>
        </Link>

        <div className="navbar-right">
          <span className="navbar-page-tag">Dashboard</span>
          <button className="navbar-logout" onClick={handleLogout}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;