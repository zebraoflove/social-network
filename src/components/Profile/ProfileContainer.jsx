import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, saveAvatar, saveProfile} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if(!userId) userId = this.props.userId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) this.refreshProfile()
        if(prevProps.status !== this.props.status) this.setState({status: this.props.status})
    }
    render() {
        return <div>
            <Profile {...this.props} saveProfile={this.props.saveProfile} userProfile={this.props.userProfile}
                     saveAvatar={this.props.saveAvatar} status={this.props.status}
                     updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId}/>
        </div>;
    }
}
let mapStateToProps = (state) => ({
    userProfile: state.profilePage.userProfile,
    status: state.profilePage.status,
    userId: state.auth.id,
    isAuth: state.auth.isAuth
})
export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, saveAvatar, saveProfile})
)(ProfileContainer)