import React, { useEffect, useState } from "react";
import { instance } from "../utilities/config.js";
import { useParams} from "react-router";
import { Link, useNavigate } from "react-router-dom";
import "./Todo.css";

function TodoItem(props, {todoItemId}) {
    const [todoItem, setTodoItem] = useState({});
    const [title, setTitle] = useState("");
    const [is_complete, setIsComplete] = useState(false);

    let navigate = useNavigate();

    let {id} = useParams();

    useEffect( () => {
        // let {id} = useParams();
        console.log("props", id)

        getTodo(id);
        
    }, [todoItemId])



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
            // setIsComplete(!is_complete);
            setTodoItem(prev => {
                return {...prev, is_complete: !prev.is_complete};
            });
        }
    }

    const onSubmit = (event) => {
        // let todoItemId = this.props.match.params.id;
        event.preventDefault();
        console.log("update: ", todoItem);
        updateTodo(todoItem.todo_id, todoItem.title, todoItem.is_complete);
    }

    // const createTodo = (title, is_complete) => {
    //     return instance.post('/todos/create', {title, is_complete})
    //     .then((response) => { 
    //      })
    //     .catch((error) => { console.error(error); })
    // }

    const updateTodo = (id, title, is_complete) => {
        return instance.patch(`/todos/${id}`, {title, is_complete, params: {id}},
        {
            headers: { 'Content-Type': 'application/json',
            token:localStorage.getItem('token'),
         },
        })
        .then((response) => { 
            console.log(response);
         })
        .catch((error) => { console.error(error); })
    }

    // const deleteTodo = (id) => {
    //     return instance.post(`/todos/${id}`, {})
    //     .then((response) => { 
    //      })
    //     .catch((error) => { console.error(error); })
    // }

    // const triggerComplete = (id) => {
    //     let tempIndex = todoList.findIndex(todo => todo.id === id);
    //     let newTodos = [...todoList];
    //     newTodos[tempIndex].isComplete = !newTodos[tempIndex].isComplete;
    //     setTodoList(newTodos);
    // }
    const handleBack = () => {
        console.log("Back");
        // this.props.history.goBack();
    }


    return (
        <div>
            {
                // todoList.map(todo => (
                // <div key={todoItem.id}>
                //     <div>{ todoItem.is_complete ? <div onClick={() => triggerComplete(todoItem.id)}>*</div> : <div onClick={() => triggerComplete(todoItem.id)}>-</div> }</div>
                //     <div>{ todoItem.id }</div>
                //     <div>{ todoItem.name }</div>
                //     <div> 
                //         <button onClick={() => updateTodo(todoItem.id)}>update</button>
                //         <button onClick={() => deleteTodo(todoItem.id)}>delete</button>
                //     </div>
                // </div>
                // ))
            }
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
        </div>
    )

}

export default TodoItem;