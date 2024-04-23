import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import axios from "axios";
import {useDownloadStore} from '../stores/download-store.ts';
import { Library } from "@/types/index.ts";
import SuccessAlert from "./SuccessAlert.tsx";
import ErrorAlert from "./ErrorAlert.tsx";
import LoadingIndicator from "./LoadingIndicator.tsx";

function Download() {
  const library = useDownloadStore((state) => state.library)
 const setLibrary = useDownloadStore((state) => state.setLibrary)
  const query = useDownloadStore((state) => state.query)
 const setQuery = useDownloadStore((state) => state.setQuery)
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [downloadedFileName, setDownloadedFileName] = useState<null | string>(null); 
const [errorPresent, setErrorPresent] = useState<boolean>(false);


   async function downloadFilesForLibrary(){
    setOverlayOpen(true);
    try{
 const {data} = await axios.post("http://localhost:9998/download", {
      library: library,
      query: query
    });
      setOverlayOpen(false);
      setDownloadedFileName(data.fileName);
     setDownloadSuccess(true); 
    }catch{
      setOverlayOpen(false);
      setErrorPresent(true);
  }   
   }

  function Library(){
    return (
      <Box className="download-setters-individual-items-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Digital Library</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Field"
            value={library}
             onChange={(e) => {
               setLibrary(((e as SelectChangeEvent).target.value as Library));
             }}
          >
            <MenuItem value={"wos"}>WOS</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

function Query(){
    return (
      <Box className="download-setters-individual-items-container">
  <FormControl>
        <TextField
          label="Query"
           value={query}
           onChange={(e) => {
               setQuery((e as SelectChangeEvent).target.value);
           }}
        />
      </FormControl>
      </Box>
    );
  }

  function DownloadButton(){
    return (
          <Box className="download-setters-individual-items-container">
    <Button
            variant="outlined"
     fullWidth={true}
            onClick={() => {
            downloadFilesForLibrary(); 
            }}
          >
            Download
          </Button>
        </Box>
    );
  }

  return (
    <>
      <LoadingIndicator loading={overlayOpen}/>
      <SuccessAlert displaySuccess={downloadSuccess} setDisplaySuccess={setDownloadSuccess} successMessage={`${downloadedFileName} was successfully saved to your Downloads directory`}/>
      <ErrorAlert displayError={errorPresent} setDisplayError={setErrorPresent} errorMessage={`Download was not successful. Please make sure that you have access to ${!!library ? library : 'the'} digital library and you have google chrome browser installed in your system`} />
    <div className="download-setters-container">
      <Box className="download-setters-items-container">
      <Library /> 
      {Query()}
      <DownloadButton /> 
      </Box>
  </div>
  </>
  );
}

export default Download;
