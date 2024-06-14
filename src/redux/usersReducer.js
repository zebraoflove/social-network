import {followAPI, usersAPI} from "../API/API";

const CHANGE_FOLLOWING = "CHANGE-FOLLOWING"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const SET_FETCHED = "SET-FETCHED"
const CHANGE_SEARCHED_PAGE = "CHANGE-SEARCHED-PAGE"
const TOGGLE_FOLLOWING = "TOGGLE-FOLLOWING"

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetched: true,
    followingInProgress: []
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWING: {
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userid) {
                            return {...u, followed: !u.followed}
                        }
                        return u
                    }
                )
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_FETCHED: {
            return {...state, isFetched: action.isFetched}
        }
        case TOGGLE_FOLLOWING: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userid]
                    : state.followingInProgress.filter(id => id !== action.userid)
            }
        }
        default: {
            return state
        }
    }
}
export const changeFollowing = (userid) => ({type: CHANGE_FOLLOWING, userid})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setFetched = (isFetched) => ({type: SET_FETCHED, isFetched})
export const toggleFollowing = (followingInProgress, userid) => ({type: TOGGLE_FOLLOWING, followingInProgress, userid})
export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(setFetched(true))
    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(setCurrentPage(page))
    dispatch(setFetched(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}
export const unfollowUser = (userId) => async (dispatch) => {
    dispatch(toggleFollowing(true, userId))
    let response = await followAPI.unfollowUser(userId)
    if (response.data.resultCode === 0) {
        dispatch(changeFollowing(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export const followUser = (userId) => async (dispatch) => {
    dispatch(toggleFollowing(true, userId))
    let response = await followAPI.followUser(userId)
    if (response.data.resultCode === 0) {
        dispatch(changeFollowing(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export default usersReducer