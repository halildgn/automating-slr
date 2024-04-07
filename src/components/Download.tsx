import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Download() {
  const [library , setLibrary] = useState<null | 'WOS'>(null);
  const [query, setQuery] = useState<null | string>(null);

   async function downloadFilesForLibrary(){
    await axios.post("http://localhost:9998/download", {
      library: library,
      query: query
    });
    // if(status === 200){
    //   // show success alert
    // }else{
    //   // show network error
    // }
   }


  return (
    <div className="download-setters-container">
      <Box className="download-setters-items-container">
        <Box className="download-setters-individual-items-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Digital Library</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Field"
             onChange={(e) => {
               setLibrary((e as SelectChangeEvent).target.value);
             }}
          >
            <MenuItem value={"WOS"}>WOS</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="download-setters-individual-items-container">
  <FormControl>
        <TextField
          label="Query"
           onChange={(e) => {
               setQuery((e as SelectChangeEvent).target.value);
           }}
        />
      </FormControl>
      </Box>
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
      </Box>
  </div>
  );
}

export default Download;
