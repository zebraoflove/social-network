import s from './Friends.module.css';
import Friend from "./Friend/Friend";
import {TalkerType} from "../../../../Types/types";
import React from "react";
type PropsType = {
    usersData: Array<TalkerType>
}
const Friends: React.FC<PropsType> = ({usersData}) => {
    let friends = usersData.map(f => <Friend key={f.id} name={f.name} ava={f.ava} id={f.id}/>)
    return <div className={s.friendsBlock}>
        {friends.filter(f => (f.props.id<=3))}
    </div>
}
export default Friends;