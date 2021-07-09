const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
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

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;