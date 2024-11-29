import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../stylesheets/sidebar.css'; 

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav>
        <ul className="sidebar-menu">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/help' ? 'active' : ''}>
            <Link to="/help">Help</Link>
          </li>
          <li className={location.pathname === '/WhatsAppChatAnalysier' ? 'active' : ''}>
            <Link to="/WhatsAppChatAnalysier">WhatsApp Chat Analysier</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;