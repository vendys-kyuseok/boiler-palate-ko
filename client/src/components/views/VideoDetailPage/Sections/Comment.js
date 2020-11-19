import Axios from 'axios';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment';

function Comment (props) {

    const videoId = props.postId;
    const user = useSelector(state => state.user)
    const [commentValue, setCommentValue] = useState("")

    const handleCilck = (e) => {
        setCommentValue(e.currentTarget.value)
    }// 입력 가능

    const onSubmit = (e) => {
        // 리 플레시 방지
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                props.refreshFunction(response.data.result)
                //console.log(response.data.result)
                setCommentValue("")
            }else{
                alert('댓글 저장 실패')
            }
        })
    }

    return(
        <div>
            <br />
            <p>댓글</p>
            <hr />
            {/* {console.log(props.comments)} */}

            {/* comment list */}
            {props.comments && props.comments.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <>
                        <SingleComment 
                            postId={videoId} 
                            comment={comment} 
                            refreshFunction={props.refreshFunction}/>
                        </>
                        <>
                        <ReplyComment 
                            postId={videoId} 
                            comments={props.comments} 
                            parentCommentId={comment._id} 
                            refreshFunction={props.refreshFunction}/>
                        </>
                    </React.Fragment>
                )
            ))}

            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleCilck}
                    value={commentValue}
                    placeholder='코멘트를 작성하시오'
                />

                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment;