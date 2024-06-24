import {Field, Form, Formik} from "formik";
import {loginUser, getCaptcha} from "../../redux/authReducer";
import {validateEmail, validatePassword} from "../../Validations/ValidationLogin";
import {Input} from "../Common/FormControls/FormControls";
import {connect} from "react-redux";
import {compose} from "redux";
import {Navigate} from "react-router-dom";
import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {getCaptchaUrlS, getIsAuthS} from "../../redux/authSelectors";
type PropsTypes = {
    captchaUrl: string | null
    submit: (values: ValuesType, setSubmitting: any) => void
    getCaptcha: () => void
}
const LoginForm: React.FC<PropsTypes> = ({captchaUrl, submit, getCaptcha}) => {
    const initialValues: ValuesType = {email: '', password: '', rememberMe: true, captcha: ''}
    return <Formik initialValues={initialValues} onSubmit={submit}>
        {({ errors, touched, isValidating, isSubmitting }) => (
            <Form>
                <div>
                    <Field validate={validateEmail} component={Input} type="email" name="email" placeholder="email"/>
                </div>
                <div>
                    <Field validate={validatePassword(8)} component={Input} type="password" name="password" placeholder="password"/>
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
            </Form>
        )}
    </Formik>
}
type LoginType = {
    isAuth: boolean
    captchaUrl: string | null
    loginUser: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    getCaptcha: () => void
}
type ValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
const Login: React.FC<LoginType> = ({isAuth, captchaUrl, loginUser, getCaptcha}) => {
    const submit = (values: ValuesType, {setSubmitting}: any) => {
        loginUser(values.email, values.password, values.rememberMe, values.captcha)
        setSubmitting(false)
    }
    if(isAuth) return <Navigate to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginForm submit={submit} captchaUrl={captchaUrl} getCaptcha={getCaptcha}/>
    </div>
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: getIsAuthS(state),
    captchaUrl: getCaptchaUrlS(state)
})
export default compose(
    connect(mapStateToProps, {loginUser, getCaptcha})
)(Login)