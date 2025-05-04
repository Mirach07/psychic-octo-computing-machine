import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({habits}) => {



  return (
    <div>
        <h1 className='text-center'>
            Все привычки
        </h1>

        {habits.map((habit, index) => 
            <HabitItem
                className = 'flex'
                name = {habit.name}
                description = {habit.description}
                dayTime = {habit.dayTime}
                key = {index + 1}
            />
        )}
    </div>
  );
};

export default HabitList;