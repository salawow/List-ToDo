const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { restart } = require("nodemon");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todolist

app.post("/todo", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//get all todolist

app.get("/todo", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todolist

app.get("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [ id ])
        res.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

//update a todolist

app.put("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2", [ description,  id ])
        res.json("Todo was updated!");

    }  catch (err) {
         console.error(err.message);
    }
    });

//delete a todolist

app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [ id ]);
        res.json("Todo was deleted!");
        
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("Servidor iniciado en el puerto 5000");
});