import React from 'react';
import './App.css';

function App() {
  const version = process.env.REACT_APP_VERSION || '0.1.0';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World from React!</h1>
        <p>Node.js Test Project</p>
        <p className="version">Version: {version}</p>
        <div className="links">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="App-link"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
