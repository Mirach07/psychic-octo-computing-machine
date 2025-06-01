import { useContext, useId } from 'react';
import cl from "./MyCheckbox.module.css";
import { HabitArrContext } from '../../../context';

const MyCheckbox = ({id, isDone}) => {

    const passwordHintId = useId();

    const [habitsArr, setHabitsArr] = useContext(HabitArrContext);

    const handleChange = () => {
        setHabitsArr((prev) => 
            prev.map(habit => habit.id === id ? {...habit, isDone: !habit.isDone} : habit)
        )
    }

    return (
        <label className={cl.checkboxWrapper}>
            <input
                type="checkbox"
                checked={isDone}
                onChange={handleChange}
                className={cl.hiddenCheckbox}
                id={passwordHintId}
            />
            <span className={cl.customCheckbox}></span>
        </label>
  );
}

export default MyCheckbox;