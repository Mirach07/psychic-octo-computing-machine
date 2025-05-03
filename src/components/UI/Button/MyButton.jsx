import React from 'react';
import cl from '../Button/MyButton.module.css'

const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className={cl.myButton}>
        {children}
    </button>
  )
}

export default MyButton;