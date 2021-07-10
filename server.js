const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true  });

app.get("/", (req, res) => {
  res.send(index.html);
});

app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.get("/exercise", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.json(err);
  });
});

app.put("/exercise/:id", function(req, res) {
    if (error) {
      console.log(error);
    }
    else {
    const newExercise = req.body;
    const exerciseLists = found[0].exercises;
    exerciseLists.push(newExercise);
    db.Workout.updateOne(
      { 
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $set : { exercises: exerciseLists }
      },
      (error, edited) => {
        if (error){
          console.log(error);
        } else {
          res.send(edited);
        }
      }
    )
  }
});


app.post("/exercise", (req, res) => {
  db.Workout.create({})
  .then(data => {
      res.json(data);
  });
});

app.get("/workouts/range", (req, res) =>{
  db.Workout.find({})
  .then(dbWorkout => {
    while(dbWorkout.length > 7){
      let wout = db.Workout.shift()
    }
    res.json(dbWorkout)
  })
})


// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});