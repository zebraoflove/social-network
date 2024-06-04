import s from './Talker.module.css'
import {NavLink} from "react-router-dom";

const Talker = (props) => {
    return (
        <div>

            <NavLink to={"/dialogs/"+props.id} className={navData => navData.isActive ? s.active : s.user}>
                <img className={s.round} src={props.ava}/>
                {props.name}
            </NavLink>
        </div>
    )
}

export default Talker