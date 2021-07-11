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


//this one too
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.json(err);
  });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  db.Workout.create(req.body)
  .then((data) => db.Workout.findOneAndUpdate(
      {_id: req.params.id},
      {
          $push: {
              exercises: data._id
          },
          $inc: {//increments
              totalDuration: data.duration
          }
      },
      { new: true })//if new which yes
  )
  .then(dbWorkout => {
      res.json(dbWorkout)
  })
  .catch(err => {
      res.json(err)
  })
})


//this works 

app.post("/api/workouts", (req, res) =>{
  db.Workout.create({day: Date.now()})
  .then(newWorkout => {
    res.json(newWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//in range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
  .limit(7);
});

// app.delete("/api/workouts/:id", (req, res) =>{
//   db.Workout.findOneAndRemove({ _id: req.params.id}, (err) => {
//     if(err){
//       return(err);
//     } else{
//       return res
//     }
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});