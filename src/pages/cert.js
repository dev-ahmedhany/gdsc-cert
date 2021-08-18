import React, { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker } from "@react-pdf-viewer/core";
import TextField from "@material-ui/core/TextField";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Box } from "@material-ui/core";

export default function Certe() {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <Box bgcolor="#ca6060">
      <div>
        <br></br>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="#ca6060"
        >
          <form onSubmit={handlePdfFileSubmit}>
            <TextField
              variant="outlined"
              type="file"
              required
              onChange={handlePdfFileChange}
            />
            {pdfFileError && <div>{pdfFileError}</div>}
            <br></br>
            <button type="submit">UPLOAD</button>
          </form>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="#ca6060"
        >
          <br></br>
          <h4>View PDF</h4>
        </Box>
        <Box>
          <div>
            {/* show pdf conditionally (if we have one)  */}
            {viewPdf && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={viewPdf}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}

            {/* if we dont have pdf or viewPdf state is null */}
            {!viewPdf && <>No pdf file selected</>}
          </div>
        </Box>
      </div>
    </Box>
  );
}
