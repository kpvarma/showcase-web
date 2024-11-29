import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => (
  <main className="main-content">
    <h1>Welcome to the App</h1>
    <p>This is the main content area.</p>

    <Link
      to="/PageOne"
      style={{
        color: '#00bcd4',
        textDecoration: 'none',
        fontWeight: 'bold',
      }}
    >
      Go to Page 1
    </Link>
    <br></br>
    <Link
      to="/BlogTemplate"
      style={{
        color: '#00bcd4',
        textDecoration: 'none',
        fontWeight: 'bold',
      }}
    >
      Blog Template
    </Link>
  </main>
);

export default Home;
