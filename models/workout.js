const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
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
        require: "Distance is required"
    },

    duration: {
        type: Number,
        trim: true,
        required: "Duration required"
    },

    weight: {
        type: Number,
        trim: true,
        require: "Weight is required"
    },

    reps: {
        type: Number,
        trim: true,
        require: "Reps is required"
    },

    sets: {
        type: Number,
        require: "Sets is required"
    }
    }],

})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;