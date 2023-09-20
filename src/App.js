import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './loginComponents/login';
import Home from './loginComponents/home';
import Signup from './loginComponents/signup';
import ForgotPassword from './loginComponents/forgot';
import ResetPassword from './loginComponents/reset';
function App() {
 
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/homepage' element={<Home />}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/forgot' element={<ForgotPassword/>}/>
          <Route exact path='/reset' element={<ResetPassword/>}/>
        </Routes>
      </Router>
    </div>
  
  );
}

export default App;
