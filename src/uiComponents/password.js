import React,{useState} from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function Password({ onPasswordChange,idVal })
{
     const [showPassword, setShowPassword] = React.useState(false);
     const [password, setPassword] = useState('');
     const handlePassword = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
      onPasswordChange(newPassword);
    };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
return(
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor={idVal} color="secondary">Password</InputLabel>
                        <Input
                            id={idVal}
                            type={showPassword ? 'text' : 'password'}
                            color="secondary"
                            placeholder="must have mini 8 characters"
                            onChange={handlePassword}
                            value={password}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                         />
                        </FormControl>
)
}