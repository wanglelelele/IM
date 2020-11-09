import React from 'react'
import MessageBubble from '../MessageBubble'
const TextElement = (props) => {
    return (
        <MessageBubble>
            <div>{props.payload.text}</div>
        </MessageBubble>
    )
}
export default TextElement