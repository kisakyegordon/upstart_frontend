import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5005/api/v1',
    headers: {'Access-Control-Allow-Origin': '*'}
})
export {
    instance
}