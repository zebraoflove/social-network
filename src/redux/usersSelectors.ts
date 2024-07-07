import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";
const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsersS = createSelector(getUsersSelector,(users)=>{
    return users.filter(u => true)
})
export const getPageSizeS = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCountS = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPageS = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetchedS = (state: AppStateType) => {
    return state.usersPage.isFetched
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getFilterS = (state: AppStateType) => {
    return state.usersPage.filter
}