import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatusS} from "../../../redux/profileSelectors";
import {updateStatus} from "../../../redux/profileReducer";
import {AppDispatchType} from "../../../redux/redux-store";
type PropsType = {
    isOwner: boolean
}
export const ProfileStatus: React.FC<PropsType> = ({isOwner}) => {
    const status = useSelector(getStatusS)
    const dispatch: AppDispatchType = useDispatch()
    let [editMode, setEditMode] = useState(false)
    let [newStatus, setNewStatus] = useState(useSelector(getStatusS))
    useEffect(() => {
        setNewStatus(status)
    }, [status])
    const activateEditMode = () => {
        if(isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(newStatus))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }
    return <div>
        <b>Status: </b>{!editMode && <span onDoubleClick={activateEditMode}>{newStatus || "Empty status"}</span>}
        {editMode && <input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={newStatus}/>}
    </div>
}