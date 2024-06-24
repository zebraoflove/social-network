import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import {PostType, ProfileInfoType, ProfileType} from "../../Types/types";
import MyPosts from "./MyPosts/MyPosts";
type PropsTypes = {
    userProfile: ProfileType
    status: string
    isOwner: boolean
    postsData: Array<PostType>
    addPost: (newPost: string) => void
    updateStatus: (status: string) => void
    saveAvatar: (photo: File) => void
    saveProfile: (profile: ProfileInfoType) => void
}
const Profile: React.FC<PropsTypes> = ({userProfile, status, saveProfile, updateStatus, saveAvatar, isOwner, postsData, addPost}) => {
    return <div>
        <ProfileInfo saveProfile={saveProfile} saveAvatar={saveAvatar} isOwner={isOwner} userProfile={userProfile} status={status} updateStatus={updateStatus}/>
        <MyPosts postsData={postsData} addPost={addPost}/>
    </div>;
}
export default Profile;