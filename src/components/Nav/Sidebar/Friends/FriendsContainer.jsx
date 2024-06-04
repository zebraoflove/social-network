import Friends from "./Friends";
import {connect} from "react-redux";
let mapStateToProps = (state) => {
    return {
        usersData: state.dialogsPage.usersData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}
const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer;