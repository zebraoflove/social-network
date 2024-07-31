import {ChatStatusType} from "../Types/types";

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type EventNamesType = 'message-received' | 'status-changed'
type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: ChatStatusType) => void
let subscribers = {
    'message-received': [] as Array<MessageReceivedSubscriberType>,
    'status-changed': [] as Array<StatusChangedSubscriberType>
}
let ws: WebSocket
const closeHandler = () => {
    console.error('CLOSE WS')
    notifyStatusSubscribers('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}
const errorHandler = () => {
    notifyStatusSubscribers('error')
    console.error("Ws error. Refresh page.")
}
const openHandler = () => {
    notifyStatusSubscribers('ready')
}
const notifyStatusSubscribers = (status: ChatStatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
function createChannel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifyStatusSubscribers('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        cleanUp()
        ws?.close()
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
    },
    subscribe(eventName: EventNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubscribe(eventName: EventNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}