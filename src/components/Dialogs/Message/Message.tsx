import s from './Message.module.css'
import React from "react";
type PropsType = {
    text: string
    belong: boolean
}
const Message: React.FC<PropsType> = ({text, belong}) => {
    if (belong) return (
        <div className={s.right}>
            {text}
            <img className={s.round}
                 src="https://img.magic.ly/avatar/33547eb38887821615b356ba7c886643.webp?1640654585098"/>
        </div>)
    else return (
        <div className={s.left}>
            <img className={s.round}
                 src="https://yt3.ggpht.com/a/AGF-l79yWhq8XPpqNUxzW6rnzB41IRgVuTr6K2PxEQ=s900-c-k-c0xffffffff-no-rj-mo"/>
            {text}
        </div>)
}

export default Message