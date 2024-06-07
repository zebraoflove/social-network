import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return <div>
        <ProfileInfo saveAvatar={props.saveAvatar} isOwner={props.isOwner} userProfile={props.userProfile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer />
    </div>;
}

export default Profile;