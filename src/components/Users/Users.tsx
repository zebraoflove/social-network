import s from './Users.module.css'
import React, {useEffect} from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageS,
    getFilterS, getFollowingInProgress,
    getIsFetchedS,
    getPageSizeS,
    getTotalUsersCountS,
    getUsersS
} from "../../redux/usersSelectors";
import {requestUsers, followUser, unfollowUser, FilterType} from "../../redux/usersReducer";
import {AppDispatchType} from "../../redux/redux-store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FollowedType} from "../../Types/types";

const Users: React.FC = () => {
    const totalUsersCount = useSelector(getTotalUsersCountS)
    const pageSize = useSelector(getPageSizeS)
    const isFetched = useSelector(getIsFetchedS)
    const currentPage = useSelector(getCurrentPageS)
    const users = useSelector(getUsersS)
    const filter = useSelector(getFilterS)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch: AppDispatchType = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        let sighExistArray: Array<boolean> = [false, false, false]
        let sighArray: Array<string> = ['', '', '']
        let friendStr = ''
        if (filter.isFriend !== 'All') {
            friendStr = `friend=${filter.isFriend}`
            sighExistArray[0] = true
        }
        let termStr = ''
        if (filter.term !== '') {
            termStr = `term=${filter.term}`
            sighExistArray[1] = true
        }
        let pageStr = ''
        if (currentPage !== 1) {
            pageStr = `page=${currentPage}`
            sighExistArray[2] = true
        }
        if(sighExistArray[0] || sighExistArray[1] || sighExistArray[2]) {
            sighArray[0] = '?'
            if((sighExistArray[0] && sighExistArray[1]) || (sighExistArray[0] && sighExistArray[2])) {
                sighArray[1] = '&'
                if (sighExistArray[1] && sighExistArray[2]) sighArray[2] = '&'
            }
        }
        navigate(`/users${sighArray[0]}${friendStr}${sighArray[1]}${termStr}${sighArray[2]}${pageStr}`)
    }, [filter, currentPage, navigate])
    useEffect(() => {
        const queryPage = Number(searchParams.get("page"))
        const queryTerm = String(searchParams.get("term"))
        const queryIsFriend = searchParams.get("friend") as FollowedType
        let actualPage = currentPage
        let actualFilter: FilterType = filter
        if(queryPage) actualPage = queryPage
        if(queryTerm && queryTerm !== 'null') actualFilter = {...actualFilter, term: queryTerm}
        if(queryIsFriend) actualFilter = {...actualFilter, isFriend: queryIsFriend}
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    const follow = (id: number) => {
        dispatch(followUser(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollowUser(id))
    }
    return <div>
        {isFetched ? <Preloader/> : null}
        <Paginator portionSize={10} totalUsersCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} filter={filter}/>
        {users.map(u => <User user={u} key={u.id} followUser={follow}
                                 unfollowUser={unfollow} followingInProgress={followingInProgress}/>)}
    </div>
}
export default Users