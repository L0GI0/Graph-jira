import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Link } from "react-router-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Menu } from "semantic-ui-react";
import { Neo4jProvider, createDriver } from "use-neo4j";

// const driver = createDriver(
//   "bolt+s",
//   "db-lqonvrfh8qabyrqyoi90.graphenedb.com",
//   24786,
//   "neo4j",
//   "heap123"
// );

ReactDOM.render(
  <React.StrictMode>
    <Neo4jProvider>
      {/* <Neo4jProvider> */}
      <App />
    </Neo4jProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
