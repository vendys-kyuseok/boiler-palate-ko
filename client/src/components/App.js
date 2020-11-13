import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import VideoUploadPage from './views/VideoUpload/VideoUploadPage'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component = {Auth(LandingPage, null, true)} />
          
          <Route exact path="/login" component = {Auth(LoginPage, false)} />
           
          <Route exact path="/register" component = {Auth(RegisterPage, false)} />

          <Route exact path="/video/upload" component = {Auth(VideoUploadPage, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

