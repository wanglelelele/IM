
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context'
import MessageSendbox from '../message/MessageSendBox'
import MessageItem from '../message/MessageItem'
import './CurrentConversition.less'
const CurrentConversition = (props) => {
    const { state, dispatch } = useContext(Context)
    const [ init, setInit ] = useState(false)
    const msgList = useRef(null)
    useEffect(() => {
        msgList.current.scrollTop = msgList.current.scrollHeight
    })
    if (!init) {
        ready()
    }
    function ready() {
        console.log('state', state)
        setInit(true)

        state.socket.on('message', function (obj) {
            if(state.user.uid && state.user.uid !== obj.from){
                dispatch({ type: 'pushMessageList', payload: obj })
            }
        })
    }
    return (
        <div className="current-conversation">
            <div className="header">
                <div className="name">{state.currentConversition.userProfile.uid}</div>
            </div>
            <div className="content">
                <div className="msg-list" ref={msgList}>
                    {state.messages.map((item, i) => {
                        return <MessageItem key={item.ID} {...item} />
                    })}
                </div>
            </div>
            <div className="footer">
                <MessageSendbox />
            </div>
        </div>
    )
}
export default CurrentConversition