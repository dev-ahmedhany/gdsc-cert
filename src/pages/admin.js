import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Paper, Box, Typography, Button } from "@material-ui/core";
import firebase from "firebase/app";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
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
  input: {
    marginBottom: theme.spacing(1),
    flex: 1,
    minWidth: "415px",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Admin({ user }) {
  const [value, loading] = useDocumentDataOnce(
    firebase.firestore().collection("users").doc(user.email)
  );
  const prefix = value?.cert;
  const [names, setNames] = useState("");
  const [result, setResult] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [university, setUniversity] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [leadUniversity, setLeadUniversity] = useState("");

  const classes = useStyles();

  const generateRandomID = (prefix) => {
    let text = prefix;
    const possible = "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 10; i++) {
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
      ) : prefix ? (
        <>
          <Paper style={{ margin: "50px" }} elevation={10}>
            <Box
              flexDirection="column"
              display="flex"
              alignItems="center"
              p={3}
            >
              <Typography variant="h5"> Create new certificates</Typography>
              { !result?
              <>
              <TextField
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
                value={university}
                className={classes.input}
                label="University"
                placeholder="Aswan University"
              />
              <TextField
                onChange={(e) => {
                  setSignature(e.target.value);
                }}
                value={signature}
                label="Signature"
                className={classes.input}
                placeholder="Ahmed Hany"
              />
              <TextField
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date}
                label="Date"
                className={classes.input}
                placeholder={new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
              <TextField
                onChange={(e) => {
                  setLeadUniversity(e.target.value);
                }}
                value={leadUniversity}
                className={classes.input}
                label="Position"
                placeholder="Google Developer Student Clubs Lead, Aswan University"
              />
              <TextField
                onChange={(e) => {
                  setNames(e.target.value);
                }}
                label="members names"
                value={names}
                multiline
                className={classes.input}
                placeholder={"Core Member1\r\nCore Member2\r\nCore Member3"}
              />
              <Button
                disabled={disabled}
                onClick={() => {
                  setDisabled(true);
                  const db = firebase.firestore();
                  names.split(/\r?\n/).forEach((name) => {
                    const id1 = generateRandomID(prefix);
                    let certRef = db
                      .collection("cert")
                      .doc(prefix)
                      .collection("core21")
                      .doc(id1);

                    db.runTransaction((transaction) => {
                      return transaction.get(certRef).then((cert) => {
                        if (cert.exists) {
                          throw new Error("Document does exist!");
                        }
                        transaction.set(certRef, {
                          name,
                          university,
                          signature,
                          date,
                          leadUniversity,
                        });
                        return { name, id1 };
                      });
                    })
                      .then(({ name, id1 }) => {
                        const finalResult = `${name}\r\nhttps://gdsc-cert.web.app/c/${id1}\r\n`;
                        setResult((r)=>r+finalResult);
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  });
                }}
                color="primary"
                variant="contained"
              >
                submit
              </Button>
              </>
              :
              <TextField
                label="Results"
                value={result}
                multiline
                className={classes.input}
              />}
            </Box>
          </Paper>
        </>
      ) : (
        <>
          <Typography>
            {`You Don't have admin rights, Contact with Ahmed Hany `}
            <br />
            {`Your Email : ${user.email}`}
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
