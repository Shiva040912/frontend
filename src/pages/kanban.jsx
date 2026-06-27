import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { getColumns } from "../service/column";
import { getTasks, createTask, updateTask, deleteTask } from "../service/task";

import { socket } from "../service/socket";

import "./kanban.css";

function Kanban() {
  const { boardId } = useParams();

  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedColumn, setSelectedColumn] = useState("");

  const loadData = async () => {
    try {
      const colRes = await getColumns(boardId);
      const taskRes = await getTasks(boardId);

      // 🚀 காலம்களை To Do -> In Progress -> Done என்ற வரிசையில் வரிசைப்படுத்துகிறோம் (Sorting)
      const orderedColumns = (colRes.data || []).sort((a, b) => {
        const order = ["to do", "in progress", "done"];
        return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase());
      });

      setColumns(orderedColumns);
      setTasks(taskRes.data);

      if (orderedColumns.length > 0) {
        setSelectedColumn(orderedColumns[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();

    if (boardId) {
      socket.emit("joinBoard", boardId);
    }
  }, [boardId]);

  useEffect(() => {
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
      );
    });

    socket.on("taskCreated", (newTask) => {
      console.log("TASK CREATED EVENT RECEIVED", newTask);
      setTasks((prev) => {
        const exists = prev.some((task) => task._id === newTask._id);
        if (exists) return prev;
        return [...prev, newTask];
      });
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("taskUpdated");
      socket.off("taskCreated");
      socket.off("taskDeleted");
    };
  }, []);

  const addTask = async () => {
    if (!title) {
      alert("Task title required");
      return;
    }

    if (columns.length === 0) {
      alert("No columns found");
      return;
    }

    try {
      const res = await createTask({
        title,
        description,
        board: boardId,
        column: selectedColumn,
      });

      setTasks([...tasks, res.data]);

      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (task) => {
    const newTitle = prompt("Enter Task Title", task.title);
    if (newTitle === null) return;

    const newDescription = prompt("Enter Description", task.description);
    if (newDescription === null) return;

    try {
      await updateTask(task._id, {
        title: newTitle,
        description: newDescription,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id
            ? {
                ...t,
                title: newTitle,
                description: newDescription,
              }
            : t,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newColumnId = result.destination.droppableId;

    try {
      await updateTask(taskId, {
        column: newColumnId,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                column: newColumnId,
              }
            : task,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="kanban-page">
      <h1>Tasks</h1>

      <div className="task-form">
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          {columns.map((column) => (
            <option key={column._id} value={column._id}>
              {column.name}
            </option>
          ))}
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-container">
          {columns.map((column) => (
            <Droppable key={column._id} droppableId={column._id}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>
                    {column.name} (
                    {tasks.filter((task) => task.column === column._id).length})
                  </h2>

                  {tasks
                    .filter((task) => task.column === column._id)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
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
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kanban;