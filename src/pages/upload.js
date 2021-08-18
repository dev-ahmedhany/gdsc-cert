import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {
  IconButton,
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  InputAdornment,
} from "@material-ui/core";

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
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Upload() {
  const [certCode, setCertCode] = useState("");
  const [error, setError] = useState("");

  const classes = useStyles();
  const handleChange = (event) => {
    const text = event.target.value.toUpperCase();
    setCertCode(text);
    setError(!/^[A-Z0-9]*$/.test(text));
  };
  const handleClick = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    setCertCode(text);
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      sx={{ height: "100vh" }}
      alignItems="center"
    >
      <Paper elevation={10}>
        <Box flexDirection="column" display="flex" alignItems="center" p={3}>
          <Typography variant="h5"> Upload new certificate</Typography>
          <Paper className={classes.textBox}>
            <TextField
              onChange={handleChange}
              value={certCode}
              className={classes.input}
              error={error}
              helperText={error && "only Letters and Numbers"}
              placeholder="certificate ID "
              inputProps={{
                "aria-label": "search google maps",
                maxlength: "6",
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
          <TextField variant="outlined" type="file" required />
        </Box>
        {/* TODO: Submit */}
        <Box pb={3} display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
