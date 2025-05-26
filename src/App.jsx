import React, { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import './styles/App.css';
import MyButton from './components/UI/Button/MyButton';
import MyModal from './components/UI/Modal/MyModal';
import HabitList from './components/HabitList';
import { HabitArrContext } from './context';

function App() {

  const [habitsArr, setHabitsArr] = useState([{
    name: "бегит",
    description: "",
    dayTime: "morning",
    isCurrent: true,
    isDone: false,
    query: 1,
    id: Date.now()
  }]);

  
  
  const [currentTask, setCurrentTask] = useState(habitsArr.find(obj => obj.isCurrent === true));
  const [modalNewHabit, setModalNewHabitNewHabit] = useState(false);
  const [modalHabitList, setModalHabitList] = useState(false);
  
  console.log("Список привычек:");
  console.log(habitsArr);

  const createHabit = (newHabit) => {
    setHabitsArr([...habitsArr, newHabit]);
    setModalNewHabitNewHabit(false);
  }

  const closeModal = (closeModal) => {
    if(closeModal)
      setModalNewHabitNewHabit(false);
  }

  const handleCompleting = () => {

    const prevCurrent = habitsArr.findIndex(obj => obj.isCurrent === true);

    if(prevCurrent !== -1) {
      const updatedHabits = habitsArr.map((habit, index) => {
        if (index === prevCurrent) {
          return { ...habit, isCurrent: false, isDone: true };
        } else if (index === prevCurrent + 1) {
          return { ...habit, isCurrent: true };
        }
        return habit;
      });
      setHabitsArr(updatedHabits);
    }
  }

  useEffect(() => {
    setCurrentTask(habitsArr.find(obj => obj.isCurrent === true));

    habitsArr.map((habit) => {
      if (habit.isCurrent && habit.isDone) {
        handleCompleting();
      }
    })

    if (habitsArr.findIndex(habit => habit.isCurrent === true) === -1) {
      const AintNoDoneYet = habitsArr.findIndex(habit => habit.isDone === false);

      if (AintNoDoneYet !== -1) {
        const newHabitsArr = habitsArr.map((habit, index) =>
          index === AintNoDoneYet ? { ...habit, isCurrent: true } : habit
        );
        setHabitsArr(newHabitsArr);
      }
    }

  }, [habitsArr.isCurrent, habitsArr.isDone]);

  useEffect(() => {
    const sortHabitsArr = (habitsArr) => {

      const sortAlgorithm = (a, b) => {
        if(a.query < b.query) return -1;
        if(a.query > b.query) return 1;
        return 0;
      }

      const morningHabits = habitsArr.filter(habit => habit.dayTime === 'morning');
      const dayHabits = habitsArr.filter(habit => habit.dayTime === 'day');
      const eveningHabits = habitsArr.filter(habit => habit.dayTime === 'evening');

      const morningHabitsSorted = morningHabits.sort(sortAlgorithm);
      const dayHabitsSorted = dayHabits.sort(sortAlgorithm);
      const eveningHabitsSorted = eveningHabits.sort(sortAlgorithm);

      const fullySortedHabitList = [...morningHabitsSorted, ...dayHabitsSorted, ...eveningHabitsSorted];

      const newJson = JSON.stringify(fullySortedHabitList);
      const oldJson = JSON.stringify(habitsArr);
      if (newJson !== oldJson) {
        setHabitsArr(fullySortedHabitList);
      };
    }
    sortHabitsArr(habitsArr);
  }, [habitsArr])
  
  return (
    <>
      <div
        className='currentHabit'
        onClick={(event) => {
          event.preventDefault();
          handleCompleting()
        }}
        >
        {currentTask ? currentTask.name : "Всё!"}
      </div>

      <MyButton
        onClick={() => setModalNewHabitNewHabit(true)}
      >Добавить привычку
      </MyButton>

      <MyModal
        visible={modalNewHabit}
        setVisible={setModalNewHabitNewHabit}
      >
        <HabitArrContext.Provider value={[habitsArr, setHabitsArr]}>
          <HabitForm closeModal={closeModal}/>
        </HabitArrContext.Provider>
      </MyModal>

      <MyButton
        onClick = {() => setModalHabitList(true)}
      >
        Все привычки
      </MyButton>

      <MyModal
        visible={modalHabitList}
        setVisible={setModalHabitList}
      >
        <HabitArrContext.Provider value={[habitsArr, setHabitsArr]}>
          <HabitList
            habits={habitsArr}
          />
        </HabitArrContext.Provider>
      </MyModal>
    </>
  )
}
export default App