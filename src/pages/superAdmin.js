import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import Particles from "react-particles-js";

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
  input: {},
  iconButton: {
    padding: 10,
  },
}));

export default function SuperAdmin({ user }) {
  const [value, loading] = useCollection(
    firebase.firestore().collection("users")
  );

  const [disabled, setDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [needAccess, loadingNeedAccess] = useCollection(
    firebase.firestore().collection("needAccess")
  );

  const [id, setID] = useState("");

  const classes = useStyles();

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
            {loadingNeedAccess ? (
              <>Loading...</>
            ) : (
              <span>
                <List component="nav" aria-label="main mailbox folders">
                  {needAccess.docs.map((doc, indx) => (
                    <React.Fragment key={doc.id}>
                      <ListItem
                        button
                        selected={selectedIndex === indx}
                        onClick={(event) => handleListItemClick(event, indx)}
                      >
                        <Box
                          display="flex"
                          width="100%"
                          justifyContent="space-between"
                        >
                          <Typography>{doc.id}</Typography>
                        </Box>
                      </ListItem>

                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
                <TextField
                  onChange={(e) => setID(e.target.value)}
                  value={id}
                  className={classes.input}
                  label="new id"
                  placeholder="AA"
                />
                <Button
                  disabled={disabled}
                  onClick={() => {
                    setDisabled(true);
                    const db = firebase.firestore();
                    // Get a new write batch
                    var batch = db.batch();
                    let certRef = db
                      .collection("users")
                      .doc(needAccess.docs[selectedIndex].id);
                    batch.set(certRef, { cert: id });

                    let deletetRef = db
                      .collection("needAccess")
                      .doc(needAccess.docs[selectedIndex].id);
                    batch.delete(deletetRef);

                    // Commit the batch
                    batch.commit().then(() => {
                      setDisabled(false);
                      setID("");
                    });
                  }}
                  color="primary"
                  variant="contained"
                >
                  submit
                </Button>
              </span>
            )}
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
