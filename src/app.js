import React, { useContext, useState, useEffect } from 'react'
import CurrentConversition from './components/conversition/CurrentConversition'
import SideBar from './components/layout/SideBar'
import Login from './components/login/Login'
import { Context } from './context'

import './app.less'
const App = () => {
    const { state, dispatch } = useContext(Context)
    const [init, setInit] = useState(false)
    useEffect(() => {
        onUpdateMsgList()
        // ready()
    }, [])

    function onUpdateMsgList() {

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
