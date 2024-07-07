import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserIdS} from "../../redux/authSelectors";
import {AppDispatchType} from "../../redux/redux-store";
import {requestStatus, requestUserProfile} from "../../redux/profileReducer";
const Profile: React.FC = () => {
    const dispatch: AppDispatchType = useDispatch()
    // @ts-ignore
    let {userId}: number | null = useParams()
    let isOwner: boolean = true
    if(useParams().userId) isOwner = false
    const myUserId = useSelector(getUserIdS)
    if(!userId) userId = myUserId
    useEffect(() => {
        // @ts-ignore
        if(userId) {
            dispatch(requestUserProfile(userId))
            dispatch(requestStatus(userId))
        }
    }, [userId])
    return <div>
        <ProfileInfo isOwner={isOwner}/>
        <MyPosts/>
    </div>;
}
export default Profile;