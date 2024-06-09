import {Field, Form, Formik} from "formik";

export const ProfileDataForm = ({userProfile, saveProfile, toggleEditMode}) => {
    const submit = (values, { setSubmitting }) => {
        console.log(values)
        saveProfile(values)
        setSubmitting(false)
        toggleEditMode()
    }
    return <div>
        <Formik initialValues={{fullName: userProfile.fullName, AboutMe: userProfile.aboutMe,
            lookingForAJob: userProfile.lookingForAJob,
            lookingForAJobDescription: userProfile.lookingForAJobDescription,
            github: userProfile.contacts.github, vk: userProfile.contacts.vk, facebook: userProfile.contacts.facebook,
            instagram: userProfile.contacts.instagram, twitter: userProfile.contacts.twitter,
            website: userProfile.contacts.website, youtube: userProfile.contacts.youtube,
            mainLink: userProfile.contacts.mainLink}} onSubmit={submit}>
            {({isSubmitting})=>(
                <Form>
                    <div>
                        Nickname: <Field name="fullName" placeholder="Nickname"/>
                    </div>
                    <div>
                        About me: <Field name="AboutMe" placeholder="AboutMe"/>
                    </div>
                    <div>
                        Looking for a job? <Field name="lookingForAJob" type="checkbox"/>
                    </div>
                    <div>
                        My skills: <Field name="lookingForAJobDescription" placeholder="My skills"/>
                    </div>
                    <b>Links:</b>
                    <div>
                        <Field name="github" placeholder="github"/>
                    </div>
                    <div>
                        <Field name="vk" placeholder="vk"/>
                    </div>
                    <div>
                        <Field name="facebook" placeholder="facebook"/>
                    </div>
                    <div>
                        <Field name="instagram" placeholder="instagram"/>
                    </div>
                    <div>
                        <Field name="twitter" placeholder="twitter"/>
                    </div>
                    <div>
                        <Field name="website" placeholder="website"/>
                    </div>
                    <div>
                        <Field name="youtube" placeholder="youtube"/>
                    </div>
                    <div>
                        <Field name="mainLink" placeholder="mainLink"/>
                    </div>
                    <button type="submit" disabled={isSubmitting}>Confirm</button>
                </Form>
            )}
        </Formik>
    </div>
}