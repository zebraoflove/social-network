import {Field, Form, Formik} from "formik";
import {loginUser, logoutUser, getCaptcha} from "../../redux/authReducer";
import {validateEmail, validatePassword} from "../../Validations/ValidationLogin";
import {Input} from "../Common/FormControls/FormControls";
import {connect} from "react-redux";
import {compose} from "redux";
import {Navigate} from "react-router-dom";
import React from "react";
const LoginForm = (props) => {
    return <Formik
        initialValues={{email: '', password: '', rememberMe: true, captcha: ''}}
        onSubmit={props.submit}>
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
                {props.captchaUrl && <div>
                    <div>
                        <img src={props.captchaUrl}/>
                        <button type="button" onClick={()=>(props.getCaptcha())}>New captcha</button>
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
const Login = (props) => {
    const submit = (values, { setSubmitting }) => {
        props.loginUser(values.email, values.password, values.rememberMe, values.captcha)
        setSubmitting(false)
    }
    if(props.isAuth) return <Navigate to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginForm submit={submit} captchaUrl={props.captchaUrl} getCaptcha={props.getCaptcha}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default compose(
    connect(mapStateToProps, {loginUser, logoutUser, getCaptcha})
)(Login)