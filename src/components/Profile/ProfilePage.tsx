import Profile from "./Profile";
import React from "react";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
const ProfilePage = () => {
        return <div>
            <Profile/>
        </div>
}
export default withAuthRedirect (ProfilePage)