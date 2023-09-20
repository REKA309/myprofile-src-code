// Home.js
import React,{useState,useEffect} from 'react';
import { Button, TextField } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reduxFolder/actions';
import CustomChip from '../uiComponents/avatarChip';
import CustomSnackbar from '../uiComponents/snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Datano from '../mediaFolder/datano.png'
import { dayModeTheme, nightModeTheme } from "../uiComponents/themes";
import { ThemeProvider } from "@mui/material/styles";

import axios from 'axios';
import DayNight from '../uiComponents/daynight';
function Home(props) {
 
  const [open, setOpen] = React.useState(false);
  const [array,setArray]=useState([])
  const [age,setAge]=useState(1);
  const [gender,setGender]=useState('');
  const [date,setDate]=useState('')
  const [mob,setMob]=useState('')
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "false"
  );
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    localStorage.setItem("darkMode", newMode);
    setIsDarkMode(newMode);
  };

  // Set the theme based on the dark mode toggle
  const theme = isDarkMode ? nightModeTheme : dayModeTheme;

  useEffect(() => {
    // Set the theme initially when the component mounts
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
   
  };
    const navigate=useNavigate()
    function handleLogout()
    {
      props.logout(); // Dispatch the logout action
    navigate('/'); // Redirect to the login page
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleGender=(e)=>{
      setGender(e.target.value)
    }
    const handleClose = () => {
      setOpen(false);
     setAge(1)
     setMob('')
     setGender('')
     setDate('')
    };
   function handleSubmit()
   {
    if(age.length!==0 && mob.length!==0 && gender.length!==0 && date.length!==0)
    {
      console.log(age,date,gender,mob,props.user.email)
      axios.post('https://login-backend-f1qc.onrender.com/usercredits/updateprofile', {"userAge":age,"userGender":gender,"userDOB":date,"userMobile":mob,"userEmail":props.user.email }, { headers: { 'Content-Type': 'application/json' } })
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
                  setAge(1)
                setGender('')
                setDate('');
                setMob('')
                 
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
    else
    {
      setSnackbarMessage('Please provide proper credentials!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
   }
   const handleDate=(e)=>
   {
    const inputValue = e.target.value;

    // Ensure that the input matches the format "yyyy-MM-dd" before updating the state
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputValue)) {
      setDate(inputValue);
    }
   }
   function handleMyProfile()
   {
    axios.get(`https://login-backend-f1qc.onrender.com/usercredits/viewprofile/${props.user.email}`)
    .then((res )=>{
  
      setArray(res.data)
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 500) {
          // Handle 500
          alert('Error updating data .');
        } else if (error.response.status === 404) {
          // Handle 404 Not Found error
          alert('User account doesnt exists, create new account!!!');
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
   function format(dob)
   {
    const formattedDate = dob.split('T')[0]; 
    return formattedDate;
   }
   function handleQr(qrdatarray)
   {
    const person = qrdatarray[0];
const data = formatData(person.userName, person.userAge,person.userMobile,person.userGender,person.userEmail);
console.log(data)
if(data.length!==0)
{
  const qrCodeAPIUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=FFFFFF&bgcolor=000000&format=png&data=${encodeURIComponent(data)}`;

  // Store the QR code image URL
  setQrImageUrl(qrCodeAPIUrl);
  
}
   }
   function formatData(name, age,mobile,gender,email) {
    return `${name} ${age} ${mobile} ${gender} ${email}`;
  }
  function handleDownload()
    {
        if (qrImageUrl) {
            // Make a request to download the QR code image
            axios.get(qrImageUrl, { responseType: 'arraybuffer' })
            .then((response) => {
            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: `image/png` });
            
            // Create an object URL from the Blob
            const url = URL.createObjectURL(blob);
            
            // Create an anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `qrcode.png`;
            a.click();
            
            // Revoke the object URL to release resources
            URL.revokeObjectURL(url);
            })
            .catch((error) => {
            console.error('Error downloading QR code:', error);
            });
            }
    }
  return (
    <ThemeProvider theme={theme}>
      <div className='mainc'>
      {props.isAuthenticated ? (
       <div  className='whole-container'>
         <div  className='home-container'>
         <DayNight  toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
          <h1 style={{ color: isDarkMode ? "#fff" : "#000" ,textAlign:'center'}}>My Profile</h1>
          <div className='chipdiv'>
          <CustomChip useremailadd={props.user.email || ''}/>
          <Button variant='contained' color='secondary' onClick={handleLogout}>LOG OUT</Button>
          </div>
          <h1 style={{ color: isDarkMode ? "#fff" : "#000" }} >Welcome!!!</h1>
          <h3 style={{ color: isDarkMode ? "#fff" : "#000" }} >If you are newly registered user means update your profile and view</h3>

          <div className='updatebtn'>
        <Button variant='contained' color='secondary'onClick={handleMyProfile}   >
          VIEW PROFILE 
        </Button>
        <Button variant='contained' color='success' onClick={handleClickOpen} >UPDATE PROFILE</Button>

        </div>
          
            {array.map((element,index)=>(
              <div style={{ color: isDarkMode ? "#fff" : "#000" }} className='profile-container' key={index}>
                 <h3>Name-{element.userName}</h3>
                 <h3>Age-{element.userAge}</h3>
                 <h3>DOB-{format(element.userDOB)}</h3>
                 <h3>Gender-{element.userGender}</h3>
                 <h3>Mobile Number -{element.userMobile}</h3>
              </div>
            ))}
         
          <Dialog style={{ color: isDarkMode ? "#fff" : "#000" }} open={open} onClose={handleClose}>
        <DialogTitle>EDIT USER PROFILE</DialogTitle>
        <DialogContent>
        <TextField id="standard-basic" label="AGE" type='number' variant="standard" color="secondary" onChange={(e)=>{setAge(e.target.value)}}/><br/>
        <label>DATE OF BIRTH</label>
        <TextField id='dateInfo' placeholder='yyyy-mm-dd'  variant='standard' color='secondary' type='date' onChange={handleDate}/>
        <div>
             <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">GENDER</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gender}
              onChange={handleGender}
              
            >
              <FormControlLabel value="MALE"  control={<Radio color='secondary' />} label="MALE" />
              <FormControlLabel value="FEMALE"  control={<Radio color='secondary' />} label="FEMALE" />
            </RadioGroup>
          </FormControl>
             </div>
             <TextField id="standard-basic1" label="MOBILE NUMBER" variant="standard" color="secondary" onChange={(e)=>{setMob(e.target.value)}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>Close</Button>
          <Button onClick={handleSubmit} color='secondary'>Edit User Profile</Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
                        open={openSnackbar}
                        message={snackbarMessage}
                        severity={snackbarSeverity}
                        onClose={handleSnackbarClose}   
                       
                     />
        
        </div>
        <div style={{ color: isDarkMode ? "#fff" : "#000" }} className='qrcontainer'>
          <div className='updatebtn'>
          <Button variant='contained' color='info'  onClick={() => handleQr(array)} disabled={array.length===0}>GENERATE QR CODE</Button>
            </div>
          <div  className='qrimg'>
            <div>
              <h3>Thanks!!!</h3>
              <h6>This webpage uses the QR code API for generate and decode / read QR code graphics. We are not affiliated with QR Code Generator.</h6>
            </div>
          {qrImageUrl && (
            <div className='updatebtn'>
            <img src={qrImageUrl} className='qrimgcls' alt="QR Code" />
            </div>
            )}
            <div>&nbsp;</div>
            <div className='updatebtn'>
            <Button variant='contained' color='success' onClick={handleDownload} disabled={qrImageUrl===''}>
                download qr code
            </Button>
            </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: isDarkMode ? "#fff" : "#000" }}className='notlogin-container'>
        <h1 style={{textAlign:'center'}}>You are not logged in.</h1>
        <div className='updatebtn'>
        <img src={Datano} alt='data not found' width={300} height={300}/>
        </div>
        <div className='updatebtn'>
        <Button variant='contained' color='info'onClick={() => navigate('/')} >
          LOG IN 
        </Button>
        </div>
      </div>
      )}
    </div>
    </ThemeProvider>
        
 
    
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Home);
