import React from "react";
import { Box } from "@material-ui/core";
import GDSCCoreTeamCertification2021 from "../cert/GDSCCoreTeamCertification2021";

export default function Certe() {
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
      <GDSCCoreTeamCertification2021 />
    </Box>
  );
}
