import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Boards from "./pages/Boards";
import Kanban from "./pages/Kanban";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/boards/:projectId" element={<Boards />} />
        <Route path="/kanban/:boardId" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;