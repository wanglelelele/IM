import React, {useMemo} from 'react'
import TextElem from './messageElements/TextElement'
import ImageElem from './messageElements/ImageElement'
import GroupTipElem from './messageElements/GroupTipElement'
import GroupSystemNoticeElem from './messageElements/GroupSystemNoticeElement'
import Avatar from '../Avatar'
import './Messageitem.less'

const MessageItem = (props) => {
    const map = new Map([
        ['IMTextElem', <TextElem {...props} />],
        ['IMImageElem', <ImageElem {...props} />],
        ['GroupTipElem', <GroupTipElem {...props} />],
        ['GroupSystemNoticeElem', <GroupSystemNoticeElem {...props} />]
    ])
    const isMine = useMemo(()=>{
        return props.flow === 'out'
    },[props.flow])
    return (
        <div className={isMine ? "position-right message-wrapper" : 'position-left message-wrapper'}>
            <div className="avatar-container">
                <Avatar {...props}/>
            </div>
            <div className="message-content">
                {
                    map.get(props.type)
                }
            </div>
        </div>
    )
}
export default MessageItem