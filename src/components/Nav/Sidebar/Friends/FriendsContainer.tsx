import Friends from "./Friends";
import {connect} from "react-redux";
import {getUsersDataS} from "../../../../redux/dialogsSelectors";
import {AppStateType} from "../../../../redux/redux-store";
let mapStateToProps = (state: AppStateType) => {
    return {
        usersData: getUsersDataS(state)
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {

    }
}
const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer;