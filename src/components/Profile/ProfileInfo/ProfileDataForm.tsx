import {Field, Form, Formik} from "formik";
import {validateLink, validateRequiredInfo} from "../../../Validations/ValidationProfile";
import {Input} from "../../Common/FormControls/FormControls";
import {ProfileInfoType, ProfileType} from "../../../Types/types";
import React from "react";
type PropsType = {
    userProfile: ProfileType
    saveProfile: (profileInfo: ProfileInfoType) => void
    toggleEditMode: () => void
}
export const ProfileDataForm: React.FC<PropsType> = ({userProfile, saveProfile, toggleEditMode}) => {
    const submit = (values: ProfileInfoType, { setSubmitting }: any) => {
        saveProfile(values)
        setSubmitting(false)
        toggleEditMode()
    }
    return <div>
        <Formik initialValues={{fullName: userProfile.fullName, aboutMe: userProfile.aboutMe,
            lookingForAJob: userProfile.lookingForAJob,
            lookingForAJobDescription: userProfile.lookingForAJobDescription, contacts: {github: userProfile.contacts.github, vk: userProfile.contacts.vk, facebook: userProfile.contacts.facebook,
                instagram: userProfile.contacts.instagram, twitter: userProfile.contacts.twitter,
                website: userProfile.contacts.website, youtube: userProfile.contacts.youtube,
                mainLink: userProfile.contacts.mainLink}
            }} onSubmit={submit}>
            {({isSubmitting})=>(
                <Form>
                    {CreateRequiredInfoField("Nickname", "fullName", "Nickname")}
                    {CreateRequiredInfoField("AboutMe", "aboutMe", "About me")}
                    <div>
                        Looking for a job? <Field name="lookingForAJob" type="checkbox"/>
                    </div>
                    {CreateRequiredInfoField("My skills", "lookingForAJobDescription", "My skills")}
                    <b>Links:</b>
                    {CreateContactsField("github")}
                    {CreateContactsField("vk")}
                    {CreateContactsField("facebook")}
                    {CreateContactsField("instagram")}
                    {CreateContactsField("twitter")}
                    {CreateContactsField("website")}
                    {CreateContactsField("youtube")}
                    {CreateContactsField("mainLink")}
                    <button type="submit" disabled={isSubmitting}>Confirm</button>
                </Form>
            )}
        </Formik>
    </div>
}
const CreateRequiredInfoField = (placeholder: string, name: string, title: string) => {
    return(
        <div>
            {title}: <Field validate={validateRequiredInfo} component={Input} name={name} placeholder={placeholder}/>
        </div>
    )
}
const CreateContactsField = (placeholder: string) => {
    return(
        <div>
            <Field validate={validateLink} component={Input} name={`contacts.${placeholder}`} placeholder={placeholder}/>
        </div>
    )
}