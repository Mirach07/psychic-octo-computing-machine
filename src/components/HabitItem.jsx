import React from 'react';
import cl from '../styles/HabitItem.module.css'

const HabitItem = ({name, description, dayTime, isCurrent, isDone}, props) => {

    const rootClasses = [cl.habit__content]

    if(!description) {
        description = "Нет описания";
    }

    if(isCurrent) {
        rootClasses.push(cl.current)
    }

    

  return (
    <div className={cl.habit}>
        <div className={rootClasses.join(' ')}>

            <h1 className={cl.habit__name}>
                {name}
            </h1>

            <div>
                {description}
            </div>

            <div>
                {dayTime}
            </div>

            {isDone ? <input type='checkbox' checked/> : <input type='checkbox'/>}
        </div>
    </div>
  );
};

export default HabitItem;