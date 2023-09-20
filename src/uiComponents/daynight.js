import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from "@mui/material";
export default function DayNight({ toggleDarkMode, isDarkMode })
{
    
    return(
        <div>
             <IconButton
          edge="end"
          color="secondary"
          aria-label="toggle dark mode"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <LightModeIcon color="warning"/> : <Brightness4Icon color="default"  />}
        </IconButton>
        </div>
    )
}