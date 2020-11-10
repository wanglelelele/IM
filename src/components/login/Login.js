import React, { useState, useContext } from 'react'
import { Context } from '../../context'
import './Login.less'
export default () => {
    const [userID, setUserID] = useState('user0')
    const { state, dispatch } = useContext(Context)
    function selectUser(e) {
        setUserID(e.target.value)
    }
    function login() {
        console.log('user', userID)
        dispatch({ type: 'login', payload: { uid: userID, isLogin: true } })
    }
    return (
        <div className="login-wrapper">
            <select onChange={selectUser}>
                <option value="user0">user0</option>
                <option value="user1">user1</option>
            </select>
            <br />
            <button onClick={login}>登录</button>
        </div>
    )
}