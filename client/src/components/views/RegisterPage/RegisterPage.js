import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); //리플레시 방지

        if(Password !== ConfirmPassword) {
            return alert("비번은 서로 일치 해야함")
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert("Error")
                }
            })
    }
    return (
        <Div>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">
                    REGISTER
                </button>
            </form>
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    justify-Content: center; 
    align-Items: center;
    width: 100%;
    height: 100vh;
`

export default withRouter(RegisterPage);