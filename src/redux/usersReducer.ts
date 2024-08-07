import {followAPI, ResultCodesEnum, usersAPI} from "../API/API";
import {FollowedType, UserType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetched: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: "",
        isFriend: "All" as FollowedType
    }
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export const actions = {
    changeFollowing: (userid: number) => ({type: "SN/USERS/CHANGE-FOLLOWING", userid} as const),
    setUsers: (users: Array<UserType>) => ({type: "SN/USERS/SET-USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SN/USERS/SET-CURRENT-PAGE", currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: "SN/USERS/SET-TOTAL-USERS-COUNT", totalCount} as const),
    setFetched: (isFetched: boolean) => ({type: "SN/USERS/SET-FETCHED", isFetched} as const),
    toggleFollowing: (followingInProgress: boolean, userid: number) => ({type: "SN/USERS/TOGGLE-FOLLOWING", followingInProgress, userid} as const),
    setFilter: (filter: FilterType) => ({type: "SN/USERS/SET-FILTER", payload: filter} as const)
}
type ActionType = InferActionsTypes<typeof actions>
const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/CHANGE-FOLLOWING": {
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
        case "SN/USERS/SET-CURRENT-PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SN/USERS/SET-TOTAL-USERS-COUNT": {
            return {...state, totalUsersCount: action.totalCount}
        }
        case "SN/USERS/SET-USERS": {
            return {...state, users: action.users}
        }
        case "SN/USERS/SET-FETCHED": {
            return {...state, isFetched: action.isFetched}
        }
        case "SN/USERS/SET-FILTER": {
            return {...state, filter: action.payload}
        }
        case "SN/USERS/TOGGLE-FOLLOWING": {
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
export const requestUsers = (page: number, pageSize: number, filter: FilterType):
    ThunkAction<Promise<void>, AppStateType, unknown,
        ActionType> => async (dispatch) => {
    dispatch(actions.setFetched(true))
    dispatch(actions.setFilter(filter))
    let data = await usersAPI.getUsers(page, pageSize, filter)
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFetched(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}
export const unfollowUser = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    dispatch(actions.toggleFollowing(true, userId))
    let data = await followAPI.unfollowUser(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.changeFollowing(userId))
    }
    dispatch(actions.toggleFollowing(false, userId))
}
export const followUser = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    dispatch(actions.toggleFollowing(true, userId))
    let data = await followAPI.followUser(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.changeFollowing(userId))
    }
    dispatch(actions.toggleFollowing(false, userId))
}
export default usersReducer