import s from './FormControls.module.css'
import React from "react";
import {ErrorMessage} from "formik";
import cn from "classnames";

export const Textarea = ({field, form, ...props}) => {
    const hasErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <span className={cn({[s.error]: hasErrors}, s.formControl)}>
            <div>
                <textarea {...field} {...props}/>
                <ErrorMessage className={s.errorMessage} name={field.name} component="span"/>
            </div>
        </span>
    )
}
export const Input = ({field, form, ...props}) => {
    const hasErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <span className={cn({[s.error]: hasErrors}, s.formControl)}>
            <input {...field} {...props}/>
            <ErrorMessage className={s.errorMessage} name={field.name} component="span"/>
        </span>
    )
}