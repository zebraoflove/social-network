import {authAPI} from "../API/API";

const SET_FETCHED = "SET-FETCHED"
const SET_USER_DATA = "SET-USER-DATA"

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetched: true
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case SET_FETCHED: {
            return {...state, isFetched: action.isFetched}
        }
        default: {
            return state
        }
    }
}
export const setFetched = (isFetched) => ({type: SET_FETCHED, isFetched})
export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
export const authUser = () => async (dispatch) => {
    dispatch(setFetched(true))
    let response = await authAPI.authUser()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setUserData(id, email, login, true))
    }
    dispatch(setFetched(false))
    return response
}
export const loginUser = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.loginUser(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authUser())
    } else alert("Warning")
}
export const logoutUser = () => async (dispatch) => {
    let response = await authAPI.logoutUser()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    } else alert("Warning")
}
export default authReducer