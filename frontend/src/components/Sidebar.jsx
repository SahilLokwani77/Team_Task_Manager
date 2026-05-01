import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <div className="mb-4">
        <h2>TaskMaster</h2>
        <p className="text-muted" style={{fontSize: '0.875rem'}}>Welcome, {user?.name}</p>
        <span className="badge badge-todo" style={{marginTop: '0.5rem', display: 'inline-block'}}>{user?.role}</span>
      </div>
      
      <nav className="flex-col gap-2" style={{ flex: 1, display: 'flex' }}>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <FolderKanban size={20} />
          Projects
        </NavLink>
      </nav>

      <button onClick={logout} className="btn btn-outline" style={{width: '100%', justifyContent: 'flex-start', gap: '0.75rem', padding: '0.75rem 1rem'}}>
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
