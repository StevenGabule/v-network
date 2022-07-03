import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../redux/actions/authAction'

const INITIAL_STATE = {
  fullname: 'john paul gabule',
  username: 'jp200' + new Date().getMilliseconds(),
  email: `jpgabule${new Date().getMilliseconds()}@gmail.com`,
  password: 'password',
  cf_password: 'password',
  gender: "male"
}

const Register = () => {
  const {auth} = useSelector(state => state)
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
    dispatch(register(userData))
  }

  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase text-center mb-4'>V-Network</h3>
        <div className='form-group'>
          <label htmlFor='fullname'>Full name</label>
          <input type='text' onChange={handleChangeInput} className='form-control' id='fullname' value={userData.fullname} name='fullname' />
        </div>

        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input type='text' onChange={handleChangeInput} className='form-control' id='username' value={userData.username.toLowerCase().replace(/ /g, '')} name='username' />
        </div>
        
        <div className='form-group'>
          <label htmlFor='emailAddress'>Email Address</label>
          <input type='email' onChange={handleChangeInput} className='form-control' id='emailAddress' value={userData.email} name='email' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' autoComplete='false' onChange={handleChangeInput} className='form-control' id='password' value={userData.password} name='password' />
        </div> 
        
        <div className='form-group'>
          <label htmlFor='ConfirmPassword'>Confirm Password</label>
          <input type='password' autoComplete='false' onChange={handleChangeInput} className='form-control' id='ConfirmPassword' value={userData.cf_password} name='cf_password' />
        </div> 

        <div className='row justify-content-between mx-0 mb-1'>
          <label htmlFor='male'>
            Male: <input type={'radio'} id='male' name='gender' value='male' checked onChange={handleChangeInput} />
          </label>
          <label htmlFor='female'>
            Female: <input type={'radio'} id='female' name='gender' value='female' onChange={handleChangeInput} />
          </label>
        </div>

        <div className='form-group'>
          <button className='btn btn-block btn-primary' type='submit'>Register</button>
        </div> 
      <p className='my-2'>You already have an account? <Link to='/login'>Login</Link></p>

      </form>
    </div>
  )
}

export default Register