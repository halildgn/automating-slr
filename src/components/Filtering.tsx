import { PublicationTypes, DateAndPageRange } from "../types/index";
import { useState } from "react";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { ChangeEvent } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

function Filtering() {
  const [isUploadSuccess, setIsUploadSuccess] = useState<null | boolean>(null);
  const [uploadOrReset, setUploadOrReset] = useState<string>("upload");
  const [isFilteringSuccess, setIsFilteringSuccess] = useState<null | boolean>(
    null,
  );
  const [displayFilterButton, setDisplayFilterButton] = useState(false);
  const [displayFields, setDisplayFields] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [includedPublicationTypes, setIncludedPublicationTypes] =
    useState<PublicationTypes>({});
  const [dateAndPageRange, setDateAndPageRange] = useState<DateAndPageRange>({
    minPages: null,
    maxPages: null,
    startYear: null,
    endYear: null,
  });
  const [boundaries, setBoundaries] = useState<DateAndPageRange>({
    minPages: null,
    maxPages: null,
    startYear: null,
    endYear: null,
  });

  function getIncludedPublicationTypes(): string[] {
    return Object.keys(includedPublicationTypes).reduce(
      (publicationTypesToInclude, publicationType) => {
        if (includedPublicationTypes[publicationType]) {
          publicationTypesToInclude.push(publicationType);
        }
        return publicationTypesToInclude;
      },
      [] as string[],
    );
  }

  function FilterButton() {
    if (!displayFilterButton) {
      return;
    }
    return (
      <Button
        variant="outlined"
        onClick={() => {
          filter();
          resetFilteringAndFileUpload();
        }}
      >
        Filter
      </Button>
    );
  }

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files;
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }
    setIsUploadSuccess(null);
    setDisplayFields(false);
    setDisplayFilterButton(false);
    setOverlayOpen(true);
    const response = await axios.post(
      "http://localhost:9998/boundariesForFilterParameters",
      formData,
    );

    if (response.status === 200) {
      const data: {
        available_publication_types: string[];
        earliest_date: string;
        latest_date: string;
        min_page: string;
        max_page: string;
      } = response.data;
      const publicationTypes = data.available_publication_types.reduce(
        (accumulator, publicationType) => {
          accumulator[publicationType] = true;
          return accumulator;
        },
        {} as { [pubType: string]: boolean },
      );
      setIncludedPublicationTypes(publicationTypes);
      setBoundaries({
        minPages: data.min_page,
        maxPages: data.max_page,
        startYear: data.earliest_date,
        endYear: data.latest_date,
      });
      setDisplayFields(true);
      setDisplayFilterButton(true);
      setOverlayOpen(false);
      setIsUploadSuccess(true);
      setUploadOrReset("reset");
    } else {
      setUploadOrReset("upload");
      setOverlayOpen(false);
      setIsUploadSuccess(false);
    }
  }

  function resetFilteringAndFileUpload() {
    setIncludedPublicationTypes({});
    setDateAndPageRange({
      minPages: null,
      maxPages: null,
      startYear: null,
      endYear: null,
    });
    setIsUploadSuccess(null);
    setDisplayFields(false);
    setDisplayFilterButton(false);
    setUploadOrReset("upload");
  }

  async function filter() {
    const includedPubTypes = getIncludedPublicationTypes();
    const filteredDateAndPageRanges = Object.assign({}, dateAndPageRange);
    for (const key of Object.keys(filteredDateAndPageRanges)) {
      if (
      // @ts-expect-error
        typeof filteredDateAndPageRanges[key] === "string" &&
      // @ts-expect-error
        filteredDateAndPageRanges[key].trim() === ""
      ) {
        // @ts-expect-error
        filteredDateAndPageRanges[key] = null;
      }
    }
    const { status } = await axios.post("http://localhost:9998/filter", {
      publicationTypes: includedPubTypes,
      ...filteredDateAndPageRanges,
    });
    if (status === 200) {
      setIsFilteringSuccess(true);
    } else {
      setIsFilteringSuccess(false);
    }
  }

  function setRange(
    field: "minPages" | "maxPages" | "startYear" | "endYear",
    value: string | Dayjs,
  ) {
    const updatedRanges = Object.assign({}, dateAndPageRange);
    updatedRanges[field] = (value as Dayjs).year
      ? (value as Dayjs).year().toString()
      : (value as string);
    setDateAndPageRange(updatedRanges);
  }

  function selectDeSelectPublicationType(
    event: ChangeEvent<HTMLInputElement>,
    pubType: string,
  ) {
    const updatedPublicationTypes = Object.assign({}, includedPublicationTypes);
    updatedPublicationTypes[pubType] = event.target.checked;
    setIncludedPublicationTypes(updatedPublicationTypes);
  }

  function PublicationTypes() {
    if (Object.keys(includedPublicationTypes).length < 1) {
      return null;
    }
    return (
      <div className="field-container queries-container">
        {Object.keys(includedPublicationTypes).map((pubType) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={includedPublicationTypes[pubType]}
                onChange={(e) => {
                  selectDeSelectPublicationType(e, pubType);
                }}
              />
            }
            label={pubType}
          />
        ))}
      </div>
    );
  }

  function PageNDate() {
    if (!displayFields) {
      return;
    }

    return (
      <>
        <FormControl>
          <TextField
            label={`Minimum number of pages -> Available minimum is ${boundaries.minPages}`}
            value={dateAndPageRange.minPages}
            onChange={(e) => {
              setRange("minPages", e.target.value as unknown as Dayjs);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label={`Maximum number of pages -> Available maximum is ${boundaries.maxPages}`}
            value={dateAndPageRange.maxPages}
            onChange={(e) => {
              setRange("maxPages", e.target.value as unknown as Dayjs);
            }}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={`Start date in years -> Newest available entry is from ${boundaries.startYear}`}
            views={["year"]}
            value={
              dateAndPageRange.startYear
                ? dayjs(dateAndPageRange.startYear)
                : null
            }
            onChange={(e) => {
              setRange("startYear", e as unknown as Dayjs);
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{
              textField: {
                helperText:
                  Number(dateAndPageRange.endYear) <
                  Number(dateAndPageRange.startYear)
                    ? "End date cant be earlier than start date"
                    : "",
                error:
                  Number(dateAndPageRange.endYear) <
                  Number(dateAndPageRange.startYear),
              },
            }}
            label={`End date in years -> Latest available entry is from ${boundaries.endYear}`}
            views={["year"]}
            value={
              dateAndPageRange.endYear ? dayjs(dateAndPageRange.endYear) : null
            }
            onChange={(e) => {
              setRange("endYear", e as unknown as Dayjs);
            }}
          />
        </LocalizationProvider>
      </>
    );
  }

  function UploadSuccessFailIndicator() {
    if (isUploadSuccess === null) {
      return null;
    }
    if (isUploadSuccess) {
      return (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isUploadSuccess}
          onClick={() => setIsUploadSuccess(null)}
          in={isUploadSuccess} 
          timeout={{ enter: 1000, exit: 5000 }} 
          addEndListener={() => {
            setTimeout(() => {
              setIsUploadSuccess(null);
            }, 5000);
          }}
        >
          <Alert severity="success">
            {" "}
            Upload was sucessful, please fill the filter conditions. To only
            remove duplicates, click on "filter" without filling the fields.
          </Alert>
        </Backdrop>
      );
    }
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isUploadSuccess}
        onClick={() => setIsUploadSuccess(null)}
        in={!isUploadSuccess} 
        timeout={{ enter: 1000, exit: 5000 }} 
        addEndListener={() => {
          setTimeout(() => {
            setIsUploadSuccess(null);
          }, 5000);
        }}
      >
        <Alert severity="error">Upload was not succesful</Alert>
      </Backdrop>
    );
  }

  function FilterSuccessFailIndicator() {
    if (isFilteringSuccess === null) {
      return;
    }
    if (isFilteringSuccess) {
      return (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFilteringSuccess}
          in={isFilteringSuccess} 
          onClick={() => setIsFilteringSuccess(null)}
          timeout={{ enter: 1000, exit: 5000 }} 
          addEndListener={() => {
            setTimeout(() => {
              setIsFilteringSuccess(null);
            }, 5000);
          }}
        >
          <Alert severity="success">
            Csv file that consists of filtered entries is saved to Downloads
            directory
          </Alert>
        </Backdrop>
      );
    }
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isFilteringSuccess}
        onClick={() => setIsFilteringSuccess(null)}
        in={!isFilteringSuccess} 
        timeout={{ enter: 1000, exit: 5000 }} 
        addEndListener={() => {
          setTimeout(() => {
            setIsUploadSuccess(null);
          }, 5000);
        }}
      >
        <Alert severity="error">Filtering was not sucessful</Alert>
      </Backdrop>
    );
  }

  function FileUpload() {
    if (uploadOrReset === "upload") {
      return (
        <>
          <input
            style={{ display: "none" }}
            onChange={handleFileUpload}
            id="file-upload"
            accept=".bib, text/x-bibtex"
            multiple
            type="file"
          />
          <Button
            className="field-container"
            variant="outlined"
            onClick={() => {
              document.getElementById("file-upload")?.click();
            }}
          >
            Choose files to filter
          </Button>
        </>
      );
    }
    return (
      <Button
        className="field-container"
        variant="outlined"
        onClick={resetFilteringAndFileUpload}
      >
        Reset
      </Button>
    );
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={overlayOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <UploadSuccessFailIndicator />
      <FilterSuccessFailIndicator />
      <FileUpload />
      <PublicationTypes />
      {PageNDate()}
      <FilterButton />
    </>
  );
}

export default Filtering;
