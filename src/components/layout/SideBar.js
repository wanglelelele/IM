import React, { useEffect, useContext } from 'react'
import ConversitionList from '../conversition/ConversitionList'
import { Context } from '../../context'
import './SideBar.less'
const SideBar = (props) => {
    const {state, dispatch} = useContext(Context)

    useEffect(()=>{
        getConversitionList()
    },[])
    function getConversitionList(){
        dispatch({
            type: 'getConversitionList',
            payload: { uid: state.user.uid }
        })
    }
    return (
        <div className="side-bar">
            <div className="side-bar-left"></div>
            <div className="side-bar-right">
                <ConversitionList />
            </div>

        </div>
    )
}
export default SideBar