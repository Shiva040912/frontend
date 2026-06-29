import React from "react";

function TaskCard({ task, editTask, removeTask }) {
  console.log("TaskCard rendered:", task.title);
  return (
    <div className="task-card"> 
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <div className="task-actions">
        <button
          className="update-task"
          onClick={() => editTask(task)}
        >
          Update
        </button>

        <button
          className="delete-task"
          onClick={() => removeTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(TaskCard);