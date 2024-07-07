import {profileAPI, ResultCodesEnum} from "../API/API";
import {ContactsType, PhotosType, PostType, ProfileInfoType, ProfileType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
type ActionType = InferActionsTypes<typeof actions>
export const actions = {
    addPost: (newPost: string) => ({type: "SN/PROFILE/ADD-POST", newPost} as const),
    setUserProfile: (userProfile: ProfileType) => ({type: "SN/PROFILE/SET-USER-PROFILE", userProfile} as const),
    setStatus: (status: string) => ({type: "SN/PROFILE/SET-STATUS", status} as const),
    setAvatar: (photos: PhotosType) => ({type: "SN/PROFILE/SET-AVATAR", photos} as const)
}
let initialState = {
    postsData: [
        {id: 1, message: "Hi, how are you?", likes: 20},
        {id: 2, message: "It's my first post", likes: 5},
        {id: 3, message: "Have a nice day!", likes: 14}
    ],
    userProfile: null as ProfileType | null,
    status: ""
}
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST": {
            let newPost: PostType = {id: (state.postsData.length) + 1, message: action.newPost, likes: 0}
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        }
        case "SN/PROFILE/SET-USER-PROFILE": {
            return {...state, userProfile: action.userProfile}
        }
        case "SN/PROFILE/SET-STATUS": {
            return {...state, status: action.status}
        }
        case "SN/PROFILE/SET-AVATAR": {
            if(state.userProfile) return {...state, userProfile: {...state.userProfile, photos: action.photos}}
            else return state
        }
        default: {
            return state
        }
    }
}
export const requestUserProfile = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(response.data))
}
export const requestStatus = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        alert('Error in updating status')
    }
}
export const saveAvatar = (file: File): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let response = await profileAPI.updateAvatar(file)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAvatar(response.data.photos))
    }
}
export const saveProfile = (profileInfo: ProfileInfoType): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch, getState) => {
    let data = await profileAPI.updateProfileInfo(profileInfo)
    if (data.resultCode === ResultCodesEnum.Success) {
        const id = getState().auth.id
        if(id) await dispatch(requestUserProfile(id))
    } else {
        alert(data.messages[0])
    }
}
export default profileReducer