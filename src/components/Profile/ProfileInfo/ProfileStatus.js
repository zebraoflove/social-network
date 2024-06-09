import React, {useEffect, useState} from "react";
const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateEditMode = () => {
        if(props.isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return <div>
        <b>Status: </b>{!editMode && <span onDoubleClick={activateEditMode}>{props.status || "Empty status"}</span>}
        {editMode && <input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status}/>}
    </div>
}
export default ProfileStatus;