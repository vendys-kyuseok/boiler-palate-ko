import React, {useEffect, useState} from 'react';
import {Tooltip} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import Axios from 'axios';

function LikeDislike (props) {

    const variables = {}

    if(props.video){
        variables = {video: props.videoId, userId: props.userId}
    } else {
        variables = {commentId: props.commentId, userId: props.userId}
    }

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    useEffect(() => {
        Axios.post('/api/like/getLikes', variables)
        .then(response => {
            if(response.data.success){
                //얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length)
                //내가 이미 좋아요를 눌렇는지
                response.data.likes.map(like => {
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert('실패')
            }
        })

        useEffect(() => {
            Axios.post('/api/like/getDislikes', variables)
            .then(response => {
                if(response.data.success){
                    //얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length)
                    //내가 이미 싫어요를 눌렇는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId){
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('실패')
                }
            })
    }, []);

    return(
        <div>
            <span key='comment-basic-lkie'>
                <Tooltip title="Like">
                    <PlusOutlined type='like'
                        theme={LikeAction === "liked" ? "filled" : "outlined"}
                        onClick
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>

            <span key='comment-basic-dislkie'>
                <Tooltip title="Dislike">
                    <PlusOutlined type='dislike'
                        theme={DislikeAction === "disliked" ? "filled" : "outlined"}
                        onClick
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDislike