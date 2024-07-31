import s from './FormControls.module.css'
import React from "react";
import {ErrorMessage} from "formik";
import cn from "classnames";
import {Input} from "antd";
type PropsType = {
    field: any
    form: any
}
export const Textarea_: React.FC<PropsType> = ({field, form, ...props}) => {
    const hasErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <span className={cn({[s.error]: hasErrors}, s.formControl)}>
            <div>
                <Input.TextArea showCount {...field} {...props}/>
                <ErrorMessage className={s.errorMessage} name={field.name} component="span"/>
            </div>
        </span>
    )
}
export const Input_: React.FC<PropsType> = ({field, form, ...props}) => {
    const hasErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <span className={cn({[s.error]: hasErrors}, s.formControl)}>
            <Input {...field} {...props}/>
            <ErrorMessage className={s.errorMessage} name={field.name} component="span"/>
        </span>
    )
}