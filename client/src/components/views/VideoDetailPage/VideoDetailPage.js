import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {List, Row, Col, Avatar} from 'antd';
import axios from 'axios';

import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislike from './Sections/LikeDislike';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    const user = useSelector(state => state.user);

    const [video, setVideo] = useState([]); 
    const [comments, setComments] = useState([])

    useEffect(() => {
        const variable = {videoId: videoId};

        axios.post('/api/video/getVideo', variable)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.video)
                    //console.log(response)
                    setVideo(response.data.video)
                } else {
                    alert('정보 조회 실패')
                }
            })

        // 모든 commetn의 정보들을 DB에서 불러오기, 인자 값은 해당 video의 id
        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)

                    //console.log(response.data.comments)
                }else{
                    alert('정보 조회 실패')
                }
            })
        
    }, [videoId])

    const refreshFunction = (newComment) => {
        setComments(comments.concat(newComment))
    }

    // Video.writer 로딩 여부에 따라 렌더링을 다르게 설정
    if(video.writer){
        //console.log(user)
        //console.log(video.writer._id)  // 아이디 값

        const subscribeButton = video.writer._id !== user.userData._id && <Subscribe userTo={video.writer._id} userFrom={localStorage.getItem('ObjectId')} />


        return (
            <Row gutter={[16, 16]}>
    
                <Col lg={18} xs={24}>
    
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${video.filePath}`} controls />
    
                        <List.Item
                            actions={[<LikeDislike video userId={localStorage.getItem('userId')} video={videoId}/>, subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={video.writer.image}></Avatar>}
                                title={video.writer.name}
                                description={video.title}
                            />
    
                        </List.Item>
                        {/* Comment */}
                        <Comment postId={videoId} comments={comments} refreshFunction={refreshFunction}/> 
                    </div>
                </Col>
    
    
                <Col lg={6} xs={24}>
                    
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loding..</div>
        )
    }
}

export default VideoDetailPage;