import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {List, Row, Col, Avatar} from 'antd';
import axios from 'axios';

import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId;
    const [video, setVideo] = useState([]); 
    const user = useSelector(state => state.user);

    useEffect(() => {
        const variable = {videoId: videoId};

        axios.post('/api/video/getVideo', variable)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

    // Video.writer 로딩 여부에 따라 렌더링을 다르게 설정
    if(video.writer){
        console.log(user)
        console.log(video.writer._id)  // 아이디 값

        const subscribeButton = video.writer._id !== user.userData._id && <Subscribe userTo={video.writer._id} userFrom={localStorage.getItem('ObjectId')} />
        //console.log(subscribeButton)

        return (
            <Row gutter={[16, 16]}>
    
                <Col lg={18} xs={24}>
    
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${video.filePath}`} controls />
    
                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={video.writer.image}></Avatar>}
                                title={video.writer.name}
                                description={video.title}
                            />
    
                        </List.Item>
                        {/* Comment */}
                        <Comment/>
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