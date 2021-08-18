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
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBZqkaBmfjETUStdKg10uIgv2ZGzygsBfo",
    authDomain: "gdsc-cert.firebaseapp.com",
    projectId: "gdsc-cert",
    storageBucket: "gdsc-cert.appspot.com",
    messagingSenderId: "320267466446",
    appId: "1:320267466446:web:d93aa68a990207677e029f",
    measurementId: "G-F8N65XRGYD",
  });
}

const auth = firebase.auth();
//const firestore = firebase.firestore();

export default function App() {
  const [user, loading] = useAuthState(auth);

  return loading ? (
    <></>
  ) : (
    <Router>
      <Switch>
        <Route exact component={Cert} path="/c/:id" />
        <Route exact path="/login" >
        <Login firebase={firebase} auth={auth}/>
        </Route>
        <Route exact component={Validate} path="/validate" />
        <Route exact component={user ? Admin : Login} path="/admin" />
        <Route exact component={user ? Upload : Login} path="/upload" />
        <Redirect to="/validate" />
      </Switch>
    </Router>
  );
}
