import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("https://earthdash.herokuapp.com").then((response) =>
      setStatus(response.statusText)
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Data
        </a>
        <h2>{status.length ? `API status: ${status}` : "Pinging API"}</h2>
      </header>
    </div>
  );
};

export default App;
