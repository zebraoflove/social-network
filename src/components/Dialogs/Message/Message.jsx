import s from './Message.module.css'

const Message = (props) => {
    if (props.belong) return (
        <div className={s.right}>
            {props.text}
            <img className={s.round}
                 src="https://img.magic.ly/avatar/33547eb38887821615b356ba7c886643.webp?1640654585098"/>
        </div>)
    else return (
        <div className={s.left}>
            <img className={s.round}
                 src="https://yt3.ggpht.com/a/AGF-l79yWhq8XPpqNUxzW6rnzB41IRgVuTr6K2PxEQ=s900-c-k-c0xffffffff-no-rj-mo"/>
            {props.text}
        </div>)
}

export default Message