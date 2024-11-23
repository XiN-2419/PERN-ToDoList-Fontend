import React, {Fragment, useEffect, useState} from "react";

import EditTodo from "./editTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`https://pern-todolist-backend.onrender.com/todos/${id}`,{
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    //get todo
    const getTodos = async () => {
        try {
            const response = await fetch("https://pern-todolist-backend.onrender.com/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    },[]);
    
    return (
    <Fragment>
        {" "}
        <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>待辦事項</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            { todos == "" ? 
                <div className="mt-5">
                    <span class="spinner-border me-4 " role="status" aria-hidden="true"></span>
                    <span className="fs-4 fw-bold">後端啟動中</span>
                    <span className="fs-6 text-muted">(約需兩分鐘)</span>
                </div>
                : 
                todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo} />
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>刪除</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>);
}

export default ListTodos;