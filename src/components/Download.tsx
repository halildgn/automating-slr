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

function Download() {
  const library = useDownloadStore((state) => state.library)
 const setLibrary = useDownloadStore((state) => state.setLibrary)
  const query = useDownloadStore((state) => state.query)
 const setQuery = useDownloadStore((state) => state.setQuery)

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
            value={library}
             onChange={(e) => {
               setLibrary(((e as SelectChangeEvent).target.value as Library));
             }}
          >
            <MenuItem value={"wos"}>WOS</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
