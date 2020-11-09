import React, { useContext } from 'react'
import ConversitionItem from './ConversitionItem'
import { Context } from '../../context'

import './ConversitionList.less'
const ConversitionList = (props) => {
    const { state, dispatch } = useContext(Context)
    return (
        <div>
            {state.conversitions.map((con, i) => {
                return <ConversitionItem key={i} {...con} />
            })}
        </div>
    )
}
export default ConversitionList