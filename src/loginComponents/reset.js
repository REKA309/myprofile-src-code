import React,{useState} from "react";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Password from "../uiComponents/password";
import CustomSnackbar from "../uiComponents/snackbar";
import axios from "axios";
export default function ResetPassword()
{
    const navigate=useNavigate()
    const [email,setEmail]=useState('');
    const [token,setToken]=useState('');
    const [password,setPassword]=useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
       
      };
    const handlePassword = (newPassword) => {
        setPassword(newPassword);
      };
    function validateEmail(email)
      {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
      }
    function handleReset()
    {
        if(email.length!==0 && token.length!==0 && password.length!==0)
        {
            if(validateEmail(email) && password.length >=8)
            {
                axios.post('https://login-backend-f1qc.onrender.com/usercredits/reset-password', {"userEmail":email,"resetToken":token,"newPassword":password }, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    const { status } = response;
                   
                    if (status===200) {
                        setSnackbarMessage('Password Updated Successfully!!!');
                        setSnackbarSeverity('success');
                        setOpenSnackbar(true)
                      navigate('/'); // Navigate to the next component
                    } 
                    
                  })
                  .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 500) {
                          // Handle 500 Unauthorized error
                          setSnackbarMessage('Failed to update password!!!');
                          setSnackbarSeverity('error');
                          setOpenSnackbar(true)
                        } else if (error.response.status === 404) {
                          // Handle 404 Not Found error
                          setSnackbarMessage('Invalid email or token!!!');
                          setSnackbarSeverity('error');
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
                setSnackbarMessage('Provide Valid Credentials!');
                setSnackbarSeverity('warning');
                setOpenSnackbar(true);
            }
        }
        else
        {
            setSnackbarMessage('Please provide required data!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }
    return(
        <div className="row loginScreen-container">
           <div className="loginCard-container">
           <div>
            <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>RESET PASSWORD</h1>
            </div>
            <div className="card">
            <div className="card-body newBody">
            <TextField id="standard-basic1" color='secondary' label="Email address"  variant="standard"onChange={(e)=>{setEmail(e.target.value)}} />
            <TextField id="standard-basic2" color='secondary' label="Reset Token"  variant="standard"onChange={(e)=>{setToken(e.target.value)}} />
            <Password onPasswordChange={handlePassword} idVal="password5"/>
            <Button variant="contained" color="success"onClick={handleReset}>RESET PASSWORD</Button>
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