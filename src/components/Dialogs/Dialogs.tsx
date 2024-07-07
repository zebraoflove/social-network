import s from './Dialogs.module.css'
import Message from "./Message/Message";
import React from "react";
import Talker from "./Talker/Talker";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {validateMessage} from "../../Validations/ValidationMessage";
import {Textarea} from "../Common/FormControls/FormControls";
import {MessageType, TalkerType} from "../../Types/types";
import {useDispatch, useSelector} from "react-redux";
import {getDialogsPageS} from "../../redux/dialogsSelectors";
import {AppDispatchType} from "../../redux/redux-store";
import {actions} from "../../redux/dialogsReducer";
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
    type ValuesType = {message: string}
    const onAddMessage = (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => {
        dispatch(actions.addMessage(values.message))
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