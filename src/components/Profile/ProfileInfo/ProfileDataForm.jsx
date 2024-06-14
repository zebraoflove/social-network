import {Field, Form, Formik} from "formik";
import {validateLink, validateRequiredInfo} from "../../../Validations/ValidationProfile";
import {Input} from "../../Common/FormControls/FormControls";

export const ProfileDataForm = ({userProfile, saveProfile, toggleEditMode}) => {
    const submit = (values, { setSubmitting }) => {
        saveProfile(values)
        setSubmitting(false)
        toggleEditMode()
    }
    return <div>
        <Formik initialValues={{fullName: userProfile.fullName, AboutMe: userProfile.aboutMe,
            lookingForAJob: userProfile.lookingForAJob,
            lookingForAJobDescription: userProfile.lookingForAJobDescription, contacts: {github: userProfile.contacts.github, vk: userProfile.contacts.vk, facebook: userProfile.contacts.facebook,
                instagram: userProfile.contacts.instagram, twitter: userProfile.contacts.twitter,
                website: userProfile.contacts.website, youtube: userProfile.contacts.youtube,
                mainLink: userProfile.contacts.mainLink}
            }} onSubmit={submit}>
            {({isSubmitting})=>(
                <Form>
                    <div>
                        Nickname: <Field validate={validateRequiredInfo} component={Input} name="fullName" placeholder="Nickname"/>
                    </div>
                    <div>
                        About me: <Field validate={validateRequiredInfo} component={Input} name="AboutMe" placeholder="AboutMe"/>
                    </div>
                    <div>
                        Looking for a job? <Field name="lookingForAJob" type="checkbox"/>
                    </div>
                    <div>
                        My skills: <Field validate={validateRequiredInfo} component={Input} name="lookingForAJobDescription" placeholder="My skills"/>
                    </div>
                    <b>Links:</b>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.github" placeholder="github"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.vk" placeholder="vk"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.facebook" placeholder="facebook"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.instagram" placeholder="instagram"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.twitter" placeholder="twitter"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.website" placeholder="website"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.youtube" placeholder="youtube"/>
                    </div>
                    <div>
                        <Field validate={validateLink} component={Input} name="contacts.mainLink" placeholder="mainLink"/>
                    </div>
                    <button type="submit" disabled={isSubmitting}>Confirm</button>
                </Form>
            )}
        </Formik>
    </div>
}