import {AppStateType} from "./redux-store";
export const getDialogsPage = (state: AppStateType) => {
    return state.dialogsPage
}
export const getUsersDataS = (state: AppStateType) => {
    return state.dialogsPage.usersData
}