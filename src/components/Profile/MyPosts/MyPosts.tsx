import s from './MyPosts.module.css';
import Post from './Post/Post';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../redux/profileReducer";
import {getPostsDataS} from "../../../redux/profileSelectors";
import {Button, Input, Space} from "antd";
import {SendOutlined} from "@ant-design/icons";
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
    const [newPost, setNewPost] = useState('')
    const dispatch = useDispatch()
    const onAddPost = () => {
        dispatch(actions.addPost(newPost))
        setNewPost('')
    }
    return (
        <Space>
            <Space.Compact>
                <Input.TextArea showCount maxLength={50} autoSize onChange={e => {setNewPost(e.currentTarget.value)}} placeholder="Enter new post" value={newPost}/>
                <Button onClick={onAddPost} icon={<SendOutlined />}/>
            </Space.Compact>
        </Space>
    )
    /*<Formik initialValues={{newPost: ""}} onSubmit={AddPost}>
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
    </Formik>*/
}
export default MyPosts;