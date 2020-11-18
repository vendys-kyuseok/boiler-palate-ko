import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); //리플레시 방지

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert("Error")
                }
                console.log(response.payload.loginSuccess)
            })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'}}>
            
            <Form onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    LOGIN
                </button>
            </Form>

        </div>
    )
}

const Form = styled.form`
    display: flex;
    flex-Direction: column;
`

export default withRouter(LoginPage);