import {connect} from "react-redux";
import {
    requestUsers, followUser, unfollowUser, actions
} from "../../redux/usersReducer";
import Users from "./Users";
import React from "react";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetched, getIsFriendS,
    getPageSize, getTermS,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {FollowedType, UserType} from "../../Types/types";
import {AppStateType} from "../../redux/redux-store";
type PropsType = {
    isFetched: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    term: string
    isFriend: FollowedType
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    requestUsers: (currentPage:number, pageSize:number, term:string)=>void
}
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.term)
    }
    render() {
        return <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} users={this.props.users}
                      currentPage={this.props.currentPage} isFetched={this.props.isFetched} term={this.props.term}
                      isFriend={this.props.isFriend}
                      requestUsers = {this.props.requestUsers} followingInProgress={this.props.followingInProgress}
                      followUser={this.props.followUser} unfollowUser={this.props.unfollowUser}/>
    }
}
let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetched: getIsFetched(state),
        followingInProgress: getFollowingInProgress(state),
        term: getTermS(state),
        isFriend: getIsFriendS(state)
    }
}
export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,
        {setTotalUsersCount: actions.setTotalUsersCount, setFetched: actions.setFetched, requestUsers, followUser, unfollowUser})
)(UsersContainer)