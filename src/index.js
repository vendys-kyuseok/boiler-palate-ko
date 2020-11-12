import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css'
import { applyMiddleware, createStore } from 'redux';
import premiseMiddleware from 'redux-promise';
import ReduxTunk from 'redux-thunk';
import Reducer from './_reducer'

// createStore은 객체만 받을 수 있어 미들웨를 사용하여 promise, function을 사용 가능하게한다.
const createStoreWithMiddleware = applyMiddleware(premiseMiddleware, ReduxTunk)(createStore)


ReactDOM.render(
  <Provider 
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      
    <App />

  </Provider>,  document.getElementById('root')
);


ServiceWorker.unregister();