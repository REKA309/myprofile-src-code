// Login.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../reduxFolder/actions';
import { useNavigate } from 'react-router-dom';
import Password from '../uiComponents/password';
import CustomSnackbar from '../uiComponents/snackbar';
import { Button, TextField } from "@mui/material";
import axios from 'axios';
function Login(props) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const handlePassword = (newPassword) => {
    setPassword(newPassword);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
   
  };
  function handleSignup(){
    navigate('/signup')
  }
  function handleForgot()
  {
    navigate('/forgot')
  }
  function handleLogin()
  {
    if(email.length!==0& password.length>=8){
      if(validateEmail(email))
      {
        axios.post('https://login-backend-f1qc.onrender.com/usercredits/checkUser', { "userEmail":email,"password":password }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          const { data,status } = response;
          console.log(response)
          if (data.success&& status===200) {
              
            const userData = { email}; // Replace with actual user data
    props.login(userData);
    navigate('/homepage')
          } 
          
        })
        .catch((error) => {
          if (error.response) {
              if (error.response.status === 401) {
                // Handle 401 Unauthorized error
                setSnackbarMessage('Unauthorized access. Please check your credentials.!!!');
                setSnackbarSeverity('error');
                setOpenSnackbar(true)
              } else if (error.response.status === 404) {
                // Handle 404 Not Found error
                setSnackbarMessage('User account doesnt exists, create new account!!!!!!');
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
      else{
        setSnackbarMessage('Provide Valid Email Id!');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
    }
    else{
      setSnackbarMessage('Please provide proper credentials!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }
  function validateEmail(email)
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
 

  return (
    <div className="row loginScreen-container">
    <div className="loginCard-container">
    <div>
    <h1 style={{fontFamily:` Georgia, 'Times New Roman', Times, serif`}}>LOGIN PAGE</h1>
    </div>
    <div className="card">
        <div className="card-body">
        <TextField id="standard-basic" label="Email"  variant="standard" color="secondary" onChange={(e)=>{setEmail(e.target.value)}}/>
        <Password onPasswordChange={handlePassword} idValue="pass1"/>
        <Button variant="contained" color="success"onClick={handleLogin}>LOGIN</Button>
        <Button variant="text" color="secondary" onClick={handleForgot}>Forgot Password</Button>
        <div className="new-user">
          <h6 style={{textAlign:'center'}}>Are you new User?</h6>
          <Button variant="text"  onClick={handleSignup}>Click here</Button>
          
        </div>
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
  );
}

export default connect(null, { login })(Login);
