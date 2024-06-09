import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import user from "./../../../Assets/Images/user.jpg"
import ProfileStatus from "./ProfileStatus";
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import {ProfileDataForm} from "./ProfileDataForm";

const ProfileInfo = ({userProfile, status, updateStatus, saveAvatar, isOwner, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)
    const onAvatarSelected = (e) => {
        if(e.target.files.length !==0) saveAvatar(e.target.files[0])
    }
    const toggleEditMode = () => {
        setEditMode(!editMode)
    }
    if(!userProfile) {
        return <Preloader/>
    }
    return <div className={s.descriptionBlock}>
        <img src={userProfile.photos.large ? userProfile.photos.large : user}/>
        {isOwner ? <div><input type="file" onChange={onAvatarSelected}/></div> : null}
        <ProfileStatus isOwner={isOwner} status={status} updateStatus={updateStatus}/>
        {isOwner ? <button onClick={toggleEditMode}>Edit</button> : null}
        {editMode ? <ProfileDataForm userProfile={userProfile} saveProfile={saveProfile} toggleEditMode={toggleEditMode}/>
            : <ProfileData userProfile={userProfile}/>}
    </div>
}
const ProfileData = ({userProfile}) => {
    return <div>
        <div><b>Nickname: </b>{userProfile.fullName}</div>
        {userProfile.aboutMe ? <div><b>About me: </b>{userProfile.aboutMe}</div> : null}
        <div><b>Looking for a job?: </b>{userProfile.lookingForAJob ? "Yes" : "No"}</div>
        {userProfile.lookingForAJobDescription ? <div><b>My skills: </b>{userProfile.lookingForAJobDescription}</div> : null}
        <div className={s.contactsBlock}> <b>Contacts:</b>
            {Object.keys(userProfile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>
            })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    if(contactValue) return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
    else return null
}
export default ProfileInfo;