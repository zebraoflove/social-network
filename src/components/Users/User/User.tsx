import s from './User.module.css'
import React from "react";
import userPhoto from '../../../Assets/Images/user.jpg'
import {Link} from "react-router-dom";
import {UserType} from "../../../Types/types";
import {Button} from "antd";
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
                        <Link to={'/profile/' + user.id}><img alt='user' className={s.round}
                                                              src={user.photos.small ? user.photos.small : userPhoto}/></Link>
                        <div>
                            {user.followed ?
                                <Button disabled={followingInProgress.some(FiPid => FiPid === user.id)} onClick={() => {
                                    unfollowUser(user.id)
                                }}>UNFOLLOW</Button> :
                                <Button disabled={followingInProgress.some(FiPid => FiPid === user.id)} onClick={() => {
                                    followUser(user.id)
                                }}>FOLLOW</Button>}
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