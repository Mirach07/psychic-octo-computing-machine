import React, { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import './styles/App.css';
import MyButton from './components/UI/Button/MyButton';
import MyModal from './components/UI/Modal/MyModal';
import HabitList from './components/HabitList';

function App() {

  const [habitsArr, setHabitsArr] = useState([{name: "бегит", description: "", dayTime: "morning", isCurrent: true}]);
  const [currentTask, setCurrentTask] = useState(habitsArr.find(obj => obj.isCurrent === true));
  const [modalNewHabit, setModalNewHabitNewHabit] = useState(false);
  const [modalHabitList, setModalHabitList] = useState(false);
  
  console.log(habitsArr);

  const createHabit = (newHabit) => {
    setHabitsArr([...habitsArr, newHabit]);
    setModalNewHabitNewHabit(false);
  }

  const incrementCurrent = (e) => {
    e.preventDefault();
    let updatedHabits;

    const prevCurrent = habitsArr.findIndex(obj => obj.isCurrent === true);

    if(prevCurrent !== -1) {
      updatedHabits = habitsArr.map((habit, index) => {
        if (index === prevCurrent + 1) {
          return { ...habit, isCurrent: true };
        } else {
          return { ...habit, isCurrent: false };
        }
      })
      setHabitsArr(updatedHabits);
    }
  }

  useEffect(() => {
    setCurrentTask(habitsArr.find(obj => obj.isCurrent === true));
  }, [habitsArr]);

  console.log(currentTask);
  
  return (
    <>
      <div
        className='currentHabit'
        onClick={(event) => incrementCurrent(event)}
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
        <HabitForm create={createHabit}/>
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
        <HabitList
          habits={habitsArr}
        />
      </MyModal>
    </>
  )
}

export default App
