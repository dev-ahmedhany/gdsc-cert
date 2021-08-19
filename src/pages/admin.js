import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Paper, Box, Typography, Button } from "@material-ui/core";
import firebase from "firebase/app";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

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
    minWidth: "300px",
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
  const [name, setName] = useState("Firstname Lastname");
  const [university, setUniversity] = useState("[university]");
  const [signature, setSignature] = useState("Signature Here");
  const [date, setDate] = useState("July 23, 2021");
  const [leadUniversity, setLeadUniversity] = useState(
    "[GDSC Lead Name, University Name]"
  );

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
        backgroundColor: "#9e9e9e",
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=")`,
      }}
    >
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
              <Typography variant="h5"> Create new certificate</Typography>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className={classes.input}
                placeholder="name"
              />
              <TextField
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
                value={university}
                className={classes.input}
                placeholder="university"
              />
              <TextField
                onChange={(e) => {
                  setSignature(e.target.value);
                }}
                value={signature}
                className={classes.input}
                placeholder="signature"
              />
              <TextField
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date}
                className={classes.input}
                placeholder="date"
              />
              <TextField
                onChange={(e) => {
                  setLeadUniversity(e.target.value);
                }}
                value={leadUniversity}
                className={classes.input}
                placeholder="leadUniversity"
              />
              <Button
                onClick={() => {
                  const db = firebase.firestore();
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
                      return id1;
                    });
                  })
                    .then((newPopulation) => {
                      console.log("Document successfully written!");
                    })
                    .catch((err) => {
                      // This will be an "population is too big" error.
                      console.error(err);
                    });
                }}
                color="primary"
                variant="contained"
              >
                submit
              </Button>
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
