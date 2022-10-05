import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { instance } from "../utilities/config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Todo.css";

function Todo() {
    const [todoList, setTodoList] = useState([]);
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



    const deleteTodo = (id) => {
        return instance.delete(`/todos/${id}`, 
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log(response);
            toast.success("Deleted Successfully");
            getTodos();
         })
        .catch((error) => { 
            console.error(error);
            toast.error("Something went wrong!")
        })
    }

    const redirectToUpdate = (id) => {
        console.log(id);
        setToId(id);
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

                            todoList.length === 0 ? <div style={{textAlign: "center",
                                marginTop: "60px" }}>No Todo's, Create Some!</div>
                            :
                            todoList.map(todo => (
                                <div className="todo-list" key={todo.todo_id}>
                                    <div className="id">{todo.todo_id}</div>
                                    <div className="title">{todo.title}</div>
                                    <div className="is_complete">
                                    <label>
                                    <input className="checkbox" type="checkbox" readOnly={true} value={todo.is_complete} checked={todo.is_complete} name="is_complete"/>
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
             <ToastContainer />
        </div>
    )
}

export default Todo;