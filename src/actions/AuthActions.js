import axios from 'axios'
import setTokenHeader from '../utils/setTokenHeader'
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'

// Register User
export const register = data => dispatch => {
    axios.post('/register', data)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
        })
}

// Load user
export const loadUser = () => dispatch => {
    if(localStorage.token){
        setTokenHeader(localStorage.token)
    }
    axios.get('/login')
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(() => dispatch({
            type: AUTH_ERROR
        }))
 }

// Login User
export const login = data => dispatch => {
    axios.post('/login', data)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
        })
        .catch(err => dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        }))
}

// Logout User
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
