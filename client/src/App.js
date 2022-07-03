import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Alert from './components/alert/Alert';
import Header from './components/Header';
import PageRender from './PageRender';
import Login from './pages/login';
import Home from './pages/home';
import { refreshToken } from './redux/actions/authAction';

const App = () => {
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => state)

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Alert />
      <input type={'checkbox'} id='theme' />
      <div className="App">
        <div className='main'>
          {auth.token && <Header />}
            <Route exact path="/" component={auth.token ? Home :  Login} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
