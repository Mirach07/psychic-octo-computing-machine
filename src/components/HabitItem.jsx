import { HabitItemContext } from '../context';
import cl from '../styles/HabitItem.module.css'
import MyCheckbox from './UI/Checkbox/MyCheckbox';

const HabitItem = ({name, description, dayTime, isCurrent, isDone, id}) => {

    const rootClasses = [cl.habit__content];

    if(!description) {
        description = "Нет описания";
    }

    if(isCurrent) {
        rootClasses.push(cl.current);
    }

    if(isDone) {
        rootClasses.push(cl.done);
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
            <HabitItemContext.Provider value={{id: id, isDone: isDone}}>
                <MyCheckbox/>
            </HabitItemContext.Provider>
        </div>
    </div>
  );
};

export default HabitItem;