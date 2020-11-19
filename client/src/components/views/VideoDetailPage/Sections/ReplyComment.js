import React, {useEffect, useState} from 'react';
import SingleComment from './SingleComment';

function ReplyComment (props) {

    const [CiledCommentNum, setCiledCommentNum] = useState(0);
    const [openReplyComment, setopenReplyComment] = useState(false);

    useEffect(() => {

        let commentNumber = 0;
        props.comments.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                console.log(comment.responseTo === props.parentCommentId)
                commentNumber++
            }
        })

        setCiledCommentNum(commentNumber)
    }, [props.comments, props.parentCommentId])

    let renderReplyCommnets = parentCommentId => 
        props.comments.map((comment, index) => (
            <React.Fragment>
                {/* 부모 comment의 id와 responseTo가 같은 comment만 보이도록 설정  */}
                {comment.responseTo === parentCommentId &&

                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment 
                            postId={props.postId} 
                            comment={comment} 
                            refreshFunction={props.refreshFunction}/>

                        <ReplyComment 
                            postId={props.postId} 
                            comments={props.comments} 
                            parentCommentId={comment._id}
                            refreshFunction={props.refreshFunction}/>
                    </div>
                }
            </React.Fragment>
        ))
    

    const handleClick = () => {
        setopenReplyComment(!openReplyComment);
        console.log(openReplyComment)
    }

    return(
        <div>
            {CiledCommentNum > 0 && (
                <p style={{ fontSize: '14px', margin: 0, color: 'grey' }} 
                    onClick={handleClick} >
                    View {CiledCommentNum} more comment(s)
                </p>
                )}
                {openReplyComment && renderReplyCommnets(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment;