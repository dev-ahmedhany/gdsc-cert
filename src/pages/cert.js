import React from "react";
import { Box } from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "../cert/GDSCCoreTeamCertification2021";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

export default function Cert({ match }) {
  const id = match.params.id;
  const [value, loading] = useDocumentDataOnce(
    firebase
      .firestore()
      .collection("cert")
      .doc(id.substring(0, 2))
      .collection("core21")
      .doc(id)
  );
  console.log(value);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        backgroundColor: "#9e9e9e",
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=")`,
      }}
    >
      {loading ? (
        <>Loading...</>
      ) : value ? (
        <GDSCCoreTeamCertification2021
          id={id}
          name={value.name}
          university={value.university}
          signature={value.signature}
          date={value.date}
          leadUniversity={value.leadUniversity}
        />
      ) : (
        <Redirect to={{ pathname: "/validate", state: { id: id } }} />
      )}
    </Box>
  );
}
