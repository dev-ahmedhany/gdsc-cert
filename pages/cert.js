import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "../components/cert/GDSCCoreTeamCertification2021";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import firebase from "firebase";
const saveSvgAsPng = require("save-svg-as-png");
import Head from "next/head";

export default function Cert() {
  const id = window.location.pathname.split("/").pop();
  const [value, loading] = useDocumentDataOnce(
    firebase
      .firestore()
      .collection("cert")
      .doc(id.substring(0, 2))
      .collection("core21")
      .doc(id)
  );

  const [width] = useState(window.innerWidth * 0.9);

  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3}
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#9e9e9e",
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=")`,
      }}
    >
      {loading ? (
        <>Loading...</>
      ) : value ? (
        <>
          <GDSCCoreTeamCertification2021
            id={id}
            name={value.name}
            university={value.university}
            signature={value.signature}
            date={value.date}
            leadUniversity={value.leadUniversity}
            style={{ width }}
          />
          <Box m={5}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                saveSvgAsPng.saveSvgAsPng(
                  document.getElementById("certificate"),
                  "certificate.png",
                  {
                    scale: 2,
                    encoderOptions: 1,
                    backgroundColor: "white",
                  }
                );
              }}
            >
              Download
            </Button>
          </Box>
        </>
      ) : (
        <Head>
          <meta httpEquiv="refresh" content={`0; URL=/validate/${id}`} />
        </Head>
      )}
    </Box>
  );
}
