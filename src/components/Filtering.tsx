import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import { Button } from '@mui/material';
import { ChangeEvent } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs';

function Filtering(){

 const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
 const [includedPublicationTypes, setIncludedPublicationTypes] = useState<{[publicationTypes: string]: boolean}>({});
 const [dateAndPageRange, setDateAndPageRange] = useState<{display: boolean, pageStart: string|null, pageEnd: string|null, startYear: string|null, endYear: string|null }>({display: false, pageStart: null, pageEnd: null, startYear: null, endYear: null});

  async function handleFileUpload (e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files; 
const formData = new FormData();
    for(const file of files){
formData.append(file.name, file);
    }
setDateAndPageRange({display: false, pageStart: null , pageEnd: null, startYear: null, endYear: null});
    setOverlayOpen(true);
    const {data} : {data: string[]} =  await axios.post('http://localhost:9999/availablePublications', formData);
    const publicationTypes = data.reduce((accumulator, publicationType)=>{
       accumulator[publicationType] = true; 
      return accumulator;
    }, {} as {[pubType: string]: boolean})
    setIncludedPublicationTypes(publicationTypes);
setDateAndPageRange({display: true, pageStart: null , pageEnd: null, startYear: null, endYear: null});
    setOverlayOpen(false);
  };

  function setRange(field: 'pageStart' | 'pageEnd' | 'startYear' | 'endYear' ,value: Dayjs){
    const updatedRanges = Object.assign({},dateAndPageRange);
    updatedRanges[field] = value.year().toString();
    setDateAndPageRange(updatedRanges);
  }

  function selectDeSelectPublicationType (event: ChangeEvent<HTMLInputElement>, pubType: string){
   const updatedPublicationTypes = Object.assign({}, includedPublicationTypes) 
    updatedPublicationTypes[pubType] = event.target.checked;
    setIncludedPublicationTypes(updatedPublicationTypes);
  };

  function PublicationTypes(){
    if(Object.keys(includedPublicationTypes).length < 1){
      return;
    }
    return (
      <div className="field-container queries-container">
{
 Object.keys(includedPublicationTypes).map((pubType)=>
 <FormControlLabel
            control={
              <Checkbox checked={includedPublicationTypes[pubType]} 
                onChange={(e)=>{selectDeSelectPublicationType(e, pubType)}} 
                name="example" />
            }
            label={pubType}
          />
            )
          }
          </div>
    )
  }

  function PageNDate(){
  if(!dateAndPageRange.display){
     return;         
    }

    return (
      <>
<FormControl>
   <TextField
          label="Minimum number of pages"
value={dateAndPageRange.pageStart}
   onChange={(e)=>{setRange('pageStart',e.target.value)}}
        />
 </FormControl>
<FormControl>
   <TextField
          label="Maximum number of pages"
   value={dateAndPageRange.pageEnd}
  onChange={(e)=>{setRange('pageEnd',e.target.value)}}
        />
 </FormControl>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Start date" views={['year']}
   value={dayjs(dateAndPageRange.startYear)}
   onChange={(e)=>{setRange('startYear',e)}}
      />
    </LocalizationProvider>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="End date" views={['year']}
    value={dayjs(dateAndPageRange.endYear)}
   onChange={(e)=>{setRange('endYear',e)}}
      />

    </LocalizationProvider>
    </>
    )
  }

return (
<>
 <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={overlayOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
<input
  style={{ display: 'none' }}
  onChange={handleFileUpload}
  id="file-upload"
  accept=".bib , .csv"
  multiple
  type="file"
  />
<Button className="field-container" variant="outlined" onClick={()=>{ document.getElementById('file-upload')?.click() }}>Choose files to filter</Button>
<PublicationTypes />
<PageNDate />
</>
)
}

export default Filtering;
