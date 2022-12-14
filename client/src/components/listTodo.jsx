import React, { Fragment, useEffect, useState } from "react";

import EditTodos from "./editTodo";

const ListTodos = () => {

    const [todo, setTodo] = useState([]);

    //Delete method

    const deleteTodo = async (id) => {
        try {
            
            const deleteTodo = await fetch(`http://localhost:5000/todo/${id}`, {
                method: "DELETE"
            });
            setTodo(todo.filter(todo => todo.todo_id !== id));
            } catch (err) {
                console.error(err.message);
            }
        };

    const getTodos = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/todo")
            const jsonData = await response.json();

            setTodo(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTodos();
    },[]);
    console.log(todo);
    return <Fragment><table className="table mt-5 text-ceter">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
<tr>*/}
    {todo.map(todo => (
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td>
                <EditTodos  todo = {todo}/>
            </td>
            <td>
                <button className="btn btn-danger"
                onClick={() => deleteTodo(todo.todo_id)}>
                    Delete
                </button>
            </td>
        </tr>
    ))}
    </tbody>
  </table></Fragment>
};

export default ListTodos;