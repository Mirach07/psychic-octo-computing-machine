import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({habits}) => {



  return (
    <div>
        <h1 className='text-center text-white font-bold text-4xl mb-4'>
            Все привычки
        </h1>

        {habits.map((habit, index) => 
            <HabitItem
                name = {habit.name}
                description = {habit.description}
                dayTime = {habit.dayTime}
                isCurrent={habit.isCurrent}
                isDone={habit.isDone}
                key = {index + 1}
            />
        )}
    </div>
  );
};

export default HabitList;