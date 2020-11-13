import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'


export default function (SpecificComponent, option, adminRoute = null) {
    //SpecificComponent는 {Auth(LandingPage) }

    //option 값이 null이면 아무나 가능
    //           ture면 로그인한 유저만 가능
    //           false면 유저는 출입 불가
    
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 낳은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('login');
                    }
                }else{
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else {
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }

            })
            
        }, [])

        return(
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
