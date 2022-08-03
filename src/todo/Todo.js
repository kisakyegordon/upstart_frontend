import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { instance } from "../utilities/config.js";
import "./Todo.css";

function Todo() {
    const [todoList, setTodoList] = useState([
        {id: 1, name: "life", isComplete: true},
        {id: 2, name: "dreams", isComplete: false}
    ]);
    const [toId, setToId] = useState(null);

    let navigate = useNavigate();

    useEffect( () => {
        getTodos();
        
    }, [])

    const getTodos = () => {
        return instance.get('/todos/', 
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log("response", response);
            setTodoList(response.data.data);
         })
        .catch((error) => { console.error(error); })
    }

    const getTodo = (id) => {
        return instance.post(`/todos/${id}`, {})
        .then((response) => { 
         })
        .catch((error) => { console.error(error); })
    }

    const createTodo = (title, is_complete) => {
        return instance.post('/todos/create', {title, is_complete})
        .then((response) => { 
         })
        .catch((error) => { console.error(error); })
    }

    const updateTodo = (id, title, is_complete) => {
        return instance.post(`/todos/${id}`, {title, is_complete, params: {id}})
        .then((response) => { 
         })
        .catch((error) => { console.error(error); })
    }

    const deleteTodo = (id) => {
        return instance.delete(`/todos/${id}`, 
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log(response);
            getTodos();
         })
        .catch((error) => { console.error(error); })
    }

    const redirectToUpdate = (id) => {
        console.log(id);
        setToId(id);
        // <Navigate to={{ pathname: `/todos/${id}` }} />
    }

    const triggerComplete = (id) => {
        let tempIndex = todoList.findIndex(todo => todo.todo_id === id);
        let newTodos = [...todoList];
        newTodos[tempIndex].is_complete = !newTodos[tempIndex].is_complete;
        setTodoList(newTodos);
    }

    return (
        <div >
            {
                toId ?
                <Navigate to={{pathname: `/todos/${toId}`}}/>
                :  
                <div>
                    <div className="todo_header">
                        <div className="todo_header_inside">
                            <div className="todo_header_id">Id</div>
                            <div className="todo_header_title">Title</div>
                            <div className="todo_header_is_complete">Is Complete</div>
                            <div className="todo_header_buttons" onClick={() => navigate("/todos/create")}>Create Todo</div>
                        </div>
                    </div>
                                
                    <div className="todo_container">
                        {
                            todoList.map(todo => (
                                <div className="todo-list" key={todo.id}>
                                    <div className="id">{todo.todo_id}</div>
                                    <div className="title">{todo.title}</div>
                                    <div className="is_complete">
                                    <label>
                                    <input className="checkbox" type="checkbox" value={todo.is_complete} checked={todo.is_complete} name="is_complete"/>
                                    </label>
                                        {/* { todo.is_complete ? <div onClick={() => triggerComplete(todo.todo_id)}>*</div> : <div onClick={() => triggerComplete(todo.todo_id)}>-</div> } */}
                                        </div>
                                    <div className="buttons"> 
                                        <button className="btn-update" onClick={() => redirectToUpdate(todo.todo_id)}>update</button>
                                        <button className="btn-delete" onClick={() => deleteTodo(todo.todo_id)}>delete</button>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Todo;