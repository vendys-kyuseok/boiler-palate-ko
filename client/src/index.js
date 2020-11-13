import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css'

// Props: 값을 바꾸려면 부모에서 자식으로
// State: component 안에서 데이터 전달 시에 사용 
// redux 없으면 하나 하나 올라갔다가 다시 내려와야함
// react component -> action(객체) -> reducer(변해진 state를 리턴) -> store(state을 감싸주는 역할) -> react component

// redux-thunk: function를 받는 방법을 알려줌
// redux-promis: promis를 받는 방법을 알려줌

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

reportWebVitals();