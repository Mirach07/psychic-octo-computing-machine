import React, { useId } from 'react';
import cl from './MyInput.module.css';

const MyInput = React.forwardRef(({isObligatory, ...props}, ref) => {

  const passwordHintId = useId();

  // const rootClasses = [cl.myInput];

  // if (isObligatory) {
  //   rootClasses.push(cl.obligatory);
  // }

  return (
    <input ref={ref} className={cl.myInput} {...props} id={passwordHintId}/>
  );
});

export default MyInput;