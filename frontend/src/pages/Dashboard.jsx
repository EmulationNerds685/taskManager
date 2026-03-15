import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { getTasks } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  const fetchTasks = async () => {
    try {
      const res = await getTasks({ page, limit, status, search });
      setTasks(res.data.tasks);
    } catch {
      console.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, search]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .dash-root {
          min-height: 100vh;
          background: #f7f7fb;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .dash-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 36px 24px 72px;
        }

        /* Page header */
        .dash-header {
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease both;
        }
        .dash-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 4px;
        }
        .dash-subtitle {
          font-size: 13px;
          color: #9090b0;
          font-weight: 400;
          margin: 0;
        }

        /* Controls */
        .dash-controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          animation: fadeUp 0.5s 0.08s ease both;
          opacity: 0;
        }

        .dash-search-wrap {
          position: relative;
          flex: 1;
          min-width: 180px;
        }
        .dash-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #b0b0c8;
          pointer-events: none;
        }
        .dash-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #e8e8f2;
          border-radius: 10px;
          color: #1a1a2e;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          padding: 10px 14px 10px 36px;
          outline: none;
          box-sizing: border-box;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .dash-input::placeholder { color: #c0c0d8; }
        .dash-input:focus {
          border-color: #6d5dc1;
          box-shadow: 0 0 0 3px rgba(109,93,193,0.1);
        }

        .dash-select {
          background: #fff;
          border: 1.5px solid #e8e8f2;
          border-radius: 10px;
          color: #5a5a7a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 36px 10px 14px;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a0a0c0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: border-color 0.18s;
        }
        .dash-select:focus { border-color: #6d5dc1; }

        /* Section label */
        .dash-section-label {
          font-size: 11px;
          font-weight: 600;
          color: #b0b0c8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dash-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #ebebf5;
        }

        /* Form section */
        .dash-form-section {
          margin-bottom: 32px;
          animation: fadeUp 0.5s 0.14s ease both;
          opacity: 0;
        }

        /* Task list */
        .dash-tasks-section {
          animation: fadeUp 0.5s 0.2s ease both;
          opacity: 0;
        }
        .dash-task-list { display: flex; flex-direction: column; gap: 10px; }

        .dash-empty {
          background: #fff;
          border: 1.5px dashed #e0e0ee;
          border-radius: 12px;
          padding: 48px 20px;
          text-align: center;
        }
        .dash-empty-icon {
          font-size: 32px;
          margin-bottom: 12px;
          opacity: 0.25;
        }
        .dash-empty-text {
          font-size: 13px;
          color: #b0b0c8;
          font-weight: 500;
        }

        /* Pagination */
        .dash-pagination {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          animation: fadeUp 0.5s 0.28s ease both;
          opacity: 0;
        }
        .dash-page-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1.5px solid #e4e4f0;
          border-radius: 9px;
          color: #6a6a90;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 9px 18px;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: color 0.18s, border-color 0.18s, transform 0.18s;
        }
        .dash-page-btn:hover:not(:disabled) {
          color: #6d5dc1;
          border-color: #c5bfdf;
          transform: translateY(-1px);
        }
        .dash-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .dash-page-indicator {
          flex: 1;
          text-align: center;
          font-size: 13px;
          color: #b0b0c8;
          font-weight: 500;
        }
        .dash-page-indicator span { color: #6d5dc1; font-weight: 600; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="dash-root">
        <Navbar />

        <div className="dash-body">
          <div className="dash-header">
            <h1 className="dash-title">My Tasks</h1>
            <p className="dash-subtitle">Manage and track everything in one place</p>
          </div>

          {/* Search + filter */}
          <div className="dash-controls">
            <div className="dash-search-wrap">
              <svg className="dash-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search tasks…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="dash-input"
              />
            </div>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="dash-select"
            >
              <option value="">All tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Add task */}
          <div className="dash-form-section">
            <p className="dash-section-label">New task</p>
            <TaskForm fetchTasks={fetchTasks} />
          </div>

          {/* Task list */}
          <div className="dash-tasks-section">
            <p className="dash-section-label">
              {tasks.length > 0 ? `${tasks.length} task${tasks.length !== 1 ? "s" : ""}` : "Tasks"}
            </p>

            {tasks.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-icon">📋</div>
                <p className="dash-empty-text">No tasks yet. Add one above!</p>
              </div>
            ) : (
              <div className="dash-task-list">
                {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="dash-pagination">
            <button
              className="dash-page-btn"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Prev
            </button>

            <span className="dash-page-indicator">Page <span>{page}</span></span>

            <button
              className="dash-page-btn"
              onClick={() => setPage((p) => p + 1)}
              disabled={tasks.length < limit}
            >
              Next
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;