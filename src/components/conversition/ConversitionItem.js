import React, { useContext } from 'react'
import { Context } from '../../context'
import './ConversitionItem.less'
const ConversitionItem = ({conversitionID}) => {
    const { state, dispatch } = useContext(Context)
    function selectConversition() {
        // 获取会话信息
        dispatch({
            type: 'checkoutConversation',
            payload: { conversitionID }
        })
        // 更新当前会话
        // 获取消息列表

    }
    return (
        <div onClick={selectConversition} className="conversition-item-container">
            <div className="wrap">
                {/* <avator src="" /> */}
                <div className="content">{conversitionID}</div>
            </div>
        </div>
    )
}
export default ConversitionItem