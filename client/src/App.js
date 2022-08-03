import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Alert from './components/alert/Alert';
import Header from './components/Header';
import PageRender from './customRouter/PageRender';
import Login from './pages/login';
import Home from './pages/home';
import { refreshToken } from './redux/actions/authAction';
import Register from './pages/register';
import PrivateRouter from './customRouter/PrivateRoute';
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionsAction';

import io from 'socket.io-client'
import { GLOBAL_TYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';

import { getNotifies } from './redux/actions/notifyAction';


const App = () => {
  const dispatch = useDispatch();
  const { auth, status, modal } = useSelector((state) => state)

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket })
    return () => socket.close();
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [auth.token, dispatch])

  useEffect(() => {
    if(!("Notification" in window)) {
      alert('This browser does not sprt')
    } else if(Notification.permission === "granted") {

    } else if(Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        if(permission === "granted") {

        }
      });
    }
  }, [])

  return (
    <Router>
      <Alert />
      <input type={'checkbox'} id='theme' />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <div className='wrap_page'>
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
