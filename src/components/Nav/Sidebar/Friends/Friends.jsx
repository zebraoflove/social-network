import s from './Friends.module.css';
import Friend from "./Friend/Friend";
const Friends = (props) => {
    let friends = props.usersData.map(f => <Friend key={f.id} name={f.name} ava={f.ava} id={f.id}/>)
    return <div className={s.friendsBlock}>
        {friends}
    </div>
}
export default Friends;