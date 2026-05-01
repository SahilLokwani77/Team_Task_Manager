import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus } from 'lucide-react';

const Projects = () => {
  const { token, apiBase, user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', project_id: '', assignee_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pRes = await axios.get(`${apiBase}/projects`, { headers: { Authorization: `Bearer ${token}` } });
      setProjects(pRes.data);
      const uRes = await axios.get(`${apiBase}/users`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(uRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBase}/projects`, newProject, { headers: { Authorization: `Bearer ${token}` } });
      setShowModal(false);
      setNewProject({ name: '', description: '' });
      fetchData();
    } catch (e) {
      alert("Error creating project. Admin only.");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBase}/tasks`, newTask, { headers: { Authorization: `Bearer ${token}` } });
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', project_id: '', assignee_id: '' });
      fetchData();
    } catch (e) {
      alert("Error creating task. Admin only.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1>Projects</h1>
        {user?.role === 'admin' && (
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={() => setShowTaskModal(true)}>
              <Plus size={16} style={{marginRight: '0.5rem'}} /> Add Task
            </button>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={16} style={{marginRight: '0.5rem'}} /> New Project
            </button>
          </div>
        )}
      </div>

      <div className="grid-cards">
        {projects.map(p => (
          <div key={p.id} className="glass-panel">
            <h3>{p.name}</h3>
            <p className="text-muted mt-4" style={{fontSize: '0.875rem', marginBottom: '1rem'}}>{p.description || "No description"}</p>
            <div className="flex justify-between items-center">
              <span className="text-muted" style={{fontSize: '0.75rem'}}>Created by {users.find(u => u.id === p.owner_id)?.name || p.owner_id}</span>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted">No projects found.</p>}
      </div>

      {showModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div className="glass-panel" style={{width: '100%', maxWidth: '400px'}}>
            <h2 className="mb-4">Create Project</h2>
            <form onSubmit={createProject} className="flex-col gap-4" style={{display: 'flex'}}>
              <input type="text" placeholder="Project Name" className="input-field" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
              <textarea placeholder="Description" className="input-field" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows={3} />
              <div className="flex gap-2 justify-between mt-4">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div className="glass-panel" style={{width: '100%', maxWidth: '400px'}}>
            <h2 className="mb-4">Assign Task</h2>
            <form onSubmit={createTask} className="flex-col gap-4" style={{display: 'flex'}}>
              <input type="text" placeholder="Task Title" className="input-field" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required />
              <select className="input-field" value={newTask.project_id} onChange={e => setNewTask({...newTask, project_id: e.target.value})} required>
                <option value="">Select Project...</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <select className="input-field" value={newTask.assignee_id} onChange={e => setNewTask({...newTask, assignee_id: e.target.value})}>
                <option value="">Assign to...</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
              </select>
              <div className="flex gap-2 justify-between mt-4">
                <button type="button" className="btn btn-outline" onClick={() => setShowTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
