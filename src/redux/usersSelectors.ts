import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";
const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector,(users)=>{
    return users.filter(u => true)
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetched = (state: AppStateType) => {
    return state.usersPage.isFetched
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getTermS = (state: AppStateType) => {
    return state.usersPage.term
}
export const getIsFriendS = (state: AppStateType) => {
    return state.usersPage.isFriend
}