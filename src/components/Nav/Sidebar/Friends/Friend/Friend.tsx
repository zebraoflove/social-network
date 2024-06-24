import s from './Friend.module.css';
import React from "react";
import {TalkerType} from "../../../../../Types/types";
const Friend: React.FC<TalkerType> = ({id, name, ava}) => {
        return (
            <div className={s.item}>
                <img className={s.round} src={ava}/>
                <div>{name}</div>
            </div>)
    }
export default Friend;