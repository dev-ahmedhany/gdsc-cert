import { React } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Particles from "react-particles-js";

export default function OutlinedCard() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{background:"radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))",height:"100vh"}}
    >
      <Particles params={{
	    "particles": {
	        "number": {
	            "value": 50
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}}/>
      <Paper elevation={3}>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          flexDirection="column"
        >
          <h1>Verify a certificate</h1>
          <TextField
            id="standard-basic"
            label="Entre Certificate ID"
            helperText="The Certificate ID can be found at the bottom of each certificate.."
          />

          <Box m={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary">
              Validate
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
