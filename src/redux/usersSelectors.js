import {createSelector} from "reselect";
const getUsersSelector = (state) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector,(users)=>{
    return users.filter(u => true)
})
export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsFetched = (state) => {
    return state.usersPage.isFetched
}
export const getSearchedPage = (state) => {
    return state.usersPage.searchedPage
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}