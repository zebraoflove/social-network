import {profileAPI, ResultCodesEnum} from "../API/API";
import {PhotosType, PostType, ProfileType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"
const SET_AVATAR = "SET-AVATAR"
type InitialStateType = {postsData: Array<PostType>, userProfile: object | null, status: string | null}
type AddPostActionType = {type: typeof ADD_POST, newPost: string}
type SetUserProfileActionType = {type: typeof SET_USER_PROFILE, userProfile: ProfileType}
type SetStatusActionType = {type: typeof SET_STATUS, status: string}
type SetAvatarActionType = {type: typeof SET_AVATAR, photos: PhotosType}
type ActionType = AddPostActionType | SetUserProfileActionType | SetStatusActionType | SetAvatarActionType
let initialState: InitialStateType = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likes: 20},
        {id: 2, message: "It's my first post", likes: 5},
        {id: 3, message: "Have a nice day!", likes: 14}
    ],
    userProfile: null,
    status: ""
}
const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
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
export const getUserProfile = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        alert('Error in updating status')
    }
}
export const saveAvatar = (file: File): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let response = await profileAPI.updateAvatar(file)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAvatar(response.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch, getState) => {
    let data = await profileAPI.updateProfileInfo(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
        const id = getState().auth.id
        if(id) dispatch(getUserProfile(id))
    } else {
        alert(data.messages[0])
    }
}
export default profileReducer