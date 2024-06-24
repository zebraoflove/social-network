import {addMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getDialogsPage} from "../../redux/dialogsSelectors";
import {AppStateType} from "../../redux/redux-store";
let mapStateToProps = (state: AppStateType) => ({
    dialogsPage: getDialogsPage(state)
})
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage})
)(Dialogs)