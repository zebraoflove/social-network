import React, {ChangeEvent, useEffect, useState} from "react";
type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (newStatus: string) => void
}
const ProfileStatus: React.FC<PropsType> = ({status, isOwner, updateStatus}) => {
    let [editMode, setEditMode] = useState(false)
    let [newStatus, setNewStatus] = useState(status)
    useEffect(() => {
        setNewStatus(status)
    }, [status])
    const activateEditMode = () => {
        if(isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }
    return <div>
        <b>Status: </b>{!editMode && <span onDoubleClick={activateEditMode}>{newStatus || "Empty status"}</span>}
        {editMode && <input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={newStatus}/>}
    </div>
}
export default ProfileStatus;