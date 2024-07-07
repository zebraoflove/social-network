import {Field, Form, Formik, FormikHelpers} from "formik";
import {validateLink, validateRequiredInfo} from "../../../Validations/ValidationProfile";
import {Input} from "../../Common/FormControls/FormControls";
import {ProfileInfoType, ProfileType} from "../../../Types/types";
import React from "react";
import {useDispatch} from "react-redux";
import {saveProfile} from "../../../redux/profileReducer";
import {AppDispatchType} from "../../../redux/redux-store";
type PropsType = {
    userProfile: ProfileType
    toggleEditMode: () => void
}
export const ProfileDataForm: React.FC<PropsType> = ({userProfile, toggleEditMode}) => {
    const dispatch: AppDispatchType = useDispatch()
    const submit = (values: ProfileInfoType, { setSubmitting }: FormikHelpers<ProfileInfoType>) => {
        dispatch(saveProfile(values))
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