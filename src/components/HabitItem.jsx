import React from 'react';
import cl from '../styles/HabitItem.module.css'

const HabitItem = ({name, description, dayTime}, props) => {

    if(!description) {
        description = "Нет описания";
    }

  return (
    <div className={cl.habit}>
        <div className={cl.habit__content}>

            <h1 className={cl.habit__name}>
                {name}
            </h1>

            <div>
                {description}
            </div>

            <div>
                {dayTime}
            </div>
        </div>
    </div>
  );
};

export default HabitItem;