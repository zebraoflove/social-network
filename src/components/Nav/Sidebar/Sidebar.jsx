import s from './Sidebar.module.css';
import FriendsContainer from "./Friends/FriendsContainer";

const Sidebar = (props) => {
    return <div className={s.sidebar}>
        <div className={s.title}>FRIENDS</div>
        <FriendsContainer usersData={props.usersData}/>
    </div>
}

export default Sidebar;