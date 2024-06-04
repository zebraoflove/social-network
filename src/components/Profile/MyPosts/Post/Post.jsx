import s from './Post.module.css'

const Post = (props) => {
    return <div>
        <div className={s.item}>
            <img src='https://img.magic.ly/avatar/33547eb38887821615b356ba7c886643.webp?1640654585098'/>
            <span>{props.message}</span>
        </div>
        <span className={s.likes}>{props.likes} like(s)</span>
    </div>
}

export default Post;