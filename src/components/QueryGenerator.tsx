import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../App.css";
import { useState } from 'react';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function QueryGenerator(){

 const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
 const [fieldsMap, setFieldsMap] = useState<Array<{label: string|null, keywords: string[] | null, logical_operator: string | null}>>([{label: null, keywords: null, logical_operator: null }]); 
  const [queries, setQueries] = useState({acm: null, ieee: null, wos: null, scopus: null });

async function generateQueries(){
    setOverlayOpen(true);
    const {data} =  await axios.post('http://localhost:9998/query', fieldsMap);
    setQueries(data);
    setOverlayOpen(false);
    }

  function changeFieldType (event: SelectChangeEvent, index: number) {
      const fields = [...fieldsMap];
    fields[index].label = event.target.value;
    setFieldsMap(fields);
  };

function changeRelationType(event: SelectChangeEvent, index: number){
     const fields = [...fieldsMap];
    fields[index].logical_operator = event.target.value;
    setFieldsMap(fields);
  } 

  function changeFieldKeywords(event: SelectChangeEvent, index: number){
    const keywords = event.target.value.split(',');
     const fields = [...fieldsMap];
    fields[index].keywords = keywords;
    setFieldsMap(fields);
  } 

  // function removeField(){

  // }

  function addField(){
    const fields = [...fieldsMap, {label: null, keywords: null, logical_operator: null }]
      setFieldsMap(fields);
  }

  function resetFields(){
    setFieldsMap([{label: null, keywords: null, logical_operator: null }]);
  }

  function Relation({isFirst, index}: {isFirst: boolean, index: number}){
    if(fieldsMap.length === 1 || isFirst){
        return null;
    }

  return (
 <Box className="field-container" sx={{ minWidth: 120 }}>
   <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Relation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Field"
            value={fieldsMap[index].logical_operator}
            onChange={(e)=>{changeRelationType((e as SelectChangeEvent),index)}}
        >
          <MenuItem value={'OR'}>OR</MenuItem>
          <MenuItem value={'AND'}>AND</MenuItem>
        </Select>
      </FormControl>
</Box>
    )
  }

  function Queries(){
    if(queries.acm && queries.wos && queries.ieee){
        return ( 
        <>
  <Box className="queries-container">
            <div style={{color:'#1976d2'}}>WOS Query:</div>
      <Paper onClick={() => {navigator.clipboard.writeText(queries.wos ?? '')}} elevation={3}>{queries.wos} 
              <Tooltip title="Copy">
              <FileCopyIcon style={{ color: 'gray' }} />
          </Tooltip>
              </Paper>
    </Box> 
  <Box className="queries-container"
    >
            <div style={{color:'#1976d2'}}>IEEE Query:</div>
      <Paper onClick={() => {navigator.clipboard.writeText(queries.ieee ?? '')}} elevation={3}> {queries.ieee}
                <Tooltip title="Copy">
              <FileCopyIcon style={{ color: 'gray' }} />
          </Tooltip>
            </Paper>
            
    </Box> 
  <Box className="queries-container">
            <div style={{color:'#1976d2'}}>ACM Query:</div>
      <Paper onClick={() => {navigator.clipboard.writeText(queries.acm ?? '')}} elevation={3}>{queries.acm}
                 <Tooltip title="Copy">
              <FileCopyIcon style={{ color: 'gray' }} />
          </Tooltip>
              </Paper>
    </Box>
  <Box className="queries-container">
            <div style={{color:'#1976d2'}}>Scopus Query:</div>
      <Paper onClick={() => {navigator.clipboard.writeText(queries.scopus ?? '')}} elevation={3}>{queries.scopus}
                 <Tooltip title="Copy">
              <FileCopyIcon style={{ color: 'gray' }} />
          </Tooltip>
              </Paper>
    </Box>
    </>
      )
    }
  }

return (
    <>
{
        fieldsMap.map((fieldEl, i) =>
        <>
 <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={overlayOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
<Relation isFirst={i=== 0} index={i}/>
         <Box className="field-container" sx={{ minWidth: 120 }}>
    <FormControl className="flex-item" fullWidth>
        <InputLabel id="demo-simple-select-label">Field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Field"
          value={fieldEl.label}
            onChange={(e)=>{changeFieldType((e as SelectChangeEvent),i)}}
        >
          <MenuItem value={'All field'}>All fields</MenuItem>
          <MenuItem value={'Title'}>Title</MenuItem>
          <MenuItem value={'Author'}>Author</MenuItem>
          <MenuItem value={'Abstract'}>Abstract</MenuItem>
          <MenuItem value={'Keyword'}>Keyword</MenuItem>
        </Select>
      </FormControl>
<FormControl className="flex-item">
   <TextField
          label="Keywords"
   value={fieldEl.keywords?.toString() ?? ''}
   onChange={(e)=>{changeFieldKeywords((e as SelectChangeEvent),i)}}
        />
 </FormControl>
    </Box>
</>
          )
          
    }
<Button className="field-container" variant="outlined" onClick={()=>{addField()}}>Add field</Button>
<Button className="field-container" variant="outlined" startIcon={<AutorenewIcon />} onClick={()=>{resetFields()}}>
  Reset
</Button>
      
<Button variant="outlined" onClick={()=>{generateQueries()}}>Generate queries</Button> 

<Queries />

       </>
)
}

export default QueryGenerator;
