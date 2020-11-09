
import React,{useContext} from 'react'
import {Context} from '../../context'
import MessageSendbox from '../message/MessageSendBox'
import MessageItem from '../message/MessageItem'
import './CurrentConversition.less'
const CurrentConversition = (props) =>{
    const {state, dispatch} = useContext(Context)
    return (
        <div className="current-conversation">
            <div className="header">
                <div className="name">user1</div>
            </div>
            <div className="content">
                <div className="msg-list">
                    {state.messages.map((item, i)=>{
                        return <MessageItem key={item.ID} {...item}/>
                    })}
                </div>
            </div>
            <div className="footer">
                <MessageSendbox/>
            </div>
        </div>
    )
}
export default CurrentConversition