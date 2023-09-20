import React,{useState} from "react";
import CustomSnackbar from "../uiComponents/snackbar";
import Password from '../uiComponents/password'
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup()
{
    const [user,setUser]=useState('')
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [confirm,setConfirm]=useState("")
  const navigate=useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const handlePassword = (newPassword) => {
    setPassword(newPassword);
  };
  const handleConfirm = (newPassword) => {
    setConfirm(newPassword);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
   
  };
  function passwordCheck(password,confirm)
  {
    if(password.trim()===confirm.trim())
    {
        return true
    }
    else
    {
        return false
    }
  }
  function handleSignup() {
   if(user.length!==0 && passwordCheck(password,confirm)&&validateEmail(email) && password.length>=8 )
   {
    axios.post('https://login-backend-f1qc.onrender.com/usercredits/createUsers', {"userName":user, "userEmail":email,"password":password }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const { data,status } = response;
               
                if (data.success&& status===200) {
                    
                  navigate('/'); // Navigate to the next component
                } 
                
              })
              .catch((error) => {
                if (error.response) {
                    if (error.response.status === 409) {
                      // Handle 409 Unauthorized error
                      setSnackbarMessage('User account already exists!!!');
                      setSnackbarSeverity('error');
                      setOpenSnackbar(true)
                    } else if (error.response.status === 500) {
                      // Handle 500 Not Found error
                      setSnackbarMessage('Something went wrong internally!!!');
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
   else if(user.length===0)
   {
    setSnackbarMessage('Provide Valid User Name!');
    setSnackbarSeverity('warning');
    setOpenSnackbar(true);
   }
   else if(!validateEmail(email))
   {
    setSnackbarMessage('Provide Valid Email Id!');
    setSnackbarSeverity('warning');
    setOpenSnackbar(true);
   }
   else if(!passwordCheck(password,confirm))
   {
    setSnackbarMessage('Passwords do not match!');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
   }
   else
   {
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
        <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>LOGIN PAGE</h1>
        </div>
        <div className="card">
            <div className="card-body">
            <TextField id="standard-basic1" label="User Name"  variant="standard" color="secondary" onChange={(e)=>{setUser(e.target.value)}}/>
            <TextField id="standard-basic" label="Email"  variant="standard" color="secondary" onChange={(e)=>{setEmail(e.target.value)}}/>
            <Password onPasswordChange={handlePassword}idVal="password2"/>
            <Password onPasswordChange={handleConfirm} idVal="password3"/>
            <Button variant="contained" color="success"onClick={handleSignup}>SIGN UP</Button>
           
            
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