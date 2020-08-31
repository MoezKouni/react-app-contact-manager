import { GET_USERS, DELETE_USER, UPDATE_USER, ADD_USER, ERROR_LOADING_USERS, GET_ALL_USERS } from './types'
import axios from 'axios'

// get all people of the connected user
export const getUsers = () => dispatch => {
    axios.get('/person')
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERROR_LOADING_USERS,
                payload: err.response.data
            })
        })
}
// get public people
export const getPublicUsers = () => dispatch => {
    axios.get('/person/public')
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERROR_LOADING_USERS,
                payload: err.response.data
            })
        })
}


export const editUser = user => dispatch => {
    axios.put(`/person/${user._id}`, user)
        .then(() => {
            dispatch({
                type: UPDATE_USER,
                payload: user
            })
            dispatch(getUsers)
        })
        .catch(err => {
            dispatch({
                type: ERROR_LOADING_USERS,
                payload: err.response.data
            })
        })
}


// Add User
export const addUser = user => dispatch => {
    axios.post('/person', user)
        .then(res => {
            dispatch({
                type: ADD_USER,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERROR_LOADING_USERS,
                payload: err
            })
        })
}
// Delete User
export const deleteUser = id => dispatch => {
    axios.delete(`/person/${id}`)
        .then(() => {
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type: ERROR_LOADING_USERS,
                payload: err.response.data
            })
        })
}
