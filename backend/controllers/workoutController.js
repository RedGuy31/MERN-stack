const { default: mongoose } = require("mongoose");
const Workout = require("../model/workoutModel");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {}
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout (ID)" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let empytFields = [];
  if (!title) {
    empytFields.push("title");
  }
  if (!load) {
    empytFields.push("load");
  }
  if (!reps) {
    empytFields.push("reps");
  }
  if (empytFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Please fill in all fields`, empytFields });
  }

  try {
    const user_id = req.user._id;

    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message, empytFields });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout (ID)" });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout (ID)" });
  }
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!workout) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
