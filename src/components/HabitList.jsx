import { useContext } from 'react';
import HabitItem from './HabitItem';
import { HabitArrContext } from '../context';

const HabitList = () => {

  const [habitsArr, setHabitsArr] = useContext(HabitArrContext);
  
  return (
    <div>
        <h1 className='text-center text-white font-bold text-4xl mb-4'>
            Все привычки
        </h1>

        {habitsArr.map((habit, index) => 
            <HabitItem
                key = {index + 1}
                index={index}
            />
        )}
    </div>
  );
};

export default HabitList;