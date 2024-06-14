import React, {useState} from "react";
import cn from "classnames"
import s from "../Paginator/Paginator.module.css";
import {Field, Form, Formik} from "formik";
import {validateFindPage} from "../../../Validations/ValidationFindPage";
import {Textarea} from "../FormControls/FormControls";

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = (portionNumber) * props.portionSize

    const onPrevPortion = () => {
        let currentPage = leftPortionPageNumber - props.portionSize
        props.requestUsers(currentPage, props.pageSize)
        setPortionNumber(portionNumber - 1)
    }
    const onNextPortion = () => {
        let currentPage = rightPortionPageNumber + 1
        props.requestUsers(currentPage, props.pageSize)
        setPortionNumber(portionNumber + 1)
    }
    const FindPage = () => {
        const onFindPage = (values) => {
            let currentPage = values.pageNumber
            props.requestUsers(currentPage, props.pageSize)
            setPortionNumber(Math.ceil(currentPage / props.portionSize))
        }
        return <Formik initialValues={{pageNumber: ''}} onSubmit={onFindPage}>
            {() => (
                <Form>
                    <Field validate={validateFindPage(pagesCount)} name="pageNumber" placeholder={`1...${pagesCount}`} component={Textarea}/>
                    <button type="submit">FIND</button>
                </Form>
            )}
        </Formik>
    }
    return <div className={s.pageNumbers}>
        {portionNumber > 1 && <button onClick={onPrevPortion}>PREV</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p.id} className={cn({[s.selected] : props.currentPage === p})}
                             onClick={() => {props.requestUsers(p, props.pageSize)}}>{p}</span>
            })}
        {portionNumber < portionCount && <button onClick={onNextPortion}>NEXT</button>}
        <FindPage/>
    </div>
}
export default Paginator