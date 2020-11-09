import React from 'react'
import './MessageBubble.less'
const MessageBubble = (props) =>{
    return (
        <div className="chat-bubble">
            {props.children}
        </div>
    )
}
export default MessageBubble