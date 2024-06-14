import {connect} from "react-redux";
import {
    setCurrentPage, setTotalUsersCount, setFetched,
    toggleFollowing, requestUsers, followUser, unfollowUser
} from "../../redux/usersReducer";
import Users from "./Users";
import React from "react";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetched,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }
    render() {
        return <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} users={this.props.users}
                      currentPage={this.props.currentPage} isFetched={this.props.isFetched}
                      requestUsers = {this.props.requestUsers} followingInProgress={this.props.followingInProgress}
                      toggleFollowing={this.props.toggleFollowing} followUser={this.props.followUser} unfollowUser={this.props.unfollowUser}/>
    }
}
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetched: getIsFetched(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
        {setCurrentPage, setTotalUsersCount, setFetched, toggleFollowing, requestUsers, followUser, unfollowUser})
)(UsersContainer)