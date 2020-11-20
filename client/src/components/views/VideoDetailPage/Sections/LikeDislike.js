import React, {useEffect, useState} from 'react';
import {Tooltip } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import Axios from 'axios';

function LikeDislike (props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variables = {}

    if(props.video){
        variables = {video: props.videoId, userId: props.userId}
    } else {
        variables = {commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variables)
        .then(response => {

            console.log('getLikes',response.data)

            if(response.data.success){
                //내가 좋아요를 많이 눌렀는지
                setLikes(response.data.likes.length)
                
                response.data.likes.map(like => {
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert('실패')
            }
        })
       
        Axios.post('/api/like/getDislikes', variables)
        .then(response => {
            console.log('getDislike',response.data)
            if(response.data.success){
                //내가 싫어요를 많이 눌렀는지
                setDislikes(response.data.dislikes.length)

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
    

// 좋아요 버튼 기능
    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('실패')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('실패')
                    }
                })
        }
    }

// 싫어요 버튼 기능
    const onDisLike = () => {
        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('실패')
                    }
                })
        } else {
            Axios.post('/api/like/upDisLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('실패')
                    }
                })
        }
    }


    return(
        <div>
            <span key='comment-basic-lkie'>
                <Tooltip title="Like">
                    <PlusOutlined type='like'
                        theme={LikeAction === "liked" ? "filled" : "outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>

            <span key='comment-basic-dislkie'>
                <Tooltip title="Dislike">
                    <PlusOutlined type='dislike'
                        theme={DislikeAction === "disliked" ? "filled" : "outlined"}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDislike