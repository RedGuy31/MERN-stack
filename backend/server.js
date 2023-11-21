require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`DB connected & runing on PORT:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
