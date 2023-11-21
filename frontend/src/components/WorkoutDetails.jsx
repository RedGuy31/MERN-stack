import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handlerClick = async () => {
    if (!user) {
      return;
    }

    const respone = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await respone.json();
    if (respone.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load(KG):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handlerClick}>
        DELETE
      </span>
    </div>
  );
}

export default WorkoutDetails;
