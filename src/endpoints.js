import axios from "axios";

const signin = (email, password) => {
    return instance.post('/signin', {
        email,
        password
    })
    .then((response) => { 
        localStorage.setItem('token', response.body.access_token );
        setIsAuthenticated(true);
     })
    .catch((error) => { console.error(error); })
}

const register = (email, password) => {

}

const createTodo = (title, is_complete) => {}
const getTodo = (id) => {
    axios.get(`${BASE_url}/api/v1/todos/${id}`)
    .then((response) => response)
    .catch((error) => {});
}
const getTodos = (title, is_complete) => {}
const updateTodo = (title, is_complete) => {}
const deleteTodo = (title, is_complete) => {}




export {
    signin,
    register,
}