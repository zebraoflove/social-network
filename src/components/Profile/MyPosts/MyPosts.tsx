import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";
import {Field, Form, Formik} from "formik";
import {validatePost} from "../../../Validations/ValidationPost";
import {Textarea} from "../../Common/FormControls/FormControls";
import {PostType} from "../../../Types/types";
type PostsPropsType = {
    postsData: Array<PostType>
    addPost: (newPost: string) => void
}
const MyPosts: React.FC<PostsPropsType> = ({postsData, addPost}) => {
    let posts = postsData.map(p => <Post key={p.id} id={p.id} message={p.message} likes={p.likes}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPost addPost={addPost}/>
            {posts}
        </div>
    )
}
type NewPostPropsType = {addPost: (newPost: string) => void}
const NewPost: React.FC<NewPostPropsType> = ({addPost}) => {
    type ValuesType = {newPost: string}
    let AddPost = (values: ValuesType, {setSubmitting}: any) => {
        addPost(values.newPost)
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