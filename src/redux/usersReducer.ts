import {followAPI, usersAPI} from "../API/API";
import {UserType} from "../Types/types";
const CHANGE_FOLLOWING = "CHANGE-FOLLOWING"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const SET_FETCHED = "SET-FETCHED"
const TOGGLE_FOLLOWING = "TOGGLE-FOLLOWING"
const SET_TERM = "SET-TERM"
type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetched: boolean
    followingInProgress: Array<number>,
    term: string
}
let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetched: true,
    followingInProgress: [],
    term: ""
}
const usersReducer = (state = initialState, action: any): InitialStateType => {
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
        case SET_TERM: {
            return {...state, term: action.term}
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
type ChangeFollowingActionType = {type: typeof CHANGE_FOLLOWING, userid: number}
type SetUsersActionType = {type: typeof SET_USERS, users: Array<UserType>}
type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
type SetTotalUsersCountActionType = {type: typeof SET_TOTAL_USERS_COUNT, totalCount: number}
type SetFetchedActionType = {type: typeof SET_FETCHED, isFetched: boolean}
type ToggleFollowingActionType = {type: typeof TOGGLE_FOLLOWING, followingInProgress: boolean, userid: number}
type SetTermActionType = {type: typeof SET_TERM, term: string}
export const changeFollowing = (userid: number): ChangeFollowingActionType => ({type: CHANGE_FOLLOWING, userid})
const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setFetched = (isFetched: boolean): SetFetchedActionType => ({type: SET_FETCHED, isFetched})
const setTerm = (term: string): SetTermActionType => ({type: SET_TERM, term})
const toggleFollowing = (followingInProgress: boolean, userid: number): ToggleFollowingActionType => ({type: TOGGLE_FOLLOWING, followingInProgress, userid})
export const requestUsers = (page: number, pageSize: number, term: string) => async (dispatch: any) => {
    dispatch(setFetched(true))
    dispatch(setTerm(term))
    let response = await usersAPI.getUsers(page, pageSize, term)
    dispatch(setCurrentPage(page))
    dispatch(setFetched(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}
export const unfollowUser = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowing(true, userId))
    let response = await followAPI.unfollowUser(userId)
    if (response.data.resultCode === 0) {
        dispatch(changeFollowing(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export const followUser = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowing(true, userId))
    let response = await followAPI.followUser(userId)
    if (response.data.resultCode === 0) {
        dispatch(changeFollowing(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export default usersReducer