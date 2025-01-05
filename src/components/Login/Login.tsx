import {Field, Form, Formik, FormikHelpers} from "formik";
import {loginUser, getCaptcha} from "../../redux/authReducer";
import {validateEmail, validatePassword} from "../../Validations/ValidationLogin";
import {Input_} from "../Common/FormControls/FormControls";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import React from "react";
import {AppDispatchType} from "../../redux/redux-store";
import {getCaptchaUrlS, getIsAuthS} from "../../redux/authSelectors";
type PropsTypes = {
    captchaUrl: string | null
    submit: (values: ValuesType, setSubmitting: FormikHelpers<ValuesType>) => void
    getCaptcha: () => void
}
const LoginForm: React.FC<PropsTypes> = ({captchaUrl, submit, getCaptcha}) => {
    const initialValues: ValuesType = {email: '', password: '', rememberMe: true, captcha: ''}
    return <Formik initialValues={initialValues} onSubmit={submit}>
        {({ isSubmitting }) => (
            <Form>
                <div>
                    <Field validate={validateEmail} component={Input_} type="email" name="email" placeholder="email"/>
                </div>
                <div>
                    <Field validate={validatePassword(4)} component={Input_} type="password" name="password" placeholder="password"/>
                </div>
                <div>
                    <Field type="checkbox" name="rememberMe"/> Remember me
                </div>
                {captchaUrl && <div>
                    <div>
                        <img src={captchaUrl}/>
                        <button type="button" onClick={()=>(getCaptcha())}>New captcha</button>
                    </div>
                    <Field name="captcha" type="textarea" placeholder="Insert captcha"/>
                </div>}
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                <div> You can use test email: free@samuraijs.com</div>
                <div> And password: free</div>
            </Form>
        )}
    </Formik>
}
type ValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
const Login: React.FC = () => {
    const isAuth = useSelector(getIsAuthS)
    const captchaUrl = useSelector(getCaptchaUrlS)
    const dispatch: AppDispatchType = useDispatch()
    const getCaptcha_ = () => {
        dispatch((getCaptcha))
    }
    const submit = (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => {
        dispatch(loginUser(values.email, values.password, values.rememberMe, values.captcha))
        setSubmitting(false)
    }
    if(isAuth) return <Navigate to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginForm submit={submit} captchaUrl={captchaUrl} getCaptcha={getCaptcha_}/>
    </div>
}
export default Login