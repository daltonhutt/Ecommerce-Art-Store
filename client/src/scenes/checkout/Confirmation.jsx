import { Box, Alert, AlertTitle } from '@mui/material';


const Confirmation = () => {
    return <Box m="90px auto" width="80%" height="50vh">
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            You have succesfully made an order -{" "}
            <strong>Thank you for supporting a local artist!</strong>    
        </Alert>

    </Box> 
};

export default Confirmation;