import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';
import styled from 'styled-components'

const {Title} = Typography;
const {Meta} = Card;


function SubscriptionPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() => {

        const subscriptionVariables = {
            userFrom : JSON.parse(localStorage.getItem("userId"))
        }
        console.log(subscriptionVariables)

        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setVideo(response.data.videos)
                } else {
                    alert(' 불러오기 실패 ')
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col key={index} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >   {/* 영상 하나의 다른 페이지 이동 (아이디 값으로) */}
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />{/* 썸네일 */}
                <Duration>
                    <span>{minutes} : {seconds}</span> {/* 파일 시간 */}
                </Duration>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span> views -
            <span> {moment(video.createdAt).format("MMM Do YY")} </span>{/* 업데이트 한 날짜 */}
        </Col>

    })
 
    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2} > Recommended </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>

            {/* <button onClick={onClickHendler}>Logout</button> */}
        </div>
    )
}

const Duration = styled.div`
bottom: 0;
right: 0;
position: absolute;
margin: 4px;
                    
color: #fff;
background-Color: rgba(17, 17, 17, 0.8);
opacity: 0.8;
                    
padding: 2px 4px; 
border-Radius: 2px;
letter-Spacing:0.5px;
font-Size: 12px;
                    
font-Weight: 500;
line-Height: 12px;
`


export default withRouter(SubscriptionPage);