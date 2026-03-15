import { deleteTask, updateTask } from "../services/taskService";

function TaskCard({ task, fetchTasks }) {

  const handleDelete = async () => {
    await deleteTask(task._id);
    fetchTasks();
  };

  const toggleStatus = async () => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    await updateTask(task._id, { ...task, status: newStatus });
    fetchTasks();
  };

  const isCompleted = task.status === "completed";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .task-card {
          background: #fff;
          border: 1.5px solid #ebebf5;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          box-shadow: 0 2px 8px rgba(109,93,193,0.05);
          transition: box-shadow 0.18s, transform 0.18s, opacity 0.18s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          animation: fadeUp 0.3s ease both;
        }
        .task-card:hover {
          box-shadow: 0 4px 16px rgba(109,93,193,0.1);
          transform: translateY(-1px);
        }
        .task-card.completed { opacity: 0.55; }

        /* Checkbox */
        .task-check {
          flex-shrink: 0;
          margin-top: 2px;
          width: 20px; height: 20px;
          border-radius: 6px;
          border: 2px solid #d0d0e8;
          background: transparent;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          padding: 0;
          transition: border-color 0.18s, background 0.18s;
        }
        .task-check:hover { border-color: #6d5dc1; }
        .task-check.done {
          background: #6d5dc1;
          border-color: #6d5dc1;
        }

        .task-body { flex: 1; min-width: 0; }

        .task-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.18s;
        }
        .task-card.completed .task-title {
          text-decoration: line-through;
          color: #b0b0c8;
        }

        .task-desc {
          font-size: 12px;
          color: #9090b0;
          line-height: 1.6;
          margin: 0 0 10px;
        }
        .task-card.completed .task-desc { color: #c8c8dc; }

        .task-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
        }
        .task-badge.pending {
          background: rgba(246,173,85,0.12);
          color: #c47f1a;
        }
        .task-badge.completed {
          background: rgba(72,187,120,0.12);
          color: #276749;
        }
        .task-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Actions */
        .task-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-shrink: 0;
        }

        .task-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1.5px solid #ebebf5;
          border-radius: 7px;
          color: #9090b0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
        }
        .task-btn-toggle:hover {
          color: #6d5dc1;
          border-color: #c5bfdf;
          background: rgba(109,93,193,0.04);
        }
        .task-btn-delete:hover {
          color: #d94f4f;
          border-color: #f0d4d4;
          background: #fff8f8;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`task-card ${isCompleted ? "completed" : ""}`}>
        <button
          className={`task-check ${isCompleted ? "done" : ""}`}
          onClick={toggleStatus}
          title={isCompleted ? "Mark as pending" : "Mark as completed"}
        >
          {isCompleted && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
        </button>

        <div className="task-body">
          <p className="task-title">{task.title}</p>
          {task.description && <p className="task-desc">{task.description}</p>}
          <span className={`task-badge ${isCompleted ? "completed" : "pending"}`}>
            <span className="task-badge-dot" />
            {task.status}
          </span>
        </div>

        <div className="task-actions">
          <button className="task-btn task-btn-toggle" onClick={toggleStatus}>
            {isCompleted ? (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                </svg>
                Reopen
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Complete
              </>
            )}
          </button>
          <button className="task-btn task-btn-delete" onClick={handleDelete}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskCard;