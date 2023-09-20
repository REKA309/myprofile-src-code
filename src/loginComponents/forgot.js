import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../uiComponents/snackbar";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from "axios";
export default function ForgotPassword()
{
    const [email,setEmail]=useState('');
    const navigate=useNavigate()
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
       
      };
    function handleOtp()
    {
       if(email.length!==0)
       {
        if(validateEmail(email))
        {
          axios.post('https://login-backend-f1qc.onrender.com/usercredits/requestPasswordReset', { "userEmail":email}, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
              const { status } = response;
              
              if ( status===200) {
                setSnackbarMessage('Random String sent to your respective email address!!!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true)
                navigate('/reset'); // Navigate to the next component
              } 
              
            })
            .catch((error) => {
              if (error.response) {
                  if (error.response.status === 500) {
                    // Handle 500 Unauthorized error
                    setSnackbarMessage('Failed to send the random string.!!!');
                    setSnackbarSeverity('warning');
                    setOpenSnackbar(true)
                  } else if (error.response.status === 404) {
                    // Handle 404 Not Found error
                    setSnackbarMessage('User account doesnt exists, create new account!!!');
                    setSnackbarSeverity('warning');
                    setOpenSnackbar(true)
                  } else {
                    // Handle other errors
                    console.error('Error:', error);
                    alert('An error occurred while making the request.');
                  }
                } else {
                  // Handle network errors or other issues
                  console.error('Error:', error);
                  alert('An error occurred while making the request.');
                }
            });
  
        }
        else
        {
            setSnackbarMessage('Provide Valid Email Id!');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
        }
       }
       else{
        setSnackbarMessage('Please provide required data!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
       }
    }
    function validateEmail(email)
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
    return(
        <div className="row loginScreen-container">
           <div className="loginCard-container">
           <div>
            <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>FORGOT PASSWORD</h1>
            </div>
            <div className="card">
            <div className="card-body newBody">
            <TextField id="standard-basic" label="Email"  variant="standard" color="secondary" onChange={(e)=>{setEmail(e.target.value)}}/>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleOtp}>
                     Send OTP
             </Button>
            </div>
            </div>
            <CustomSnackbar
                            open={openSnackbar}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}   
                           
                         />
           </div>
        </div>
    )
}