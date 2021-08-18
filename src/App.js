import React from "react";
import Upload from "./pages/upload";
import Admin from "./pages/admin";
import Cert from "./pages/cert";
import Login from "./pages/login";
import Validate from "./pages/Validate";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Admin} path="/admin" />
        <Route exact component={Cert} path="/cert" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Validate} path="/validate" />
        <Route exact component={Upload} path="/upload" />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
