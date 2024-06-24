import s from './Users.module.css'
import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";
import {FollowedType, UserType} from "../../Types/types";
type PropsType = {
    isFetched: boolean
    users: Array<UserType>
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    term: string
    isFriend: FollowedType
    requestUsers: (currentPage: number, pageSize: number, term: string) => (void)
}
const Users: React.FC<PropsType> = ({isFetched, users, followUser, unfollowUser, followingInProgress,
                                        term, isFriend, totalUsersCount, pageSize,
                                        currentPage, requestUsers}) => {
    return <div>
        <Paginator portionSize = {10} totalUsersCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} term={term} isFriend={isFriend} requestUsers={requestUsers}/>
        <div>
            {isFetched ? <Preloader/> : null}
        </div>
        {
            users.map(u => <User user={u} key={u.id} followUser={followUser}
                                       unfollowUser={unfollowUser} followingInProgress={followingInProgress}/>)
        }
    </div>
}
export default Users