import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import user from "./../../../Assets/Images/user.jpg"
import {ProfileStatus} from "./ProfileStatus";
import React, {useState} from "react";
import {ProfileDataForm} from "./ProfileDataForm";
import {ProfileType} from "../../../Types/types";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfileS} from "../../../redux/profileSelectors";
import {AppDispatchType} from "../../../redux/redux-store";
import {saveAvatar} from "../../../redux/profileReducer";
type PropsType = {
    isOwner: boolean
}
const ProfileInfo: React.FC<PropsType> = ({isOwner}) => {
    const dispatch: AppDispatchType = useDispatch()
    const userProfile = useSelector(getUserProfileS)
    const [editMode, setEditMode] = useState(false)
    const onAvatarSelected = (e: any) => {
        if(e.target.files.length !==0) dispatch(saveAvatar(e.target.files[0]))
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
        <ProfileStatus isOwner={isOwner}/>
        {isOwner ? <button onClick={toggleEditMode}>Edit</button> : null}
        {editMode ? <ProfileDataForm userProfile={userProfile} toggleEditMode={toggleEditMode}/>
            : <ProfileData userProfile={userProfile}/>}
    </div>
}
const ProfileData = ({userProfile}: {userProfile: ProfileType}) => {
    return <div>
        <div><b>Nickname: </b>{userProfile.fullName}</div>
        {userProfile.aboutMe ? <div><b>About me: </b>{userProfile.aboutMe}</div> : null}
        <div><b>Looking for a job?: </b>{userProfile.lookingForAJob ? "Yes" : "No"}</div>
        {userProfile.lookingForAJobDescription ? <div><b>My skills: </b>{userProfile.lookingForAJobDescription}</div> : null}
        <div className={s.contactsBlock}> <b>Contacts:</b>
            {Object.keys(userProfile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={userProfile.contacts[key as keyof typeof userProfile.contacts]}/>
            })}
        </div>
    </div>
}
type ContactPropsType = {
    contactTitle: string | null
    contactValue: string | null
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    if(contactValue) return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
    else return null
}
export default ProfileInfo;