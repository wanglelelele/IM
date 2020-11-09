import React, { useContext, useState, useEffect } from 'react'
import CurrentConversition from './components/conversition/CurrentConversition'
import SideBar from './components/layout/SideBar'
import Login from './components/login/Login'
import { Context } from './context'

import './app.less'
const App = () => {
    const { state, dispatch } = useContext(Context)
    useEffect(() => {
        onUpdateMsgList()
        ready()
    }, [])

    function onUpdateMsgList() {

    }

    function ready() {
        state.socket.on('message', (obj) => {
            console.log('msg', obj)
        })
    }
    return (
        <div className="container">
            {
                state.user.isLogin ? <div className="chat-wrapper">
                    <SideBar />
                    <CurrentConversition />
                </div> : <Login />
            }
        </div>
    )
}
export default App
