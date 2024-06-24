import s from './User.module.css'
import React from "react";
import userPhoto from '../../../Assets/Images/user.jpg'
import {NavLink} from "react-router-dom";
import {UserType} from "../../../Types/types";
type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
}
const User: React.FC<PropsType> = ({user, followingInProgress, followUser, unfollowUser}) => {
    return <div>
        <div key={user.id} className={s.userBlock}>
                    <div className={s.followBlock}>
                        <NavLink to={'/profile/' + user.id}><img className={s.round}
                                                              src={user.photos.small ? user.photos.small : userPhoto}/></NavLink>
                        <div>
                            {user.followed ?
                                <button disabled={followingInProgress.some(FiPid => FiPid === user.id)} onClick={() => {
                                    unfollowUser(user.id)
                                }}>UNFOLLOW</button> :
                                <button disabled={followingInProgress.some(FiPid => FiPid === user.id)} onClick={() => {
                                    followUser(user.id)
                                }}>FOLLOW</button>}
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.name}>{user.name}</div>
                        <div className={s.status}>{user.status}</div>
                    </div>
                </div>
    </div>
}
export default User