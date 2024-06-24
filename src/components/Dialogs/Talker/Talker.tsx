import s from './Talker.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
type PropsType = {
    id: number
    ava: string
    name: string
}
const Talker: React.FC<PropsType> = ({id, ava, name}) => {
    return (
        <div>

            <NavLink to={"/dialogs/"+id} className={navData => navData.isActive ? s.active : s.user}>
                <img className={s.round} src={ava}/>
                {name}
            </NavLink>
        </div>
    )
}

export default Talker