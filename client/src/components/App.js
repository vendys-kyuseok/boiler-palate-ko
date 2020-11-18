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
import VideoUploadPage from './views/VideoUpload/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
import Nav from './views/NavBar/NavBar'

function App() {
  return (
    <Router>
      <Nav />
      <div style={{paddingTop: '75px',  minHeight: 'calc(100vh - 80px)'}}>
        <Switch>
          <Route exact path="/" component = {Auth(LandingPage, null, true)} />
          
          <Route exact path="/login" component = {Auth(LoginPage, false)} />
           
          <Route exact path="/register" component = {Auth(RegisterPage, false)} />

          <Route exact path="/video/upload" component = {Auth(VideoUploadPage, true)} />

          {/* 비디오 아이들 통해 페이지 이동 */}
          <Route exact path="/video/:videoId" component = {Auth(VideoDetailPage, null)} />

          <Route exact path="/Subscription" component = {Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

