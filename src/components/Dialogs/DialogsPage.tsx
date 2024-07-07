import Dialogs from "./Dialogs";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import React from "react";
const DialogsPage = () => {
    return <Dialogs/>
}
export default withAuthRedirect (DialogsPage)