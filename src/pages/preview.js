import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {
  IconButton,
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  Button,
} from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "../cert/GDSCCoreTeamCertification2021";
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
    marginLeft: theme.spacing(1),
    flex: 1,
    minWidth: "300px",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Preview({ location }) {
  const [certCode, setCertCode] = useState("B15AC268EE25");
  const [name, setName] = useState(
    location?.state?.name || "Firstname Lastname"
  );
  const [university, setUniversity] = useState(
    location?.state?.university || "[university]"
  );
  const [signature, setSignature] = useState(
    location?.state?.signature || "Signature Here"
  );
  const [date, setDate] = useState(location?.state?.date || "July 23, 2021");
  const [leadUniversity, setLeadUniversity] = useState(
    location?.state?.leadUniversity || "[GDSC Lead Name, University Name]"
  );
  const [error, setError] = useState("");

  const classes = useStyles();
  const handleChange = (event) => {
    const text = event.target.value.toUpperCase();
    setCertCode(text);
    setError(!/^[A-Z0-9]*$/.test(text));
  };
  const handleClick = () => {
    let text = "";
    const possible = "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    setCertCode(text);
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
      <Paper style={{ margin: "50px" }} elevation={10}>
        <Box flexDirection="column" display="flex" alignItems="center" p={3}>
          <Typography variant="h5"> Preview new certificate</Typography>
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
          <Paper className={classes.textBox}>
            <TextField
              onChange={handleChange}
              value={certCode}
              className={classes.input}
              error={error}
              helperText={error && "only Letters and Numbers"}
              placeholder="certificate ID "
              inputProps={{
                maxLength: "12",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleClick} color="primary">
                      <AutorenewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
          <Link
            to={{
              pathname: "/admin",
            }}
          >
            <Button color="primary" variant="contained">
              Create
            </Button>
          </Link>
        </Box>
      </Paper>
      <GDSCCoreTeamCertification2021
        id={certCode}
        name={name}
        university={university}
        signature={signature}
        date={date}
        leadUniversity={leadUniversity}
      />
    </Box>
  );
}
