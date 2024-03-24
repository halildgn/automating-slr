import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { Button } from '@mui/material';
import { ChangeEvent } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs';

function Filtering(){

  const [isUploadSuccess, setIsUploadSuccess] = useState<null | boolean>(null);
  const [uploadOrReset, setUploadOrReset] = useState<string>('upload');
  const [isFilteringSuccess, setIsFilteringSuccess] = useState<null | boolean>(null);
  const [displayFilterButton, setDisplayFilterButton] = useState(false);
  const [displayFields, setDisplayFields] = useState(false);
 const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
 const [includedPublicationTypes, setIncludedPublicationTypes] = useState<{[publicationTypes: string]: boolean}>({});
 const [dateAndPageRange, setDateAndPageRange] = useState<{minPages: string|null, maxPages: string|null, startYear: string|null, endYear: string|null }>({minPages: null, maxPages: null, startYear: null, endYear: null});

  function getIncludedPublicationTypes(): string[]{
    return Object.keys(includedPublicationTypes).reduce((publicationTypesToInclude, publicationType)=>{
          if(includedPublicationTypes[publicationType]){
          publicationTypesToInclude.push(publicationType);
      }
      return publicationTypesToInclude;
    }, [] as string[])
  }

  function FilterButton(){
    if(!displayFilterButton){
        return;
    }
    return (
<Button variant="outlined" onClick={filter}>Filter</Button> 
    )
  }

  async function handleFileUpload (e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files; 
const formData = new FormData();
    for(const file of files){
formData.append(file.name, file);
    }
    setIsUploadSuccess(null);
    setDisplayFields(false);
setDisplayFilterButton(false);
    setOverlayOpen(true);
    const response =  await axios.post('http://localhost:9998/availablePublications', formData)

    if(response.status === 200){
      const data: string[] = response.data;
   const publicationTypes = data.reduce((accumulator, publicationType)=>{
       accumulator[publicationType] = true; 
      return accumulator;
    }, {} as {[pubType: string]: boolean})
    setIncludedPublicationTypes(publicationTypes);
setDateAndPageRange({minPages: null , maxPages: null, startYear: null, endYear: null});
    setDisplayFields(true);
setDisplayFilterButton(true);
    setOverlayOpen(false);
    setIsUploadSuccess(true)
    setUploadOrReset('reset');
    }else{
      setUploadOrReset('upload');
   setOverlayOpen(false);
   setIsUploadSuccess(false);
    } 
  };

function resetFilteringAndFileUpload(){

  }

  async function filter(){
    const includedPubTypes = getIncludedPublicationTypes();
    const {status}  =  await axios.post('http://localhost:9998/filter', {publicationTypes: includedPubTypes, ...dateAndPageRange});
    if(status === 200){
      setIsFilteringSuccess(true);
    }else{
     setIsFilteringSuccess(false); 
    }
  }

  function setRange(field: 'minPages' | 'maxPages' | 'startYear' | 'endYear' ,value: string | Dayjs){
    const updatedRanges = Object.assign({},dateAndPageRange);
    updatedRanges[field] = (value as Dayjs).year ? (value as Dayjs).year().toString() : value as string; 
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
  if(!displayFields){
     return;         
    }

    return (
      <>
<FormControl>
   <TextField
          label="Minimum number of pages"
value={dateAndPageRange.minPages}
   onChange={(e)=>{setRange('minPages',e.target.value as unknown as Dayjs)}}
        />
 </FormControl>
<FormControl>
   <TextField
          label="Maximum number of pages"
   value={dateAndPageRange.maxPages}
  onChange={(e)=>{setRange('maxPages',e.target.value  as unknown as Dayjs)}}
        />
 </FormControl>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Start date" views={['year']}
   value={dateAndPageRange.startYear ? dayjs(dateAndPageRange.startYear) : null}
   onChange={(e)=>{setRange('startYear',e  as unknown as Dayjs)}}
      />
    </LocalizationProvider>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="End date" views={['year']}
    value={dateAndPageRange.endYear ? dayjs(dateAndPageRange.endYear) : null}
   onChange={(e)=>{setRange('endYear',e  as unknown as Dayjs)}}
      />
    </LocalizationProvider>
    </>
    )
  }

  function UploadSuccessFailIndicator(){
    if(isUploadSuccess === null){
        return;
    }
    if(isUploadSuccess){
      return(
   <Backdrop
   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUploadSuccess}
      onClick={()=>setIsUploadSuccess(null)}
       in={isUploadSuccess} //Write the needed condition here to make it appear
       timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
       addEndListener={() => {
         setTimeout(() => {
           setIsUploadSuccess(null);
         }, 2000);
       }}
       >

      <Alert severity="success"> Upload was sucessful, please fill the filter conditions</Alert>

    </Backdrop>
      )
    }
    return (
   <Backdrop
   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isUploadSuccess}
   onClick={()=>setIsUploadSuccess(null)}
       in={!isUploadSuccess} //Write the needed condition here to make it appear
       timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
       addEndListener={() => {
         setTimeout(() => {
           setIsUploadSuccess(null);
         }, 2000);
       }}
       >
   <Alert severity="error">
        Upload was not succesful
      </Alert>
    </Backdrop>
    )
  }

  function FilterSuccessFailIndicator(){
  if(isFilteringSuccess === null){
        return;
    }
    if(isFilteringSuccess){
      return(
   <Backdrop
   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFilteringSuccess}
       in={isFilteringSuccess} //Write the needed condition here to make it appear
 onClick={()=>setIsFilteringSuccess(null)}
       timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
       addEndListener={() => {
         setTimeout(() => {
           setIsFilteringSuccess(null);
         }, 3000);
       }}
       >

      <Alert severity="success">Csv file that consists of filtered entries is saved to Downloads directory</Alert>

    </Backdrop>
      )
    }
    return (
   <Backdrop
   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isFilteringSuccess}
 onClick={()=>setIsFilteringSuccess(null)}
       in={!isFilteringSuccess} //Write the needed condition here to make it appear
       timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
       addEndListener={() => {
         setTimeout(() => {
           setIsUploadSuccess(null);
         }, 2000);
       }}
       >
   <Alert severity="error">
        Filtering was not sucessful
      </Alert>
    </Backdrop>
    )
  }

function FileUpload(){
    if(uploadOrReset === 'upload'){
    return (
      <>
<input
  style={{ display: 'none' }}
  onChange={handleFileUpload}
  id="file-upload"
  accept=".bib, text/x-bibtex"
  multiple
  type="file"
  />
<Button className="field-container" variant="outlined" onClick={()=>{ document.getElementById('file-upload')?.click() }}>Choose files to filter</Button>
</>
    )
    }
return (
<Button className="field-container" variant="outlined" onClick={resetFilteringAndFileUpload}>Reset</Button>
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
      <UploadSuccessFailIndicator />
      <FilterSuccessFailIndicator />
<FileUpload/>
<PublicationTypes />
<PageNDate />
<FilterButton /> 
</>
)
}

export default Filtering;
