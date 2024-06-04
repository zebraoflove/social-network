import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) userId = this.props.userId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status) this.setState({status: this.props.status})
    }
    render() {
        return <div>
            <Profile {...this.props} userProfile={this.props.userProfile} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
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
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus})
)(ProfileContainer)