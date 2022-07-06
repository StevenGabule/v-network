import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { checkImage } from '../../utils/checkImage'

const INITIAL_STATE = {
  fullname: "",
  mobile: "",
  website: "",
  story: "",
  address: "",
  gender: "",
}

const EditProfile = ({setOnEdit }) => {
  const [userData, setUserData] = useState(INITIAL_STATE)
  const [avatar, setAvatar] = useState('')

  const { auth, theme } = useSelector(state => state);
  const dispatch = useDispatch();
  console.log('userData', userData);
  useEffect(() => {
    setUserData(auth.user)
  }, [auth.user])

  const changeAvatar = (evt) => {
    const file = evt.target.files[0];
    const err = checkImage(file);
    if (err) return dispatch({ type: GLOBAL_TYPES.ALERT, payload: {error: err}});
    setAvatar(file);
  }

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setUserData({ ...userData, [name]: value })
  }

  return (
    <div className='edit_profile'>
      <button type='button' onClick={() => setOnEdit(false)} className='btn btn-danger btn-sm btn_close'>Close</button>
      <form>
        <div className='info_avatar mb-3'>
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          />
          <span>
            <i className='fas fa-camera' />
            <p>Change</p>
            <input type={'file'} name='file' id='file_up' accept='image/*' onChange={changeAvatar} />
          </span>
        </div>

        <div className='form-group'>
          <label htmlFor='fullname'>Full name</label>
          <div className='position-relative'>
            <input type={'text'} className='form-control' name='fullname' id='fullname' value={userData.fullname} onChange={handleInput} />
            <small
              className='text-danger position-absolute'
              style={{
                top: '50%',
                right: 5,
                transform: 'translateY(-50%)'
              }}>
              {/* {full_name.length}/25 */}
            </small>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='mobile'>Mobile</label>
          <input type={'text'} name='mobile' value={userData.mobile} className='form-control' onChange={handleInput} />
        </div>

        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <textarea name='address' value={userData.address} className='form-control' onChange={handleInput} rows={3} />
        </div>

        <div className='form-group'>
          <label htmlFor='website'>Website</label>
          <input type={'text'} name='website' value={userData.website} className='form-control' onChange={handleInput} />
        </div>

        <div className='form-group'>
          <label htmlFor='story'>Story</label>
          <textarea name='story' value={userData.story} className='form-control' onChange={handleInput} rows={5} />
        </div>

        <label htmlFor='gender'>Gender</label>
        <div className='input-group-prepend px-0 mb-4'>
          <select name='gender' id='gender' className='custom-select text-capitalize' onChange={handleInput}>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </select>
        </div>

        <button type='submit' className='btn btn-info btn-block'>Update</button>

      </form>
    </div>
  )
}

export default EditProfile