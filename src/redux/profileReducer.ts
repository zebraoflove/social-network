import {profileAPI} from "../API/API";
import {PhotosType, PostType, ProfileType} from "../Types/types";
const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"
const SET_AVATAR = "SET-AVATAR"
type InitialStateType = {postsData: Array<PostType>, userProfile: object | null, status: string | null}
type AddPostActionType = {type: typeof ADD_POST, newPost: string}
type SetUserProfileActionType = {type: typeof SET_USER_PROFILE, userProfile: ProfileType}
type SetStatusActionType = {type: typeof SET_STATUS, status: string}
type SetAvatarActionType = {type: typeof SET_AVATAR, photos: PhotosType}
let initialState: InitialStateType = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likes: 20},
        {id: 2, message: "It's my first post", likes: 5},
        {id: 3, message: "Have a nice day!", likes: 14}
    ],
    userProfile: null,
    status: ""
}
const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {id: (state.postsData.length) + 1, message: action.newPost, likes: 0}
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
        case SET_AVATAR: {
            return {...state, userProfile: {...state.userProfile, photos: action.photos}}
        }
        default: {
            return state
        }
    }
}
export const addPost = (newPost: string): AddPostActionType => ({type: ADD_POST, newPost})
export const setUserProfile = (userProfile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, userProfile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const setAvatar = (photos: PhotosType): SetAvatarActionType => ({type: SET_AVATAR, photos})
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        alert('Error in updating status')
    }
}
export const saveAvatar = (file: object) => async (dispatch: any) => {
    let response = await profileAPI.updateAvatar(file)
    if (response.data.resultCode === 0) {
        dispatch(setAvatar(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    let response = await profileAPI.updateProfileInfo(profile)
    if (response.data.resultCode === 0) {
        const id = getState().auth.id
        dispatch(getUserProfile(id))
    } else {
        alert(response.data.messages[0])
    }
}
export default profileReducer