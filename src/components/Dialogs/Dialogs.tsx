import s from './Dialogs.module.css'
import Message from "./Message/Message";
import React, {useState} from "react";
import Talker from "./Talker/Talker";
import {MessageType, TalkerType} from "../../Types/types";
import {useDispatch, useSelector} from "react-redux";
import {getDialogsPageS} from "../../redux/dialogsSelectors";
import {AppDispatchType} from "../../redux/redux-store";
import {actions} from "../../redux/dialogsReducer";
import {Button, Input, Space} from "antd";
import {SendOutlined} from "@ant-design/icons";
type DialogsPageType = {
    usersData: Array<TalkerType>
    messagesData: Array<MessageType>
}
type PropsType = {
}
const Dialogs: React.FC<PropsType> = () => {
    const dialogsPage: DialogsPageType = useSelector(getDialogsPageS)
    let talkers = dialogsPage.usersData.map(t => <Talker key={t.id} name={t.name} id={t.id} ava={t.ava}/>)
    let messages = dialogsPage.messagesData.map(m => <Message key={m.id} text={m.text} belong={m.belong}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogUsers}>
                {talkers}
            </div>
            <div className={s.dialogMessages}>
                <div>
                    {messages}
                </div>
                <AddMessageForm/>
            </div>
        </div>
    )
}
const AddMessageForm = () => {
    const dispatch: AppDispatchType = useDispatch()
    const [message, setMessage] = useState('')
    const onAddMessage = () => {
        if(!message) return
        dispatch(actions.addMessage(message))
        setMessage('')
    }
    return (
        <Space>
            <Space.Compact>
                <Input.TextArea showCount maxLength={50} autoSize onChange={e => {setMessage(e.currentTarget.value)}} placeholder="Enter new message" value={message}/>
                <Button onClick={onAddMessage} icon={<SendOutlined />}/>
            </Space.Compact>
        </Space>
    )
}
export default Dialogs