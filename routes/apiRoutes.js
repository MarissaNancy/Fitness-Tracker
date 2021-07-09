//statshtml api js is linked line40

app.get("/workout", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.put

app.post("/workout", (req, res) => {
    db.Workout.create({})
    .then(data => {
        res.json(data);
    });
});

