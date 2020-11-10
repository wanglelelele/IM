import React, { createContext, useReducer } from 'react'
import io from 'socket.io-client'
const initialVal = {
    user: {
        uname: '',
        uid: '',
        isLogin: false
    },
    socket: io({
        // path: 'http://localhost:3300',
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        timeout: 20000,
        autoConnect: true,
    }),
    // 消息数据
    messages: [],
    // 会话列表
    conversitions: [],
    // 会话类型 群 个人
    currentConversition: {
        currentConversitionId: '',
        currentConversationType: '',
        lastMessage: {},
        userProfile: {
            uid: ''
        }
    }
}
const actions = new Map([
    ['checkoutConversation', getConversition],
    ['getConversitionList', getConversitionList]

])
const Context = createContext(null)
const reducer = (state, action) => {
    switch (action.type) {
        case 'getConversitionList':
            return {
                ...state,
                conversitions: [{
                    conversitionType: 'C2C',
                    conversitionID: 'C2Cuser0',
                    lastMessage: {},
                    userProfile: {
                        uid: 'user0'
                    }
                }, {
                    conversitionType: 'C2C',
                    conversitionID: 'C2Cuser1',
                    lastMessage: {},
                    userProfile: {
                        uid: 'user1'
                    }
                }, {
                    conversitionType: 'GROUP',
                    conversitionID: 'GROUP1',
                    lastMessage: {},
                    userProfile: {
                        uid: 'group1'
                    }
                }]
            }
        case 'getMessageList':
            return {
                ...state,
                messages: [{
                    ID: "C2Cuser1-3933380001-97893043-1",
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
                    payload: { text: "你好" },
                    protocol: "JSON",
                    random: 97893043,
                    sequence: 3933380001,
                    status: "success",
                    time: 1604367218,
                    to: "user1",
                    type: "IMTextElem",
                }, {
                    ID: "C2Cuser1-3934570001-30813017-0",
                    clientSequence: 3934570001,
                    conversationID: "C2Cuser1",
                    conversationSubType: undefined,
                    conversationType: "C2C",
                    flow: "in",
                    from: "user1",
                    isPlaceMessage: 0,
                    isRead: true,
                    isResend: false,
                    isRevoked: false,
                    isSystemMessage: false,
                    messagePriority: 0,
                    payload: { text: "hi" },
                    protocol: "JSON",
                    random: 30813017,
                    sequence: 3934570001,
                    status: "success",
                    time: 1604367297,
                    to: "user0",
                    type: "IMTextElem"
                }]
            }
        case 'checkoutConversation':
            const currentConversition = state.conversitions.find(item => {
                return item.conversitionID === action.payload.conversitionID
            })
            return {
                ...state,
                currentConversition
            }
        case 'pushMessageList':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case 'login':
            return {
                ...state,
                user: action.payload
            }
        default: return state

    }
}
function getConversition(id) {
    // return 

}
function getConversitionList() {
    return new Promise((resolve, reject) => {
        resolve([{
            conversitionType: 'C2C',
            conversitionID: 'C2Cuser1',
        }, {
            conversitionType: 'GROUP',
            conversitionID: 'GROUPgroup1',
        }])
    })
}


const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialVal)
    return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
}
export { Context, ContextProvider }