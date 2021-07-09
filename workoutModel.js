const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Type of workout required"
    },

    name: {
        type: String,
        trim: true,
        required: "Name of exercise required"
    },

    duration: {
        type: Number,
        trim: true,
        required: "Duration required"
    },

    weight: {
        type: Number,
    },

    reps: {
        type: Number,
    },

    sets: {
        type: Number,
    },

})

// type: "resistance",
// name: "Bicep Curl",
// duration: 20,
// weight: 100,
// reps: 10,
// sets: 4

const Workout = mongoose.model("Workout", WorkoutSchema);