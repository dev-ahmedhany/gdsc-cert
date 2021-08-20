import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "../components/admin";
import Login from "../components/login";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box } from "@material-ui/core";
import Particles from "react-particles-js";

const auth = firebase.auth();

export default function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <Router>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{
          background:
            "radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))",
          minHeight: "100vh",
        }}
      >
        <Particles
          params={{
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 3,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
        {loading ? (
          <></>
        ) : (
          <Switch>
            {/* Make Sur to add the Route at firebase.json */}
            <Route exact path={["/admin", "/preview"]}>
              {user?.email ? <Admin user={user} /> : <Login />}
            </Route>
          </Switch>
        )}
      </Box>
    </Router>
  );
}
