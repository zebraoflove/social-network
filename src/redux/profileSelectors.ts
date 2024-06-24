import {AppStateType} from "./redux-store";
export const getUserProfileS = (state: AppStateType) => {
    return state.profilePage.userProfile
}
export const getStatusS = (state: AppStateType) => {
    return state.profilePage.status
}
export const getPostsDataS = (state: AppStateType) => {
    return state.profilePage.postsData
}