import React, { useContext, useEffect, useState } from "react";
import '../styles/App.css';
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/Button/MyButton";
import { HabitArrContext } from "../context";

const HabitForm = ({closeModal}) => {

    const [habits, setHabits] = useContext(HabitArrContext);

    const [habit, setHabit] = useState({
        name: "",
        description: "",
        dayTime: "",
        isCurrent: false,
        isDone: false,
        query: 0
    })

    const addNewHabit = (e) => {
        e.preventDefault();

        if(habit.name && habit.dayTime) {
            const newHabit = {
                id: Date.now(),
                ...habit
            };

            const closeModalThing = closeModal;

            setHabits([...habits, newHabit]);

            setHabit({
                name: "",
                description: "",
                dayTime: "",
                isCurrent: false,
                isDone: false,
                query: 0
            });
        }
    }

    useEffect(() => {
        const queryFilterArray = habits.filter(h => h.dayTime === habit.dayTime);

        console.log(queryFilterArray);

        if(queryFilterArray.length === 0) {
            setHabit({...habit, query: 1});
        } else {
            setHabit(prevHabit => ({ ...prevHabit, query: queryFilterArray.length + 1 }));
        }
    }, [habits, habit.dayTime]);

    return (
        <div>
            <h1
                className="w-100% font-bold text-white text-2xl text-center m-2 px-1 py-0.5 bg-emerald-800 rounded-sm cursor-help"
            >
            Добавление привычки
            </h1>
            <form className='w-100% flex flex-col ml-2 mr-2'>

                <MyInput
                    type='text'
                    placeholder='Новая привычка'
                    value={habit.name}
                    // isObigatory={true}
                    onChange={e => setHabit({...habit, name: e.target.value})}
                />

                <MyInput
                    type='text'
                    placeholder='Описание'
                    value={habit.description}
                    onChange={e => setHabit({...habit, description: e.target.value})}
                />

                <div className='daytimeSelection__wrapper'>

                    <span 
                        className={habit.dayTime === "morning" 
                            ? "dayTimeSelection dayTimeSelection__current" 
                            : "dayTimeSelection"
                        }
                        onClick={() => setHabit({...habit, dayTime: "morning"})}
                    >
                    Утро
                    </span>
                    <span 
                        className={habit.dayTime === "day"
                            ? "dayTimeSelection dayTimeSelection__current"
                            : "dayTimeSelection"
                        }
                        onClick={() => setHabit({...habit, dayTime: "day"})}
                    >
                    День
                    </span>
                    <span 
                        className={habit.dayTime === "evening" 
                            ? "dayTimeSelection dayTimeSelection__current" 
                            : "dayTimeSelection"
                        }
                        onClick={() => setHabit({...habit, dayTime: "evening"})}
                    >
                    Вечер
                    </span>

                </div>

                <MyButton 
                    onClick={(e) => addNewHabit(e)}
                >
                Добавить
                </MyButton>
            </form>
        </div>
    );
};

export default HabitForm;