import cl from '../styles/HabitItem.module.css'
import MyCheckbox from './UI/Checkbox/MyCheckbox';
import { HabitArrContext } from '../context';
import { useContext } from 'react';

const HabitItem = ({index}) => {

    const [habitsArr, setHabitsArr] = useContext(HabitArrContext);
    const rootClasses = [cl.habit__content];

    if(habitsArr[index].description == false) {
        habitsArr[index].description = "Нет описания";
    }

    if(habitsArr[index].isCurrent) {
        rootClasses.push(cl.current);
    }

    if(habitsArr[index].isDone) {
        rootClasses.push(cl.done);
    }

  return (
    <div 
        className={cl.habit}
    >
        <div className={rootClasses.join(' ')}>

            <h1 className={cl.habit__name}>
                {habitsArr[index].name}
            </h1>

            <div>
                {habitsArr[index].description}
            </div>

            <div>
                {habitsArr[index].dayTime}
            </div>
            <MyCheckbox id={habitsArr[index].id} isDone={habitsArr[index].isDone}/>
        </div>
    </div>
  );
};

export default HabitItem;