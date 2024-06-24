import {MessageType, TalkerType} from "../Types/types";
const ADD_MESSAGE = "ADD-MESSAGE"
const DELETE_MESSAGE = "DELETE-MESSAGE"
type AddMessageActionType = {type: typeof ADD_MESSAGE, messageText: string}
type DeleteMessageActionType =  {type: typeof DELETE_MESSAGE, messageId: number}
type InitialStateType = {
    usersData: Array<TalkerType>
    messagesData: Array<MessageType>}
let initialState: InitialStateType = {
    usersData: [
        {
            id: 1, name: 'Igor',
            ava: "https://yt3.ggpht.com/a/AGF-l79yWhq8XPpqNUxzW6rnzB41IRgVuTr6K2PxEQ=s900-c-k-c0xffffffff-no-rj-mo"
        },
        {
            id: 2, name: 'Anna',
            ava: "https://sneg.top/uploads/posts/2023-06/1687586574_sneg-top-p-avatarka-politicheskaya-vkontakte-46.png"
        },
        {
            id: 3, name: 'Lena',
            ava: "https://sneg.top/uploads/posts/2023-06/1687566265_sneg-top-p-avatarka-dlya-shkolnogo-portala-instagram-2.png"
        },
        {
            id: 4, name: 'Misha',
            ava: "https://sneg.top/uploads/posts/2023-06/1688058432_sneg-top-p-avatarka-bota-telegramm-instagram-39.jpg"
        },
        {id: 5, name: 'Ignat', ava: "https://sb.klinok-project.ru/theme/img/profile-pics/2.jpg"}
    ],
    messagesData: [
        {id: 1, text: "Hey", belong: false},
        {id: 2, text: "What's up?", belong: false},
        {id: 3, text: "Everything's fine", belong: true},
        {id: 4, text: "Do you like donuts?", belong: true},
        {id: 5, text: "Of course", belong: false}
    ]
}
const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage: MessageType = {id: state.messagesData.length + 1, text: action.messageText, belong: true}
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        }
        case DELETE_MESSAGE: {
            return {
                ...state,
                messagesData: state.messagesData.filter(m => m.id !== action.messageId)
            }
        }
        default: {
            return state
        }
    }
}
export const  addMessage = (messageText: string): AddMessageActionType => ({type: ADD_MESSAGE, messageText})
export const deleteMessage = (messageId: number): DeleteMessageActionType => ({type: DELETE_MESSAGE, messageId})
export default dialogsReducer