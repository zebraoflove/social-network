import s from './Sidebar.module.css';
import FriendsContainer from "./Friends/FriendsContainer";
const Sidebar = () => {
    return <div className={s.sidebar}>
        <div className={s.title}>FRIENDS</div>
        <FriendsContainer/>
    </div>
}

export default Sidebar;