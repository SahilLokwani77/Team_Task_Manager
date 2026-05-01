import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { token, apiBase, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${apiBase}/tasks`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, [apiBase, token]);

  const updateStatus = async (taskId, status) => {
    try {
      const res = await axios.put(`${apiBase}/tasks/${taskId}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(tasks.map(t => t.id === taskId ? res.data : t));
    } catch (e) {
      alert("Error updating status or not authorized");
    }
  };

  const todo = tasks.filter(t => t.status === 'todo');
  const inProgress = tasks.filter(t => t.status === 'in_progress');
  const done = tasks.filter(t => t.status === 'done');

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      <div className="grid-cards mb-4">
        <div className="glass-panel flex items-center justify-between">
          <div>
            <h3 className="text-muted">To Do</h3>
            <h2 style={{fontSize: '2rem'}}>{todo.length}</h2>
          </div>
          <AlertCircle size={32} className="text-muted" />
        </div>
        <div className="glass-panel flex items-center justify-between">
          <div>
            <h3 className="text-muted">In Progress</h3>
            <h2 style={{fontSize: '2rem'}}>{inProgress.length}</h2>
          </div>
          <Clock size={32} style={{color: '#7dd3fc'}} />
        </div>
        <div className="glass-panel flex items-center justify-between">
          <div>
            <h3 className="text-muted">Completed</h3>
            <h2 style={{fontSize: '2rem'}}>{done.length}</h2>
          </div>
          <CheckCircle size={32} style={{color: '#6ee7b7'}} />
        </div>
      </div>

      <h2 style={{marginTop: '2rem'}}>Your Tasks Overview</h2>
      <div className="glass-panel mt-4 flex-col gap-4" style={{display: 'flex'}}>
        {tasks.length === 0 ? <p className="text-muted">No tasks found.</p> : null}
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between" style={{padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem'}}>
            <div>
              <h4 style={{marginBottom: '0.5rem'}}>{task.title}</h4>
              <span className={`badge badge-${task.status}`}>{task.status.replace('_', ' ')}</span>
            </div>
            {(user?.role === 'admin' || user?.id === task.assignee_id) && (
              <select 
                className="input-field" 
                style={{width: 'auto', padding: '0.5rem'}}
                value={task.status}
                onChange={e => updateStatus(task.id, e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
