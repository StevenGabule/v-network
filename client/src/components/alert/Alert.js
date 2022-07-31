import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import Loading from './loading'
import Toast from './Toast'

const Alert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state)
  
  const handleShowNotify = () => {
    dispatch({type: GLOBAL_TYPES.ALERT, payload: {}})
  }

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast msg={{ title: 'Oops..', body: alert.error }} handleShow={handleShowNotify} bgColor='bg-danger' />
      )}
      {alert.success && <Toast msg={{ title: 'Success', body: alert.success }} handleShow={handleShowNotify} bgColor='bg-success' />}
    </div>
  )
}

export default Alert