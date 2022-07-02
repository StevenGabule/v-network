import React from 'react'

const Toast = ({msg, handleShow, bgColor}) => {
  return (
    <div className={`toast show position-fixed text-light ${bgColor}`} style={{ top: 5, right: 5, minWidth: 200, zIndex: 50 }}>
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className='mr-auto text-light'>{msg.title}</strong>
        <button onClick={handleShow} className='ml-2 mb-1 text-light close' data-dismiss="toast" style={{outline: 'none'}}>&times;</button>
      </div>
      <div className='toast-body'>
        {msg.body}
      </div>
    </div>
  )
}

export default Toast