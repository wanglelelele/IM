import React, { useContext, useRef, useState } from 'react'
import { Context } from '../../context'
import Upload from '../../utils/upload'
import './MessageSendBox.less'
import pictureImage from '../../assets/image/picture.png'
import fileImage from '../../assets/image/file.png'

const MessageSendBox = () => {
    const imagePicker = useRef(null)
    const [text, updateText] = useState('')
    const { state, dispatch } = useContext(Context)
    function onContentChange(e) {
        updateText(e.target.value)
    }
    function onKeyDown(e) {
        if (event.key === 'Enter') {
            sendMsg()
        }
    }
    function sendMsg() {
        const msgContent = createTextMessage(text)
        dispatch({ type: 'pushMessageList', payload: msgContent })
        state.socket.emit('message', msgContent)
        updateText('')
    }

    function createTextMessage(text) {
        return {
            ID: "C2Cuser1-3933380001-97893043-9",
            clientSequence: 3933380001,
            conversationID: "C2Cuser1",
            conversationSubType: undefined,
            conversationType: "C2C",
            flow: "out",
            from: "user0",
            isPlaceMessage: 0,
            isRead: true,
            isResend: false,
            isRevoked: false,
            isSystemMessage: false,
            messagePriority: 0,
            payload: { text },
            protocol: "JSON",
            random: 97893043,
            sequence: 3933380001,
            status: "success",
            time: 1604367218,
            to: "user1",
            type: "IMTextElem",
        }
    }
    function handleSendImageClick() {
        imagePicker.current.click()
    }
    function handleSendFileClick() {

    }
    function sendImage(e) {
        new Upload(e.target.files[0], (res) => {
            const imgContent = {
                flow: "out",
                to: "user1",
                from: "user0",
                conversationType: "C2C",
                payload: {
                    file: res
                },
                type: "IMImageElem",
            }
            dispatch({ type: 'pushMessageList', payload: imgContent })
            state.socket.emit('message', imgContent)
        })
    }
    return (
        <div className="message-send-box-wrapper">
            <div className="header-bar">
                <i className="icon icon-image" title="发图片" onClick={handleSendImageClick}>
                    <img src={pictureImage} />
                </i>
                <i className="icon icon-file" title="发文件" onClick={handleSendFileClick}>
                    <img src={fileImage} />
                </i>
            </div>
            <div className="bottom-content">
                <textarea
                    value={text}
                    className="input-box"
                    // onKeyDown={onKeyDown}
                    onChange={onContentChange}>
                </textarea>
                <div className="send-container">
                    <div onClick={sendMsg} className="send-box"></div>
                </div>
            </div>
            <input
                id="imagePicker"
                type="file"
                ref={imagePicker}
                accept=".jpg, .jpeg, .png, .gif"
                onChange={sendImage}
                style={{ display: "none" }}
            />
        </div>
    )
}
export default MessageSendBox