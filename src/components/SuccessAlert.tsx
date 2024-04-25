import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";



function SuccessAlert({displaySuccess, setDisplaySuccess, successMessage } : {displaySuccess: boolean, setDisplaySuccess(state: boolean): void, successMessage?: string}){
  if(!displaySuccess){
    return null;
  }
return (
<>
      <Backdrop
        onClick={()=>setDisplaySuccess(false)}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={displaySuccess}
        timeout={{ enter: 1000, exit: 10000 }}
         addEndListener={() => {
           setTimeout(() => {
             setDisplaySuccess(false);
           }, 10000);
         }}
      >
        <Alert severity="success">{successMessage ?? "Operation was successful(click to skip)"}</Alert>
      </Backdrop>
</>
);
}

export default SuccessAlert;
