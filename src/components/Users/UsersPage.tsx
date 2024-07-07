import Users from "./Users";
import React from "react";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
const UsersPage = () => {
        return <Users/>
}
export default withAuthRedirect(UsersPage)