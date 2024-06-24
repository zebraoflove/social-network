import s from './Post.module.css'
import React from "react";
import {PostType} from "../../../../Types/types";
const Post: React.FC<PostType> = ({message, likes}) => {
    return <div>
        <div className={s.item}>
            <img src='https://img.magic.ly/avatar/33547eb38887821615b356ba7c886643.webp?1640654585098'/>
            <span>{message}</span>
        </div>
        <span className={s.likes}>{likes} like(s)</span>
    </div>
}
export default Post;