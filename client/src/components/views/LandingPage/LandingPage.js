import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';
const {Title} = Typography;
const {Meta} = Card;

function LandingPage(props) {

    // useEffect(() => {
    //     Axios.get('/api/hello')
    //     .then(response => console.log(response))
    // }, [])

    // const onClickHendler = () => {
    //     Axios.get('/api/users/logout')
    //     .then(response => {
    //         //console.log(response.data)
    //         if(response.data.success) {
    //             props.history.push('/login')
    //         } else {
    //             alert('로그아웃 실패')
    //         }
    //     })
    // }
    // ---------------------------------------------- //


    const [Video, setVideo] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getvideos')
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

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/post/${video._id}`} >   {/* 영상 하나의 다른 페이지 이동 */}
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />{/* 썸네일 */}
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span> {/* 파일 시간 */}
                </div>
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

export default withRouter(LandingPage);