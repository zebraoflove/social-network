import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import user from "./../../../Assets/Images/user.jpg"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    const onAvatarSelected = (e) => {
        if(e.target.files.length !==0) props.saveAvatar(e.target.files[0])
    }
    if(!props.userProfile) {
        return <Preloader/>
    }
    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.userProfile.photos.large ? props.userProfile.photos.large : user}/>
            {props.isOwner ? <div><input type="file" onChange={onAvatarSelected}/></div> : null}
            <div>Nickname: {props.userProfile.fullName}</div>
            <ProfileStatus isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>;
}

export default ProfileInfo;