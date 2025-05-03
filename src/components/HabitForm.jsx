import React, { useEffect, useState } from "react";
import '../styles/App.css';
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/Button/MyButton";

const HabitForm = ({create}) => {

    const [habit, setHabit] = useState({
        name: "",
        description: "",
        dayTime: "",
        isCurrent: false
    })

    const [currentDayTime, setCurrentDayTime] = useState(habit.dayTime);

    const addNewHabit = (e) => {
        e.preventDefault();

        if(habit.name && habit.dayTime) {
            const newHabit = {
                id: Date.now(),
                ...habit
            };

            create({...newHabit});

            setHabit({
            name: "",
            description: "",
            dayTime: "",
            isCurrent: false
            });
        }
    }

    useEffect(() => setCurrentDayTime(habit.dayTime), [habit]);

    console.log(habit);

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
                        className={currentDayTime === "morning" 
                            ? "dayTimeSelection dayTimeSelection__current" 
                            : "dayTimeSelection"
                        }
                        onClick={() => setHabit({...habit, dayTime: "morning"})}
                    >
                    Утро
                    </span>
                    <span 
                        className={currentDayTime === "day"
                            ? "dayTimeSelection dayTimeSelection__current"
                            : "dayTimeSelection"
                        }
                        onClick={() => setHabit({...habit, dayTime: "day"})}
                    >
                    День
                    </span>
                    <span 
                        className={currentDayTime === "evening" 
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