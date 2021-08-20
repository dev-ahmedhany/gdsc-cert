import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "../components/admin";
import Login from "../components/login";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const auth = firebase.auth();

export default function App() {
  const [user, loading] = useAuthState(auth);
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
        {/* Make Sur to add the Route at firebase.json */}
        {loading ? (
          <></>
        ) : (
          <Switch>
            <Route exact path={["/admin", "/preview"]}>
              {user?.email ? <Admin user={user} /> : <Login />}
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}
