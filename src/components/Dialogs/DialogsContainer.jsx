import {addMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
let mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage
})
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage})
)(Dialogs)