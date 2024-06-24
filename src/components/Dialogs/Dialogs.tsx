import s from './Dialogs.module.css'
import Message from "./Message/Message";
import React from "react";
import Talker from "./Talker/Talker";
import {Field, Form, Formik} from "formik";
import {validateMessage} from "../../Validations/ValidationMessage";
import {Textarea} from "../Common/FormControls/FormControls";
import {MessageType, TalkerType} from "../../Types/types";
type DialogsPageType = {
    usersData: Array<TalkerType>
    messagesData: Array<MessageType>
}
type PropsType = {
    dialogsPage: DialogsPageType
    addMessage: (message: string) => void
}
const Dialogs: React.FC<PropsType> = (props) => {
    let talkers = props.dialogsPage.usersData.map(t => <Talker key={t.id} name={t.name} id={t.id} ava={t.ava}/>)
    let messages = props.dialogsPage.messagesData.map(m => <Message key={m.id} text={m.text} belong={m.belong}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogUsers}>
                {talkers}
            </div>
            <div className={s.dialogMessages}>
                <div>
                    {messages}
                </div>
                <AddMessageForm addMessage={props.addMessage}/>
            </div>
        </div>
    )
}
type FormPropsType = {
    addMessage: (message: string) => void
}
const AddMessageForm: React.FC<FormPropsType> = ({addMessage}) => {
    type ValuesType = {message: string}
    const onAddMessage = (values: ValuesType, {setSubmitting}: any) => {
        addMessage(values.message)
        values.message = ""
        setSubmitting(false)
    }
    return <Formik
        initialValues={{message: ''}}
        onSubmit={onAddMessage}>
        {({isSubmitting}) => (
            <Form>
                <div className={s.messageArea}>
                    <Field validate={validateMessage(30)} component={Textarea} name="message"
                           placeholder="Enter your message"/>
                    <button type="submit" disabled={isSubmitting}>Send</button>
                </div>
            </Form>
        )}
    </Formik>
}
export default Dialogs