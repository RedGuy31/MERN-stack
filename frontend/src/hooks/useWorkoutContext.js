import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutsContext";

export const useWorkoutsContext = function () {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      `useWorkoutContext can not be used outside an WorkoutsContextProvider , Check the CODE `
    );
  }

  return context;
};
