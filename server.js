const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,  });

app.get("/", (req, res) => {
  res.send(index.html);
});

app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { 
          $sum: "$exercises.duration"
        }
      }
    }
  ])
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.json(err);
  });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
 db.Workout.findOneAndUpdate(
      {_id: req.params.id},
      {
          $push: {
              exercises: req.body
          },
      },
      { new: true })//if new which yes
  .then(dbWorkout => {
      res.json(dbWorkout)
  })
  .catch(err => {
      res.json(err)
  })
})


app.post("/api/workouts", (req, res) =>{
  db.Workout.create({})
  .then(newWorkout => {
    console.log(newWorkout);
    res.json(newWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//in range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { 
          $sum: "$exercises.duration"
        }
      }
    }
  ])
  .limit(7)
  .then(newWorkout => {
    res.json(newWorkout);
  }).catch(err => {
    res.json(err);
  });
});

app.delete("/api/workouts/:id", (req, res) =>{
  db.Workout.findByIdAndDelete( req.params.id)
  .then(deletedWorkout => {
    res.json(deletedWorkout);
  }).catch(err => {
    res.json(err);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});