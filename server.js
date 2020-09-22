const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
// required to read the body of our POST, DELETE, & UPDATE requests
app.use(express.json());

// import the database from config folder
const db = config.get('mongoURI')

// FOUR ESSENTIAL DATABASE OPERATIONS
// -----------------------------------
// connect the database using mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// imports AnimalSchema
const Animal = require('./models/Animal');
// variable for a new type of Animal
const newAnimal = new Animal({
  name: 'Red Panda',
  isEndangered: true
})
// ADDS the new animal to our database (check your cluster for updates)
newAnimal
  .save()
  .then(item => console.log(item))
  .catch(err => console.log(err));
// FINDS the new animal (-1 used to order items by creation date from most recent)
Animal.find()
  .sort({date: -1})
  .then(items => console.log(items));
// UPDATES a given object specified by its _id
Animal
  .findOneAndUpdate(
    { _id: '5f57b8bd7b5671a8c0765a5f'},
    { isEndangered: false}
  )
  .then(item => console.log(item));
// DELETES specified object from database
Animal
  .findOneAndDelete(
    { name: 'Red Panda' },
  )
  .then(console.log('item deleted'))

// EXPOSING API ENDPOINTS USING POSTMAN
// -----------------------------------
// DISPLAYS the contents of the database (uses same method above as a callback inside app.get('/'))
app.get('/', (req, res) => {
  Animal
    .find()
    .sort({ date: -1 })
    .then(items => console.log(res.json(items)));
});
// ADDS a new entry
app.post('/', (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    isEndangered: req.body.isEndangered || false,
  });
  newAnimal
    .save()
    .then(item => res.json(item));
});

// DELETES an entry (requires you to include id of object in request URL)
app.delete('/:id', (req, res) => {
  Animal
    .findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false}));
});

// UPDATES an entry (requires you to include id of object in request URL)
app.put('/:id', (req, res) => {
  Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));
