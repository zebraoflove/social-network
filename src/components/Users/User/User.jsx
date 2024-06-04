import s from './User.module.css'
import React from "react";
import userPhoto from '../../../Assets/Images/user.jpg'
import {NavLink} from "react-router-dom";
let User = ({user, followingInProgress, followUser, unfollowUser}) => {
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