import s from './FormControls.module.css'
import React from "react";
import {ErrorMessage} from "formik";
export const Textarea = ({field, form, ...props}) => {
    const hasErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <div className={s.formControl + ' ' + (hasErrors ? s.error : '')} >
            <div>
                <textarea {...field} {...props}/>
            </div>
            <ErrorMessage name={field.name} component="span"/>
        </div>
    )
}
export const Input = ({field, form, ...props}) => {
    const hasErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <div className={s.formControl + ' ' + (hasErrors ? s.error : '')}>
            <div>
                <input {...field} {...props}/>
            </div>
            <ErrorMessage name={field.name} component="span"/>
        </div>
    )
}