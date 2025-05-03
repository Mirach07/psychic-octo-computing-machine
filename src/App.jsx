import React, { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import './styles/App.css';
import MyButton from './components/UI/Button/MyButton';
import MyModal from './components/UI/Modal/MyModal';

function App() {

  const [habitsArr, setHabitsArr] = useState([{name: "бегит", description: "", dayTime: "morning", isCurrent: true}]);
  const [currentTask, setCurrentTask] = useState(habitsArr.find(obj => obj.isCurrent === true));
  const [modal, setModal] = useState(false);
  
  console.log(habitsArr);

  const createHabit = (newHabit) => {
    setHabitsArr([...habitsArr, newHabit]);
    setModal(false);
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
        onClick={() => setModal(true)}
      >Добавить привычку
      </MyButton>

      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <HabitForm create={createHabit}/>
      </MyModal>
    </>
  )
}

export default App
