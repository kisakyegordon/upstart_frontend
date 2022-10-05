import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../utilities/config.js";
import "./Todo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateTodo(props, {todoItemId}) {
    const [title, setTitle] = useState("");
    const [is_complete, setIsComplete] = useState(false);

    let navigate = useNavigate();

    useEffect( () => {

        getTodo(todoItemId);
        
    }, [todoItemId])

    const getTodo = (id) => {
        return instance.post(`/todos/${id}`, {})
        .then((response) => { 
         })
        .catch((error) => { console.error(error); })
    }

    const onChange = (e) => {
        if(e.target.name === "title") {
            setTitle(e.target.value);
        } else if(e.target.name === "is_complete") {
            setIsComplete(!is_complete);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setTitle("");
        setIsComplete(false);
        console.log("update: ", title, is_complete, props);
        createTodo(title, is_complete);
    }

    const createTodo = (title, is_complete) => {
        return instance.post('/todos/create', {title, is_complete},
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log("Created", response)
            toast.success("Created Succesfully");
         })
        .catch((error) => { 
            console.error("sorry: ", error); 
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
                    }}>Create Todo</div>
                    <div className="todo_header_is_complete"></div>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="edit_container">
                    <div>
                        <label>Title </label>
                        <input className="title" type="text" value={title} onChange={onChange} name='title'/>
                    </div>

                    <div>
                        <label>
                        Is Complete{" "}
                        <input className="checkbox" type="checkbox" value={is_complete} checked={is_complete} onChange={onChange} name="is_complete"/>
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

export default CreateTodo;