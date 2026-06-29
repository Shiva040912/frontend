import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Boards from "./pages/Boards";
import Kanban from "./pages/kanban";
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/boards/:projectId" element={<Boards />} />
          <Route path="/kanban/:boardId" element={<Kanban />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
