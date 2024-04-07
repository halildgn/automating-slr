import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";



function NetworkError({displayError } : {displayError: boolean}){
return (
<>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={displayError}
        // in={displayError} //Write the needed condition here to make it appear
        timeout={{ enter: 1000, exit: 2000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
        // addEndListener={() => {
        //   setTimeout(() => {
        //     setIsUploadSuccess(null);
        //   }, 3000);
        // }}
      >
        <Alert severity="error">Upload was not succesful</Alert>
      </Backdrop>
</>
);
}

export default NetworkError;
