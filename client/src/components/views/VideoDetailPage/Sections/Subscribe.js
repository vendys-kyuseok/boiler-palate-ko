import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Subscribe(props) {
    
    // 비디오를 구독한 유저의 수
    const [subscribeNumber, setSubscribeNumber] = useState(0);
    // 비디오를 구독한 유저의 수
    const [subscribed, setsubscribed] = useState(false);

    useEffect(() => {

        let variable = {userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data.subscribeNumber)
                setSubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('구독자 수 정보 조회 실패')
            }
        })

        let subvariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')}

        Axios.post('/api/subscribe/subscribed', subvariable)
        .then(response => {
            if(response.data.success){
                setsubscribed(response.data.subscribed)
            }else{
                alert('실패')
            }
        })

    }, [])

    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        // 구독 중이면
        if(subscribed){

            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(subscribeNumber - 1)
                    setsubscribed(!subscribed)
                }else{
                    alert('구독 취고 안됨')
                }
            })

        }else{
            // 구독 중이 아니면
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(subscribeNumber + 1)
                    setsubscribed(!subscribed)
                }else{
                    alert('구독 안됨')
                }
            })
        }
    }

    return(
        <SubButton onClick={onSubscribe} subscribed={subscribed}>
            {subscribeNumber} {subscribed ? 'subscribed' : 'subscribe'}
        </SubButton>
    )
}

const SubButton = styled.button`
        border-Radius: 4px;
        color: white;
        font-Size: 1rem;
        textTransform: uppercase;
        fontWeight: 500;
        padding: 10px, 16px;
        borderColor: #CC0000;

        background-Color: ${props => props.subscribed ? '#AAAAAA' : '#CC0000}'};
    `;

export default Subscribe;


// styled component 
