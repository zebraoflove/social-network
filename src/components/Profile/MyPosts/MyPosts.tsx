import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {validatePost} from "../../../Validations/ValidationPost";
import {Textarea} from "../../Common/FormControls/FormControls";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../redux/profileReducer";
import {getPostsDataS} from "../../../redux/profileSelectors";
const MyPosts: React.FC = () => {
    const postsData = useSelector(getPostsDataS)
    let posts = postsData.map(p => <Post key={p.id} id={p.id} message={p.message} likes={p.likes}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPost/>
            {posts}
        </div>
    )
}
const NewPost: React.FC = () => {
    const dispatch = useDispatch()
    type ValuesType = {newPost: string}
    let AddPost = (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => {
        dispatch(actions.addPost(values.newPost))
        values.newPost = ""
        setSubmitting(false)
    }
    return <Formik initialValues={{newPost: ""}} onSubmit={AddPost}>
        {({isSubmitting}) => (
            <Form>
                <div>
                    <Field validate={validatePost(50)} component={Textarea} name="newPost"
                           placeholder="Enter your post"/>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>Add post</button>
                </div>
            </Form>
        )}
    </Formik>
}
export default MyPosts;