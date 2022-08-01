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

const App = () => {
  const dispatch = useDispatch();
  const { auth, status, modal } = useSelector((state) => state)

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token)) 
      dispatch(getSuggestions(auth.token)) 
    }
  }, [auth.token, dispatch])

  return (
    <Router>
      <Alert />
      <input type={'checkbox'} id='theme' />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal />}
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
