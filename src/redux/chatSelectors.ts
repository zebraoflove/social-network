import {AppStateType} from "./redux-store";
export const getChatMessagesS = (state: AppStateType) => {
    return state.chat.messages
}
export const getChatStatusS = (state: AppStateType) => {
    return state.chat.status
}