import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";



function ErrorAlert({displayError, setDisplayError, errorMessage } : {displayError: boolean, setDisplayError(state: boolean): void, errorMessage?: string}){
  if(!displayError){
    return null;
  }
return (
<>
      <Backdrop
        onClick={()=>setDisplayError(false)}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={displayError}
        timeout={{ enter: 1000, exit: 10000 }}
         addEndListener={() => {
           setTimeout(() => {
             setDisplayError(false);
           }, 10000);
         }}
      >
        <Alert severity="error">{errorMessage ?? "An error occured, operation was not successful(click to skip)"}</Alert>
      </Backdrop>
</>
);
}

export default ErrorAlert;
