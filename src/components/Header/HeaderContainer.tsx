import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";
import {getIsAuthS, getLoginS} from "../../redux/authSelectors";
type PropsType = {
    login: string | null
    isAuth: boolean
    logoutUser: ()=>(void)
}
class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth} logoutUser={this.props.logoutUser}/>
    }
}
let mapStateToProps = (state: AppStateType) => {
    return {
        login: getLoginS(state),
        isAuth: getIsAuthS(state)
    }
}
export default connect(mapStateToProps, {logoutUser})(HeaderContainer);