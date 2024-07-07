import {AppStateType} from "./redux-store";
export const getDialogsPageS = (state: AppStateType) => {
    return state.dialogsPage
}
export const getUsersDataS = (state: AppStateType) => {
    return state.dialogsPage.usersData
}