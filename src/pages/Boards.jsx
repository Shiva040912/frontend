import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "../service/board";

import "./auth.css";

function Boards() {
  const { projectId } = useParams();

  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const loadBoards = async () => {
    try {
      const res = await getBoards(projectId);
      setBoards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const addBoard = async () => {
    if (!title) {
      alert("Board Title is required");
      return;
    }

    try {
      await createBoard({
        title,
        project: projectId,
      });

      setTitle("");
      loadBoards();
    } catch (err) {
      console.log(err);
      alert("Failed to create board");
    }
  };

  const handleUpdate = async (board) => {
    const newTitle = prompt("Enter Board Title", board.title);

    if (newTitle === null) return;

    try {
      await updateBoard(board._id, {
        title: newTitle,
      });

      alert("Board Updated");
      loadBoards();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this board?")) return;

    try {
      await deleteBoard(id);
      loadBoards();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Project Boards</h1>

      <p className="sub-title">Total Boards : {boards.length}</p>

     
      <div className="inline-form-container">
        <input
          value={title}
          placeholder="Board Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="create-board-btn" onClick={addBoard}>
          Add Board
        </button>
      </div>

      
      <div className="projects-grid">
        {boards.map((b) => (
          <div className="card" key={b._id}>
            <h3>{b.title}</h3>

            <div className="card-buttons">
              <button
                className="open-btn"
                onClick={() => navigate(`/kanban/${b._id}`)}
              >
                Open Tasks
              </button>

              <button className="update-board" onClick={() => handleUpdate(b)}>
                Update
              </button>

              <button className="delete-btn" onClick={() => handleDelete(b._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;