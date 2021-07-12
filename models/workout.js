const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: ()=> new Date()
    },
    exercises: [{
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

    distance: {
        type: Number,
        trim: true,
    },

    duration: {
        type: Number,
        trim: true,
        required: "Duration required"
    },

    weight: {
        type: Number,
        trim: true,
    },

    reps: {
        type: Number,
        trim: true,
    },

    sets: {
        type: Number,
    }
    }],

})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;