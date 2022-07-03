import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'

const INITIAL_STATE = {
  email: 'jpgabule@gmail.com',
  password: 'password',
}

const Login = () => {
  const { auth } = useSelector(state => state)
  const history = useHistory()

  const [userData, setUserData] = useState(INITIAL_STATE);
  const dispatch = useDispatch()


  useEffect(() => {
    if (auth.token) history.push('/')
  }, [auth.token, history])

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name] : value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData))
  }

  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase text-center mb-4'>V-Network</h3>
        <div className='form-group'>
          <label htmlFor='emailAddress'>Email Address</label>
          <input type='email' onChange={handleChangeInput} className='form-control' id='emailAddress' value={userData.email} name='email' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' autoComplete='false' onChange={handleChangeInput} className='form-control' id='password' value={userData.password} name='password' />
        </div> 
        <div className='form-group'>
          <button className='btn btn-block btn-primary' type='submit'>Login</button>
        </div> 
      <p className='my-2'>You don't have an account? <Link to='/register'>Register now</Link></p>

      </form>
    </div>
  )
}

export default Login