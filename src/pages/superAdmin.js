import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Paper, Box, Typography, Button } from "@material-ui/core";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import Particles from "react-particles-js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F5F5F5",
  },
  textBox: {
    margin: "20px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 330,
  },
  input: {
    marginBottom: theme.spacing(1),
    flex: 1,
    minWidth: "415px",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function SuperAdmin({ user }) {
  const [value, loading] = useCollection(
    firebase.firestore().collection("users")
  );

  const [names, setNames] = useState("");

  const classes = useStyles();

  const generateRandomID = (prefix) => {
    let text = prefix;
    const possible = "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 2; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  return (
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
        <>Loading...</>
      ) : value ? (
        <>
          <Paper style={{ margin: "50px" }} elevation={10}>
            <Box
              flexDirection="column"
              display="flex"
              alignItems="center"
              p={3}
            >
              <Typography variant="h5"> Users</Typography>
              <span>
                {value.docs.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Typography>{doc.id}</Typography>
                      <Typography>{doc.data().cert}</Typography>
                    </Box>
                  </React.Fragment>
                ))}
              </span>
            </Box>
          </Paper>
        </>
      ) : (
        <>
          <Typography style={{ color: "white" }}>
            {`You Don't have Ahmed's rights`}
            <br />
            {`Contact Ahmed Hany, Your Email : `}
            <br />
            {`${user.email}`}
          </Typography>
          <Button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Log out
          </Button>
        </>
      )}
    </Box>
  );
}
