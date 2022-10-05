import React, { useEffect, useState } from "react";
import { instance } from "../utilities/config.js";
import { useParams} from "react-router";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoItem() {
    const [todoItem, setTodoItem] = useState({});

    let navigate = useNavigate();

    let {id} = useParams();

    useEffect( () => {
        console.log("props", id)

        getTodo(id);
        
    }, [id])

    const getTodo = (id) => {
        return instance.get(`/todos/${id}`, 
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log(response);
            setTodoItem(response.data.data[0]);
         })
        .catch((error) => { console.error(error); })
    }

    const onChange = (e) => {
        if(e.target.name === "title") {
            setTodoItem( prev => {
                return { ...prev, title: e.target.value };
            });
        } else if(e.target.name === "is_complete") {
            setTodoItem(prev => {
                return {...prev, is_complete: !prev.is_complete};
            });
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("update: ", todoItem);
        updateTodo(todoItem.todo_id, todoItem.title, todoItem.is_complete);
    }

    const updateTodo = (id, title, is_complete) => {
        return instance.patch(`/todos/${id}`, {title, is_complete, params: {id}},
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log(response);
            toast.success("Updated Successfully");
         })
        .catch((error) => { 
            console.error(error);
            toast.error("Something went wrong!")
        })
    }


    return (
        <div>
            <div className="todo_header">
                <div className="todo_header_inside">
                <div className="todo_header_buttons" onClick={() => navigate("/todos")}>{"Back To Lists"}</div>
                    <div className="todo_header_id"></div>
                    <div className="todo_header_title" style={{
                        fontWeight: "bold", color: "#444", fontSize: "20px"
                    }}>Edit Todo</div>
                    <div className="todo_header_is_complete"></div>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="edit_container">
                    <div>
                        <label>Title </label>
                        <input className="title" type="text" value={todoItem.title} onChange={onChange} name='title'/>
                    </div>

                    <div>
                        <label>
                        Is Complete{" "}
                        <input className="checkbox" type="checkbox" value={todoItem.is_complete} checked={todoItem.is_complete} onChange={onChange} name="is_complete"/>
                        </label>
                    </div>

                    <div>
                        <button className="submit" label="Submit" type="submit" onChange={onSubmit} >Submit</button>
                    </div>
                </div>
            </form>  
            <ToastContainer />
        </div>
    )

}

export default TodoItem;