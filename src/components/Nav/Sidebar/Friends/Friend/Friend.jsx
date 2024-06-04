import s from './Friend.module.css';
const Friend = (props) => {
    if(props.id<=3) {
        return (
            <div className={s.item}>
                <img className={s.round} src={props.ava}/>
                <div>{props.name}</div>
            </div>)
    }
}

export default Friend;