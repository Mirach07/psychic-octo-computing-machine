import React, { useContext, useEffect, useState } from 'react';
import cl from "./MyCheckbox.module.css";
import { HabitArrContext, HabitItemContext } from '../../../context';

const MyCheckbox = ({checkedState}) => {

    const {id, isDone} = useContext(HabitItemContext);
    const [habitsArr, setHabitsArr] = useContext(HabitArrContext);

    const handleChange = () => {
        setHabitsArr((prev) => 
            prev.map(habit => 
                habit.id === id ? {...habit, isDone: !habit.isDone} : habit
            )
        )
    }

    return (
        <label className={cl.checkboxWrapper}>
            <input
                type="checkbox"
                checked={isDone}
                onChange={handleChange}
                className={cl.hiddenCheckbox}
            />
            <span className={cl.customCheckbox}></span>
        </label>
  );
}

export default MyCheckbox;