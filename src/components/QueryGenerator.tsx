import { FieldMap, Queries, INFO } from "../types/index";
import { Mousewheel, Pagination } from "swiper/modules";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Swiper, SwiperSlide } from "swiper/react";
import NetworkError from "./NetworkError";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function QueryGenerator() {
  useEffect(() => {
    function handleQueryViewQuit(event: KeyboardEvent) {
      if (event.key === "q") {
        setQueriesOverlayOpen(false);
      }
    }

    document.addEventListener("keydown", handleQueryViewQuit);
    return () => document.removeEventListener("keydown", handleQueryViewQuit);
  }, []);
  const [loadingOverlayOpen, setLoadingOverlayOpen] = useState<boolean>(false);
  const [quriesOverlayOpen, setQueriesOverlayOpen] = useState<boolean>(false);
  const [fieldMaps, setFieldMaps] = useState<Array<FieldMap>>([
    { label: null, keywords: null, logical_operator: null },
  ]);
  const [queries, setQueries] = useState<Queries>({
    acm: null,
    ieee: null,
    wos: null,
    scopus: null,
    ebsco: null,
  });

  // function emptyFieldsPresent(): boolean{
  //   const firstField = fieldMaps[0];
  //     // other than first one all consequtive field should have keywords.
  //   if(fieldMaps.length === 1 && (!firstField.label || !firstField.logical_operator -> wrong || !firstField.keywords ||firstField.keywords.length === 0 )){

  //     return true;
  //   }
  //   // TEST THIS:
  //   // if fieldMaps.length > 1, the last logical operator can be empty the others can't be
  //   // //Insted of every use findIndex and "-1", then use that index to display warning:
  //  // return fieldMaps.every((field, index)=>{
  //  //    // TEST THIS:
  //  //  return !!field.label && field.keywords && field.keywords.length > 0 && (fieldMaps.length > 1 && index !== fieldMaps.length -1 ? !!field.logical_operator : true)
  //  //  })
  //   return false;
  // }

  async function generateQueries() {
    // if(emptyFieldsPresent()){
    //   return;
    // }
    setLoadingOverlayOpen(true);
    const { data } = await axios.post("http://localhost:9998/query", fieldMaps);
    setQueries(data);
    setLoadingOverlayOpen(false);
    setQueriesOverlayOpen(true);
  }

  function changeFieldType(event: SelectChangeEvent, index: number) {
    const fields = [...fieldMaps];
    fields[index].label = event.target.value;
    setFieldMaps(fields);
  }

  function changeRelationType(event: SelectChangeEvent, index: number) {
    const fields = [...fieldMaps];
    fields[index].logical_operator = event.target.value;
    setFieldMaps(fields);
  }

  function changeFieldKeywords(event: SelectChangeEvent, index: number) {
    const keywords = event.target.value.split(",");
    const filteredKeywords = keywords.filter((keyword) => {
      return !!keyword;
    });
    const fields = [...fieldMaps];
    fields[index].keywords = filteredKeywords;
    setFieldMaps(fields);
  }

  function addField() {
    const fields = [
      ...fieldMaps,
      { label: null, keywords: null, logical_operator: null },
    ];
    setFieldMaps(fields);
  }

  function resetFields() {
    setFieldMaps([{ label: null, keywords: null, logical_operator: null }]);
  }

  function Relation({ isFirst, index }: { isFirst: boolean; index: number }) {
    if (fieldMaps.length === 1 || isFirst) {
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
            value={fieldMaps[index].logical_operator}
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

  function Queries() {
    return (
      <>
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="swiper-container"
        >
          <SwiperSlide className="swiper-content-container">
            <Paper className="swiper-paper-content" elevation={3}>
              <div className="swiper-paper-content-query-name-icons-container">
              <div style={{ color: "#1976d2" }}>WOS Query</div>
                <div>
              <Tooltip title="Copy">
                <FileCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(queries.wos ?? "");
                  }}
                  style={{ color: "gray" }}
                />
              </Tooltip>
              <Tooltip title={INFO.WOS}>
                <InfoIcon style={{ color: "gray" }} />
              </Tooltip>
              </div>
              </div>
              <div className="swiper-paper-content-query-text">
              {queries.wos}
              </div>
            </Paper>
          </SwiperSlide>
  <SwiperSlide className="swiper-content-container">
            <Paper className="swiper-paper-content" elevation={3}>
              <div className="swiper-paper-content-query-name-icons-container">
              <div style={{ color: "#1976d2" }}>IEEE Query</div>
                <div>
              <Tooltip title="Copy">
                <FileCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(queries.ieee ?? "");
                  }}
                  style={{ color: "gray" }}
                />
              </Tooltip>
              <Tooltip title={INFO.IEEE}>
                <InfoIcon style={{ color: "gray" }} />
              </Tooltip>
              </div>
              </div>
              <div className="swiper-paper-content-query-text">
              {queries.ieee}
              </div>
            </Paper>
          </SwiperSlide>
   <SwiperSlide className="swiper-content-container">
            <Paper className="swiper-paper-content" elevation={3}>
              <div className="swiper-paper-content-query-name-icons-container">
              <div style={{ color: "#1976d2" }}>ACM Query</div>
                <div>
              <Tooltip title="Copy">
                <FileCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(queries.acm ?? "");
                  }}
                  style={{ color: "gray" }}
                />
              </Tooltip>
              <Tooltip title={INFO.ACM}>
                <InfoIcon style={{ color: "gray" }} />
              </Tooltip>
              </div>
              </div>
              <div className="swiper-paper-content-query-text">
              {queries.acm}
              </div>
            </Paper>
          </SwiperSlide>
   <SwiperSlide className="swiper-content-container">
            <Paper className="swiper-paper-content" elevation={3}>
              <div className="swiper-paper-content-query-name-icons-container">
              <div style={{ color: "#1976d2" }}>SCOPUS Query</div>
                <div>
              <Tooltip title="Copy">
                <FileCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(queries.scopus ?? "");
                  }}
                  style={{ color: "gray" }}
                />
              </Tooltip>
              <Tooltip title={INFO.SCOPUS}>
                <InfoIcon style={{ color: "gray" }} />
              </Tooltip>
              </div>
              </div>
              <div className="swiper-paper-content-query-text">
              {queries.scopus}
              </div>
            </Paper>
          </SwiperSlide>
   <SwiperSlide className="swiper-content-container">
            <Paper className="swiper-paper-content" elevation={3}>
              <div className="swiper-paper-content-query-name-icons-container">
              <div style={{ color: "#1976d2" }}>EBSCO Query</div>
                <div>
              <Tooltip title="Copy">
                <FileCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(queries.ebsco ?? "");
                  }}
                  style={{ color: "gray" }}
                />
              </Tooltip>
              <Tooltip title={INFO.EBSCO}>
                <InfoIcon style={{ color: "gray" }} />
              </Tooltip>
              </div>
              </div>
              <div className="swiper-paper-content-query-text">
              {queries.ebsco}
              </div>
            </Paper>
          </SwiperSlide>
        </Swiper>
      </>
    );
  }
  function FieldTypes(fieldEl: FieldMap, i: number) {
    return (
      <FormControl className="flex-item" fullWidth>
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

  function Keywords(i: number) {
    return (
      <FormControl className="flex-item">
        <TextField
          label="Keywords"
          onChange={(e) => {
            changeFieldKeywords(e as SelectChangeEvent, i);
          }}
        />
      </FormControl>
    );
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={quriesOverlayOpen}
      >
        <Queries />
      </Backdrop>
      {fieldMaps.map((fieldEl, i) => (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingOverlayOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Relation isFirst={i === 0} index={i} />
          <Box className="field-container" sx={{ minWidth: 120 }}>
            {FieldTypes(fieldEl, i)}
            {Keywords(i)}
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

      <Button
        variant="outlined"
        onClick={() => {
          generateQueries();
        }}
      >
        Generate queries
      </Button>
    </>
  );
}

export default QueryGenerator;
