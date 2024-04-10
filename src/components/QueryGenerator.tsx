import { Field, LibraryQuery,Library, Build  } from "../types/index";
import {nanoid} from 'nanoid';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState,forwardRef, ReactElement, Ref, Fragment, FormEvent } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Tooltip from "@mui/material/Tooltip";
import ErrorAlert from "./ErrorAlert";
import { useFieldsStore } from "../stores/query-generation-store";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { libraryInfo } from "../constant";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useBuildsStore } from "../stores/build-store";
import LoadingIndicator from "./LoadingIndicator";


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function QueryGenerator() {
  const saveBuild = useBuildsStore((state)=>state.saveBuild)
  const fields = useFieldsStore((state) => state.fields)
 const setFields = useFieldsStore((state) => state.setFields)

  const [loadingOverlayOpen, setLoadingOverlayOpen] = useState<boolean>(false);
  const [queriesOverlayOpen, setQueriesOverlayOpen] = useState<boolean>(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
  const [errorPresent, setErrorPresent] = useState<boolean>(false);

  const [queries, setQueries] = useState<LibraryQuery>({
    acm: null,
    ieee: null,
    wos: null,
    scopus: null,
    ebsco: null,
  });

  async function generateQueries() {
    try{
  setLoadingOverlayOpen(true);
  const { data } = await axios.post("http://localhost:9998/query", fields)
    setQueries(data);
  setLoadingOverlayOpen(false);
    setQueriesOverlayOpen(true);
    }catch{
  setLoadingOverlayOpen(false);
      setErrorPresent(true);
    }
  }

  function changeFieldType(event: SelectChangeEvent, index: number) {
    const updatedFields = [...fields];
    updatedFields[index].label = event.target.value;
    setFields(updatedFields);
  }

  function changeRelationType(event: SelectChangeEvent, index: number) {
    const updatedFields = [...fields];
    updatedFields[index].logical_operator = event.target.value;
    setFields(updatedFields);
  }

  function changeFieldKeywords(event: SelectChangeEvent, index: number) {
    const keywords = event.target.value.split(",");
    const updatedFields = [...fields];
    updatedFields[index].keywords = keywords;
    setFields(updatedFields);
  }

  function addField() {
    const updatedFields = [
      ...fields,
      { label: null, keywords: null, logical_operator: null },
    ];
    setFields(updatedFields);
  }

  function resetFields() {
    setFields([{ label: null, keywords: null, logical_operator: null }]);
  }

  function Relation({ isFirst, index }: { isFirst: boolean; index: number }) {
    if (fields.length === 1 || isFirst) {
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
            value={fields[index].logical_operator}
            onChange={(e) => {
              changeRelationType(e as SelectChangeEvent, index);
            }}
          >
            <MenuItem value={"OR"}>OR</MenuItem>
            <MenuItem value={"AND"}>AND</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

function saveQueryBuild(name:string){
    const build : Build = {
      id: nanoid(),
      name: name,
      fields: fields
    };
    saveBuild(build); 
}

function SaveDialog(){
return (
      <Dialog
        open={saveDialogOpen}
         PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
     const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const buildName = formJson.buildName;
            saveQueryBuild(buildName);
            setSaveDialogOpen(false);
          },
        }}
      >
        <DialogTitle>Save to my builds</DialogTitle>
        <DialogContent>
          <DialogContentText>
         The query structure is going to be saved to "my builds". It can be loaded from there in the future. 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="buildName"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setSaveDialogOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
);
  }

function Queries(){

    return (
<Fragment>
     <Button
        variant="outlined"
        onClick={() => {
          generateQueries();
        }}
      >
        Generate queries
      </Button>
      <Dialog
        fullScreen
        open={queriesOverlayOpen}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setQueriesOverlayOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Queries
            </Typography>
  <Tooltip title={`To copy a query please click on it`}>
                <HelpOutlineIcon/>
              </Tooltip>
            <Button autoFocus color="inherit" 
                  onClick={()=>{
                  setQueriesOverlayOpen(false);
                  setSaveDialogOpen(true);
                }}
              >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
     {Object.keys(queries).map((library: string,i: number) => (
        <>
          <ListItemButton onClick={()=>{navigator.clipboard.writeText(queries[(library as Library)] ?? "")}}>
            <ListItemText primary={queries[(library as Library)]} secondary={library} />
  <Tooltip title={libraryInfo[(library as Library)]}>
                <QuestionMarkIcon/>
              </Tooltip>
          </ListItemButton>
          <ListDivider isLast={i === Object.keys(queries).length-1} />
        </>
      ))}
        </List>
      </Dialog>
    </Fragment>

    );
  }

  function ListDivider({isLast} : {isLast: boolean}){
    if(isLast){
      return null;
    }

    return <Divider />
  }

  function FieldTypes(fieldEl: Field, i: number) {
    return (
      <FormControl className={ i=== 0 ? "generator-view-field-item-first" : "generator-view-field-item"} fullWidth>
        <InputLabel id="demo-simple-select-label">Field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Field"
          value={fieldEl.label}
          onChange={(e) => {
            changeFieldType(e as SelectChangeEvent, i);
          }}
        >
          <MenuItem value={"All field"}>All fields</MenuItem>
          <MenuItem value={"Title"}>Title</MenuItem>
          <MenuItem value={"Author"}>Author</MenuItem>
          <MenuItem value={"Abstract"}>Abstract</MenuItem>
          <MenuItem value={"Keyword"}>Keyword</MenuItem>
        </Select>
      </FormControl>
    );
  }

  function removeField(index: number){
  const updatedFields = [...fields];
    updatedFields.splice(index,1);
    setFields(updatedFields);
  }

  function FieldRemoveIcon({isFirst, index}: {isFirst:boolean, index:number}){
      if(isFirst){
        return null;
      }
  return (
   <Box className="generator-view-delete-icon-item"> 
        <Tooltip title="Delete">
              <DeleteIcon  onClick={()=>removeField(index)}/>
          </Tooltip>
          </Box>
  );
  }

  function Keywords(fieldEl: Field,i: number) {
    return (
      <FormControl className={ i=== 0 ? "generator-view-keywords-item-first" : "generator-view-keywords-item"} fullWidth>
        <TextField
          label="Keywords(Comma separated)"
          value={fieldEl.keywords?.toString() ?? ''}
          onChange={(e) => {
            changeFieldKeywords(e as SelectChangeEvent, i);
          }}
        />
      </FormControl>
    );
  }

  return (
    <>
   
      {fields.map((fieldEl: Field, i: number) => (
        <>
          <ErrorAlert displayError={errorPresent} setDisplayError={setErrorPresent} errorMessage="Queries couldn't be generated. Please make sure that no field is empty."/>
          <SaveDialog/>
        <LoadingIndicator loading={loadingOverlayOpen} /> 
          <Relation isFirst={i === 0} index={i} />
          <Box className="field-container-generator-view" sx={{ minWidth: 120 }}>
            {FieldTypes(fieldEl, i)}
            {Keywords(fieldEl,i)}
      <FieldRemoveIcon isFirst={i === 0} index={i}/> 
          </Box>
        </>
      ))}
      <Button
        className="field-container"
        variant="outlined"
        onClick={() => {
          addField();
        }}
      >
        Add field
      </Button>
      <Button
        className="field-container"
        variant="outlined"
        startIcon={<AutorenewIcon />}
        onClick={() => {
          resetFields();
        }}
      >
        Reset
      </Button>
    <Queries/>
    </>
  );
}

export default QueryGenerator;
