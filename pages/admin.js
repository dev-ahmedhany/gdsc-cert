import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/Admin">Admin</Link>
          </li>
          <li>
            <Link to="/preview">preview</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/admin">
            <h2>Admin</h2>
          </Route>
          <Route path="/preview">
            <h2>preview</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
