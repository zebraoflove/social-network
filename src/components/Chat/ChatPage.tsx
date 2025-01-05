import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Space} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {ChatMessageAPIType} from "../../API/ChatAPI";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../redux/redux-store";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {getChatMessagesS, getChatStatusS} from "../../redux/chatSelectors";
import userPhoto from "../../Assets/Images/user.jpg"

const ChatPage: React.FC = () => {
    return <Chat/>
}
const Chat: React.FC = () => {
    const chatStatus = useSelector(getChatStatusS)
    const dispatch:AppDispatchType = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return (
        <div>
            {chatStatus === 'error' && <div>Chat error. Refresh page.</div>}
            <AllMessages/>
            <AddMessageForm/>
        </div>
    )
}


const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    console.log('>>>>>>>>Message')
    return (
        <div>
            <img alt="None ava" src={message.photo ? message.photo : userPhoto} width={40}/>
            <b> {message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})
const AllMessages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    let messages = useSelector(getChatMessagesS)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 50) {
            !isAutoScroll && setIsAutoScroll(true)
        }
        else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        console.log(messages.length)
    }, [messages])
    return (
        <div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key = {m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
const AddMessageForm: React.FC = () => {
    const status = useSelector(getChatStatusS)
    const [message, setMessage] = useState('')
    const dispatch:AppDispatchType = useDispatch()
    const addMessage = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <Space>
            <Space.Compact>
                <Input onChange={e => {
                    setMessage(e.currentTarget.value)
                }} placeholder="Enter new message" value={message}/>
                <Button disabled={status !== 'ready'} onClick={addMessage} icon={<SendOutlined/>}/>
            </Space.Compact>
        </Space>
    )
}
export default ChatPage