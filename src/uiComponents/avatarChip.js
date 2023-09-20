import React,{useState} from "react";
import Avatar from '@mui/material/Avatar';
import {Chip, TextField,Button} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CustomSnackbar from "./snackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
export default function CustomChip(props)
{
 const [useremail,setUserEmail]=useState('')
  const [password,setPassword]=useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      function validateEmail(email)
      {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      function handleSubmit()
      {
       if( validateEmail(useremail) && password.length >=8 ) 
       {
        axios.post('https://login-backend-f1qc.onrender.com/usercredits/userpasswordreset', {"userEmail":useremail,"password":password }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
            if (status===200) {
                handleClose()
                setSnackbarMessage('Customer Updated Successfully!!!!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true); 
            }  
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                 handleClose()
                  setSnackbarMessage('Failed to update location!');
                  setSnackbarSeverity('warning');
                  setOpenSnackbar(true)
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                 handleClose()
                 
                  setSnackbarMessage('Invalid user!!!');
                  setSnackbarSeverity('warning');
                  setOpenSnackbar(true)
                } else {
                  // Handle other errors
                  console.error('Error:', error);
                  setSnackbarMessage('An error occurred while making the request.');
                  setSnackbarSeverity('error');
                  setOpenSnackbar(true)
                }
              } else {
                // Handle network errors or other issues
                console.error('Error:', error);
                setSnackbarMessage('An error occurred while making the request.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true)
              }
          });
       }
       else if(!validateEmail(useremail))
       {
        setSnackbarMessage('Provide Valid Email Id!!!');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true)
       }
       else{
       handleClose();
        setSnackbarMessage('Please fill entire form!!!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true)
       }
      }
      const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };
    
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
       setPassword('');
       setUserEmail('');
      };
    
      
    return(
        <div>
    <Chip
                avatar={<Avatar alt="user" src="https://img.freepik.com/free-vector/abstract-flat-design-background_23-2148450082.jpg?size=626&ext=jpg&ga=GA1.2.2047273959.1682233859&semt=ais"  sx={{ width: 56, height: 56 }}/>}
                label={props.useremailadd}
                variant="contained"
                color="warning"
                onClick={handleOpenUserMenu}     
                />
                <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key="Edit" onClick={handleClickOpen} >
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem key="Close" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Close</Typography>
                </MenuItem>
            </Menu>
           
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT USER PROFILE</DialogTitle>
        <DialogContent>
        <TextField id="standard-basic" label="User Email"  variant="standard" color="secondary" onChange={(e)=>{setUserEmail(e.target.value)}}/><br/>
        <TextField id="standard-basic1" label="Password" placeholder='min 8 characters' variant="standard" color="secondary" onChange={(e)=>{setPassword(e.target.value)}}/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Edit User Profile</Button>
        </DialogActions>
      </Dialog>
            <CustomSnackbar
                            open={openSnackbar}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}   
                           
            />
        </div>
    )
}

