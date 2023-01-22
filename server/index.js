const express = require('express');
const cors = require('cors');
const sequelize = require('./db.js');
const { Todo } = require('./models/models.js');

const app = express();
//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await Todo.create({ description });
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await Todo.findAll();
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id },
    });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await Todo.upsert({
      id,
      description: description,
    });
    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.destroy({
      where: { id: id },
    });
    res.json('Todo was deleted!');
  } catch (err) {
    console.log(err.message);
  }
});

const start = async () => {
  try {
    app.listen(5000, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('Server OK (5000)');
    });
    await sequelize
      .authenticate()
      .then(() => console.log('DB ok'))
      .catch((err) => console.log('Error connecting', err));
    await sequelize.sync();
  } catch (err) {
    console.log(err);
  }
};

start();
