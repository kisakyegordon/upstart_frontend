import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Todo from "./todo/Todo";
import TodoItem from "./todo/TodoItem";
import CreateTodo from './todo/CreateTodo';
import Nav from './nav/Nav';
import PrivateRoute from './utilities/PrivateRoute.js';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/todos"
            element={localStorage.getItem('token') ? <Todo /> :  <Navigate to={{
              pathname: '/login',
            }} />}
            />
            <Route 
            path="/todos/create"
            element={localStorage.getItem('token') ? <CreateTodo /> :  <Navigate to={{
              pathname: '/login',
            }} />}
            />
          <Route exact path="/todos/:id"
          element={localStorage.getItem('token') ? <TodoItem /> :  <Navigate to={{
            pathname: '/login',
          }} />}
          />
          {/* render={() => <div>Home</div>} */}
          {/* <PrivateRoute path="/todo/:id" element={<TodoItem />} /> */}
      </Routes>

    </div>
  );
}

export default App;
