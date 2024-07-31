import React, {useState} from "react";
import cn from "classnames"
import s from "../Paginator/Paginator.module.css";
import {Field, Form, Formik} from "formik";
import {validateFindPage} from "../../../Validations/ValidationFindPage";
import {Input_} from "../FormControls/FormControls";
import {FilterType, requestUsers} from "../../../redux/usersReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";
import {Button} from "antd";
import {RightOutlined, LeftOutlined, SearchOutlined} from "@ant-design/icons";
type PropsType = {
    totalUsersCount: number
    pageSize: number
    portionSize?: number
    currentPage: number
    filter?: FilterType
}
const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, portionSize = 10, currentPage,
                                            filter = {term: "", isFriend: "All"}}) => {
    const dispatch: AppDispatchType = useDispatch()
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
        dispatch(requestUsers(currentPage, pageSize, filter))
        setPortionNumber(portionNumber - 1)
    }
    const onNextPortion = () => {
        let currentPage = rightPortionPageNumber + 1
        dispatch(requestUsers(currentPage, pageSize, filter))
        setPortionNumber(portionNumber + 1)
    }
    const FindPage = () => {
        const onFindPage = (values: any) => {
            let currentPage = values.pageNumber
            dispatch(requestUsers(currentPage, pageSize, filter))
            setPortionNumber(Math.ceil(currentPage / portionSize))
        }
        return <Formik initialValues={{pageNumber: ''}} onSubmit={onFindPage}>
            {() => (
                <Form>
                    <Field validate={validateFindPage(pagesCount)} name="pageNumber" placeholder={`1...${pagesCount}`} component={Input_}/>
                    <button type='submit'>Find</button>
                </Form>
            )}
        </Formik>
    }
    const FindFilter = () => {
        const onChangeFilter = (values: FilterType) => {
            dispatch(requestUsers(1, pageSize, values))
        }
        return <Formik enableReinitialize initialValues={{term: filter.term, isFriend: filter.isFriend}} onSubmit={onChangeFilter}>
            {() => (
                <Form>
                    <Field name="term" placeholder={`Type username`} component={Input_}/>
                    <Field name="isFriend" as="select">
                        <option value="All">All</option>
                        <option value="Followed">Followed</option>
                        <option value="NotFollowed">Not followed</option>
                    </Field>
                    <button type="submit">Find</button>
                </Form>
            )}
        </Formik>
    }
    return <div className={s.pageNumbersArea}>
        {portionNumber > 1 && <Button className={s.arrows} onClick={onPrevPortion} icon={<LeftOutlined />}/>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p} className={cn({[s.selected] : currentPage === p}, s.pageNumbers)}
                             onClick={() => {dispatch(requestUsers(p, pageSize, filter))}}>{p}</span>
            })}
        {portionNumber < portionCount && <Button className={s.arrows} onClick={onNextPortion} classNames={s.arrow} icon={<RightOutlined />}/>}
        <FindPage/>
        <FindFilter/>
    </div>
}
export default Paginator