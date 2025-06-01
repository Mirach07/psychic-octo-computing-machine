import React, { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import './styles/App.css';
import MyButton from './components/UI/Button/MyButton';
import MyModal from './components/UI/Modal/MyModal';
import HabitList from './components/HabitList';
import { HabitArrContext } from './context';
import { usePersistedState } from './hooks/usePersistedState';

function App() {

  const [habitsArr, setHabitsArr] = usePersistedState("allHabits", [{
    name: "бегит",
    description: "",
    dayTime: "morning",
    isCurrent: true,
    isDone: false,
    query: 1,
    id: Date.now()
  }])

  const compareLists = (oldList, newList) => {
    if(JSON.stringify(oldList) !== JSON.stringify(newList))
      return true;
    else
      return false;
  }

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

    if (compareLists(habitsArr, fullySortedHabitList)) {
      setHabitsArr(fullySortedHabitList);
    };
  }
  
  const [currentTask, setCurrentTask] = useState(habitsArr.find(obj => obj.isCurrent === true));
  const [modalNewHabit, setModalNewHabitNewHabit] = useState(false);
  const [modalHabitList, setModalHabitList] = useState(false);

  const createHabit = (newHabit) => {
    setHabitsArr([...habitsArr, newHabit]);
    setModalNewHabitNewHabit(false);
  }

  const closeModal = (closeModal) => {
    if(closeModal)
      setModalNewHabitNewHabit(false);
  }

  const findFirstUndoneTaskIndex = () => {
    const firstUndoneTaskIndex = habitsArr.findIndex(obj => obj.isDone === false);
    return firstUndoneTaskIndex;
  }

  const findCurrentTaskIndex = () => {
    const currentTaskIndex = habitsArr.findIndex(obj => obj.isCurrent === true);
    return currentTaskIndex;
  }

  const setNewCurrentTask = () => {
    const firstUndoneTaskIndex = findFirstUndoneTaskIndex();
    const currentTaskIndex = findCurrentTaskIndex();
    const newHabitsArr = [...habitsArr];

    if (firstUndoneTaskIndex !== -1) {
      if(currentTaskIndex > firstUndoneTaskIndex) {
        newHabitsArr[currentTaskIndex].isCurrent = false;
        newHabitsArr[firstUndoneTaskIndex].isCurrent = true;

        setHabitsArr(newHabitsArr);
        setCurrentTask(habitsArr.find(obj => obj.isCurrent === true));

      } else if(currentTaskIndex === -1) {
        newHabitsArr[firstUndoneTaskIndex].isCurrent = true;

        setHabitsArr(newHabitsArr);
        setCurrentTask(habitsArr.find(obj => obj.isCurrent === true));

      }
    } else if(currentTaskIndex === -1) {
      setCurrentTask(null);
    }
  }

  //handleCompletition - finds CurrentTask, sets it's isCurrent to true 
  //then finds first task that isn't done, sets it to current
  const handleCompletition = () => {

    const oldCurrent = habitsArr.findIndex(obj => obj.isCurrent === true)

    if(oldCurrent !== -1) {
      const newList = [...habitsArr];

      newList[oldCurrent].isCurrent = false;
      newList[oldCurrent].isDone = true;

      const newCurrent = findFirstUndoneTaskIndex();

      if(newCurrent !== -1) {
        newList[newCurrent].isCurrent = true;
        setHabitsArr(newList);
        setCurrentTask(habitsArr[newCurrent]);
      } else {
        setHabitsArr(newList);
        setCurrentTask(null);
      }
    }
  }

  useEffect(() => {
    habitsArr.map((habit) => {
      if (habit.isCurrent && habit.isDone) {
        handleCompletition();
      }
    })
    setNewCurrentTask();
    sortHabitsArr(habitsArr);
  }, [habitsArr]);

  

  console.log("Список привычек:");
  console.log(habitsArr);
  console.log("Текущая привычка:");
  console.log(currentTask);
  
  return (
    <>
      <div
        className='currentHabit'
        onClick={(event) => {
          event.preventDefault();
          handleCompletition()
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