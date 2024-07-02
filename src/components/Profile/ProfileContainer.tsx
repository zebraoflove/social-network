import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, saveAvatar, saveProfile, actions} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
import {getIsAuthS, getUserIdS} from "../../redux/authSelectors";
import {getPostsDataS, getStatusS, getUserProfileS} from "../../redux/profileSelectors";
import {AppStateType} from "../../redux/redux-store";
import {PostType, ProfileInfoType, ProfileType} from "../../Types/types";
type PropsTypes = {
    userProfile: ProfileType
    userId: number | null
    match: any
    status: string
    postsData: Array<PostType>
    addPost: (newPost: string) => void
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    saveAvatar: (photo: File) => void
    saveProfile: (profile: ProfileInfoType) => void
}
class ProfileContainer extends React.Component<PropsTypes> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if(!userId) userId = this.props.userId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsTypes) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) this.refreshProfile()
        if(prevProps.status !== this.props.status) this.setState({status: this.props.status})
    }
    render() {
        return <div>
            <Profile {...this.props} saveProfile={this.props.saveProfile} userProfile={this.props.userProfile}
                     saveAvatar={this.props.saveAvatar} status={this.props.status}
                     updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId}
                     postsData={this.props.postsData} addPost={this.props.addPost}/>
        </div>;
    }
}
let mapStateToProps = (state: AppStateType) => ({
    userProfile: getUserProfileS(state),
    status: getStatusS(state),
    userId: getUserIdS(state),
    isAuth: getIsAuthS(state),
    postsData: getPostsDataS(state)
})
export default compose<React.ComponentType>(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, saveAvatar, saveProfile, addPost: actions.addPost})
)(ProfileContainer)