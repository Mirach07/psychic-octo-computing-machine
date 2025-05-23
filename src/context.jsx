import { useState, createContext } from "react";

export const HabitArrContext = createContext(undefined);
export const HabitItemContext = createContext(undefined);

export default function HabitArrProvider({ children }) {

    const [habitsArr, setHabitsArr] = useState([])

    return (
        <HabitArrContext.Provider value={[habitsArr, setHabitsArr]}>
            {children}
        </HabitArrContext.Provider>
    )
}

export const useHabitListContext = () => {
    
}