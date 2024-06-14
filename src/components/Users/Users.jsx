import s from './Users.module.css'
import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";
let Users = (props) => {

    return <div>
        <Paginator portionSize = {10} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                   users={props.users} currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged} setCurrentPage={props.setCurrentPage}/>
        <div className={s.searchBlock}>
            SEARCH BLOCK
        </div>
        <div>
            {props.isFetched ? <Preloader/> : null}
        </div>
        {
            props.users.map(u => <User user={u} key={u.id} followUser={props.followUser}
                                       unfollowUser={props.unfollowUser} followingInProgress={props.followingInProgress}/>)
        }
    </div>
}
export default Users