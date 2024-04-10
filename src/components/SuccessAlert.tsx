import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";



function SuccessAlert({displaySuccess, setDisplaySuccess, successMessage } : {displaySuccess: boolean, setDisplaySuccess(state: boolean): void, successMessage?: string}){
  if(!displaySuccess){
    return null;
  }
return (
<>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={displaySuccess}
        timeout={{ enter: 1000, exit: 5000 }}
         addEndListener={() => {
           setTimeout(() => {
             setDisplaySuccess(false);
           }, 5000);
         }}
      >
        <Alert severity="success">{successMessage ?? "Operation was successful"}</Alert>
      </Backdrop>
</>
);
}

export default SuccessAlert;
