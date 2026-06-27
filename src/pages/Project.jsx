import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  inviteMember,
  getMembers,
} from "../service/project";

import { useNavigate } from "react-router-dom";
import "./auth.css";

function Project() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [members, setMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  
  
  const [isAdmin, setIsAdmin] = useState(false); 

  const navigate = useNavigate();

  
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data);
        
        
        if (res.data && res.data.length > 0) {
          const firstProjectId = res.data[0]._id;
          
          
          setSelectedProject(firstProjectId); 
          
          await checkAdminStatus(firstProjectId);
        }
      } catch (err) {
        console.log("Initialization failed:", err);
      }
    };

    initializeDashboard();
  }, []);

  
  const checkAdminStatus = async (projectId) => {
    try {
      const res = await getMembers(projectId);
      const currentEmail = localStorage.getItem("email");
      const membersList = res.data.members || [];
      
      const currentUser = membersList.find(
        (m) => m.userId?.email === currentEmail
      );
      
      setIsAdmin(currentUser?.role === "admin");
    } catch (err) {
      console.log("Admin check failed:", err);
    }
  };

  const addProject = async () => {
    if (!name || !description) {
      alert("Project Name and Description are required");
      return;
    }

    try {
      await createProject({ name, description });
      setName("");
      setDescription("");
      
      
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to create project");
    }
  };

  const handleUpdate = async (project) => {
    const newName = prompt("Enter Project Name", project.name);
    if (newName === null) return;

    const newDescription = prompt("Enter Description", project.description);
    if (newDescription === null) return;

    try {
      await updateProject(project._id, {
        name: newName,
        description: newDescription,
      });
      alert("Project Updated");
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const handleInvite = async () => {
    if (!selectedProject || !inviteEmail) {
      alert("select project and enter email");
      return;
    }

    try {
      await inviteMember(selectedProject, {
        email: inviteEmail,
        role: "member",
      });
      alert("Member Invited");
      setInviteEmail("");
    } catch (err) {
      console.log(err);
      alert("Invite Failed");
    }
  };

  
  const loadMembers = async (projectId) => {
    try {
      const res = await getMembers(projectId);
      setMembers(res.data.members || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load members");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Project Management Dashboard</h1>
      <p className="sub-title">Total Projects : {projects.length}</p>

      
      <div className="form-container-grid">
        
        {isAdmin && (
          <div className="form-section-box">
            <h3>Invite Member</h3>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="email"
              placeholder="Member Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />

            <button className="invite-btn" onClick={handleInvite}>Invite Member</button>
          </div>
        )}

        <div className="form-section-box">
          <h3>Create New Project</h3>
          <input
            value={name}
            placeholder="Project Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="create-btn" onClick={addProject}>Add Project</button>
        </div>
      </div>

      <h2 className="section-heading">Your Projects</h2>

      
      <div className="projects-grid">
        {projects.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            <div className="card-buttons">
              <button onClick={() => loadMembers(p._id)}>View Members</button>

              <button
                className="open-btn"
                onClick={() => navigate(`/boards/${p._id}`)}
              >
                Open Boards
              </button>

              <button className="update-project" onClick={() => handleUpdate(p)}>
                Update
              </button>

              <button className="delete-btn" onClick={() => handleDelete(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="members-wide-card">
        <h3>Project Members</h3>

        {members.length === 0 ? (
          <p className="no-members-text">No Members Loaded (Click 'View Members' to see)</p>
        ) : (
          <div className="members-list-row">
            {members.map((m) => (
              <div className="member-item" key={m._id}>
                <p><strong>Name:</strong> {m.userId?.name}</p>
                <p><strong>Email:</strong> {m.userId?.email}</p>
                <p><strong>Role:</strong> <span className="role-tag">{m.role}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;