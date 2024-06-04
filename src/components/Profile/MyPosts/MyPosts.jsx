import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";
import {Field, Form, Formik} from "formik";
import {validatePost} from "../../../Validations/ValidationPost";
import {Textarea} from "../../Common/FormControls/FormControls";
const MyPosts = props => {
    let posts = props.postsData.map(p => <Post key={p.id} message={p.message} likes={p.likes}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPost addPost={props.addPost}/>
            {posts}
        </div>
    )
}
const NewPost = (props) => {
    let addPost = (values, {setSubmitting}) => {
        props.addPost(values.newPost)
        values.newPost = ""
        setSubmitting(false)
    }
    return <Formik initialValues={{newPost: ""}} onSubmit={addPost}>
        {({errors, touched, isValidating, isSubmitting}) => (
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