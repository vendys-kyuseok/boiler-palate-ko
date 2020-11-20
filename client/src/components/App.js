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
import Footer from './views/Footer/Footer';

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

          {/* 비디오 아이디 통해 페이지 이동 */}
          <Route exact path="/video/:videoId" component = {Auth(VideoDetailPage, null)} />

          <Route exact path="/Subscription" component = {Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}




// import React, {createContext, useContext} from 'react';

// const AContext = createContext()

// function App () {
//     const user = {
//         nickname: 'kyuseok',
//         isAdmin: 'true'
//     }
//     return(
//         <AContext.Provider value={user}>
//             <div>
//                 <Posts />
//             </div>
//         </AContext.Provider>
//     )
// }

// const BContext = createContext()

// function Posts () {
//     const posts = [
//         {
//             title: '어서오시고',
//             content: '어여가시고'
//         }
//     ]

//     return (
//         <BContext.Provider value={posts}>
//             <C />
//         </BContext.Provider>
//     )
// }

// function C () {

//     const user = useContext(AContext);
//     const posts = useContext(BContext);

//     let label = 'user';
//     if(user.isAdmin){
//         label = 'Admin'
//     }

//     console.log(user)

//     return(
//         <div>
//             <div>{label}</div>
//             <div>{user.nickname}</div>
//             <div>{posts.map((post, index) => (
//                 <div key={index}>
//                     <div>{post.title}</div>
//                 </div>
//             ))}</div>
//         </div>
//     )
// }


export default App;

