import React, {useState} from "react";
import cn from "classnames"
import s from "../Paginator/Paginator.module.css";
import {Field, Form, Formik} from "formik";
import {validateFindPage} from "../../../Validations/ValidationFindPage";
import {Textarea} from "../FormControls/FormControls";
import {FollowedType} from "../../../Types/types";
type PropsType = {
    totalUsersCount: number
    pageSize: number
    portionSize?: number
    currentPage: number
    term?: string
    isFriend?: FollowedType
    requestUsers: (currentPage:number, pageSize:number, term: string, isFriend: FollowedType)=>(void)
}
const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, portionSize = 10, currentPage,
                                            term = "", requestUsers, isFriend = 'All'}) => {
    let pagesCount: number = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount: number = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = (portionNumber) * portionSize
    const onPrevPortion = () => {
        let currentPage = leftPortionPageNumber - portionSize
        requestUsers(currentPage, pageSize, term, isFriend)
        setPortionNumber(portionNumber - 1)
    }
    const onNextPortion = () => {
        let currentPage = rightPortionPageNumber + 1
        requestUsers(currentPage, pageSize, term, isFriend)
        setPortionNumber(portionNumber + 1)
    }
    const FindPage = () => {
        const onFindPage = (values: any) => {
            let currentPage = values.pageNumber
            requestUsers(currentPage, pageSize, term, isFriend)
            setPortionNumber(Math.ceil(currentPage / portionSize))
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
    const FindTerm = () => {
        type ValuesType = {
            term: string
            isFriend: FollowedType
        }
        const onFindTerm = (values: ValuesType) => {
            let term = values.term
            let isFriend = values.isFriend
            requestUsers(1, pageSize, term, isFriend)
        }
        return <Formik initialValues={{term: term, isFriend: isFriend}} onSubmit={onFindTerm}>
            {() => (
                <Form>
                    <Field name="term" placeholder={`Type username`} component={Textarea}/>
                    <Field name="isFriend" as="select">
                        <option value="All">All</option>
                        <option value="Followed">Followed</option>
                        <option value="NotFollowed">Not followed</option>
                    </Field>
                    <button type="submit">FIND</button>
                </Form>
            )}
        </Formik>
    }
    return <div className={s.pageNumbers}>
        {portionNumber > 1 && <button onClick={onPrevPortion}>PREV</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p} className={cn({[s.selected] : currentPage === p})}
                             onClick={() => {requestUsers(p, pageSize, term, isFriend)}}>{p}</span>
            })}
        {portionNumber < portionCount && <button onClick={onNextPortion}>NEXT</button>}
        <FindPage/>
        <FindTerm/>
    </div>
}
export default Paginator