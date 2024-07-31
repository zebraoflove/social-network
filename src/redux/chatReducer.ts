import {chatAPI, ChatMessageAPIType} from "../API/ChatAPI";
import {AppDispatchType, InferActionsTypes} from "./redux-store";
import {ChatStatusType, ThunkType} from "../Types/types";
import {v1} from "uuid"
type ActionType = InferActionsTypes<typeof actions>
type ChatMessageType = ChatMessageAPIType & {id: string}
export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({type: "SN/CHAT/MESSAGES-RECEIVED", payload: {messages}} as const),
    statusChanged: (status: ChatStatusType) =>
        ({type: "SN/CHAT/STATUS-CHANGED", payload: status} as const)
}
let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as ChatStatusType
}
export type InitialStateType = typeof initialState
const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES-RECEIVED": {
            return {...state, messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) =>
                        index >= array.length - 100)}
        }
        case "SN/CHAT/STATUS-CHANGED": {
            return {...state, status: action.payload}
        }
        default: {
            return state
        }
    }
}
let newMessageHandler_: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatchType) => {
    if(newMessageHandler_ === null) newMessageHandler_ = (messages) => {
        dispatch(actions.messagesReceived(messages))
    }
    return newMessageHandler_
}
let statusChangedHandler_: ((status: ChatStatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: AppDispatchType) => {
    if(statusChangedHandler_ === null) statusChangedHandler_ = (status) => {
        dispatch(actions.statusChanged(status))
    }
    return statusChangedHandler_
}
export const startMessagesListening = (): ThunkType<ActionType> => async (dispatch: AppDispatchType) => {
    chatAPI.start()
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType<ActionType> => async (dispatch: AppDispatchType) => {
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType<ActionType> => async () => {
    chatAPI.sendMessage(message)
}
export default chatReducer