import {profileAPI} from "../API/API";

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"
let initialState = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likes: 20},
        {id: 2, message: "It's my first post", likes: 5},
        {id: 3, message: "Have a nice day!", likes: 14}
    ],
    userProfile: null,
    status: ""
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {id: (state.postsData.length) + 1, message: action.newPost, likes: 0}
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {...state, userProfile: action.userProfile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default: {
            return state
        }
    }
}
export const addPost = (newPost) => ({type: ADD_POST, newPost})
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export default profileReducer