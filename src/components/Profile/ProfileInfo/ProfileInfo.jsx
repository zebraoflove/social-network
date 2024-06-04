import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import user from "./../../../Assets/Images/user.jpg"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if(!props.userProfile) {
        return <Preloader/>
    }
    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.userProfile.photos.large ? props.userProfile.photos.large : user}/>
            <div>Nickname: {props.userProfile.fullName}</div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>;
}

export default ProfileInfo;