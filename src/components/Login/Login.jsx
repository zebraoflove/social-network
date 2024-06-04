import {Field, Form, Formik} from "formik";
import {loginUser, logoutUser} from "../../redux/authReducer";
import {validateEmail, validatePassword} from "../../Validations/ValidationLogin";
import {Input} from "../Common/FormControls/FormControls";
import {connect} from "react-redux";
import {compose} from "redux";
import {Navigate} from "react-router-dom";
import React from "react";
const LoginForm = (props) => {
    return <Formik
        initialValues={{email: '', password: '', rememberMe: true}}
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
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        )}
    </Formik>
}
const Login = (props) => {
    const submit = (values, { setSubmitting }) => {
        console.log(values)
        props.loginUser(values.email, values.password, values.rememberMe)
        setSubmitting(false)
    }
    if(props.isAuth) return <Navigate to='/profile'/>
    return <div>
        <h1>LOGIN</h1>
        <LoginForm submit={submit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default compose(
    connect(mapStateToProps, {loginUser, logoutUser})
)(Login)