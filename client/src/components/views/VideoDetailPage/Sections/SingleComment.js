import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Comment, Avatar, Input} from 'antd';
import Axios from 'axios';
import LikeDislike from './LikeDislike';

const {Title} = Input;

function SingleComment(props) {

    //const videoId = props.postId;
    const user = useSelector(state => state.user)
    const [commentValue, setCommentValue] = useState("") 
    const [openReply, setopenReply] = useState(false)

    const onhandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }// 입력 가능

    const onSubmit = (e) => {
        // 리 플레시 방지
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        //console.log(props.comment._id)

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                setCommentValue('')
                setopenReply(false)
                props.refreshFunction(response.data.result)
                //console.log(response.data.result)
            }else{
                alert('댓글 저장 실패')
            }
        })
    }
    
    const onClickOpenReply = () => {
        setopenReply(!openReply)
        console.log(openReply)
    }

    const actions = [
        <LikeDislike userId={localStorage.getItem('userId')} commentId={props.comment._id}/>,
        <span onClick={onClickOpenReply} key='comment-basic-reply-to'>숨김</span>
    ]

    return (
        <div>
            {console.log(props.comment)}

            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt='image'/>}
                content={<p>{props.comment.content} </p>}
            />

            {openReply &&
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <textarea 
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={onhandleChange}
                        value={commentValue}
                        placeholder='코멘트를 작성하시오'
                    />

                    <br />
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment;