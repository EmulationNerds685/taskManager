import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ fetchTasks }) {
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Please enter a task title."); return; }
    setLoading(true);
    try {
      await createTask(form);
      setForm({ title: "", description: "", status: "pending" });
      fetchTasks();
    } catch {
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .task-form {
          background: #fff;
          border: 1.5px solid #ebebf5;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(109,93,193,0.05);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .task-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 520px) {
          .task-form-row { grid-template-columns: 1fr; }
        }
        .task-form-full { grid-column: 1 / -1; }

        .task-form-field { display: flex; flex-direction: column; gap: 6px; }
        .task-form-label {
          font-size: 12px;
          font-weight: 600;
          color: #5a5a7a;
        }

        .task-form-input,
        .task-form-textarea,
        .task-form-select {
          background: #fafafa;
          border: 1.5px solid #e8e8f2;
          border-radius: 9px;
          color: #1a1a2e;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          padding: 10px 12px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .task-form-input::placeholder,
        .task-form-textarea::placeholder { color: #c0c0d8; }
        .task-form-input:focus,
        .task-form-textarea:focus,
        .task-form-select:focus {
          border-color: #6d5dc1;
          box-shadow: 0 0 0 3px rgba(109,93,193,0.1);
          background: #fff;
        }

        .task-form-textarea {
          resize: vertical;
          min-height: 68px;
        }

        .task-form-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a0a0c0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          cursor: pointer;
          color: #5a5a7a;
        }

        .task-form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          gap: 10px;
        }
        .task-form-error {
          font-size: 12px;
          color: #d94f4f;
          font-weight: 500;
        }

        .task-form-submit {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #6d5dc1;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(109,93,193,0.25);
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          flex-shrink: 0;
        }
        .task-form-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(109,93,193,0.32);
        }
        .task-form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="task-form-row">
          <div className="task-form-field task-form-full">
            <label className="task-form-label" htmlFor="tf-title">Title</label>
            <input
              id="tf-title"
              name="title"
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={handleChange}
              className="task-form-input"
            />
          </div>

          <div className="task-form-field task-form-full">
            <label className="task-form-label" htmlFor="tf-desc">Description <span style={{color:'#c0c0d8',fontWeight:400}}>(optional)</span></label>
            <textarea
              id="tf-desc"
              name="description"
              placeholder="Add more details…"
              value={form.description}
              onChange={handleChange}
              className="task-form-textarea"
            />
          </div>

          <div className="task-form-field">
            <label className="task-form-label" htmlFor="tf-status">Status</label>
            <select
              id="tf-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="task-form-select"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="task-form-footer">
          <span className="task-form-error">{error}</span>
          <button type="submit" className="task-form-submit" disabled={loading}>
            {loading ? "Adding…" : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Add task
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;