import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";


function Download() {

  // async function downloadFilesForLibrary(){

  // }


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
            // value={fieldMaps[index].logical_operator}
            // onChange={(e) => {
            //   changeRelationType(e as SelectChangeEvent);
            // }}
          >
            <MenuItem value={"OR"}>OR</MenuItem>
            <MenuItem value={"AND"}>AND</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="download-setters-individual-items-container">
  <FormControl>
        <TextField
          label="Query"
          // onChange={(e) => {
          //   changeFieldKeywords(e as SelectChangeEvent, i);
          // }}
        />
      </FormControl>
      </Box>
              <Box className="download-setters-individual-items-container">
    <Button
            variant="outlined"
     fullWidth={true}
            onClick={() => {
              document.getElementById("file-upload")?.click();
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
