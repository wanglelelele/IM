import React, { useMemo } from 'react'
import './Avatar.less'
const Avatar = ({ shape = 'circle', src = '', conversationType = 'C2C' }) => {
    const avatarSrc = useMemo(() => {
        if (/^(https:|http:|\/\/)/.test(src)) {
            return src
        } else {
            return defaultSrc()
        }
    }, [src])

    function defaultSrc() {
        switch (conversationType) {
            case 'C2C':
                // 个人头像
                return 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-2.png'
            case 'GROUP':
                // 群默认头像
                return 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-3.png'
            //   case this.TIM.TYPES.CONV_SYSTEM:
            //     return systemAvatar
            default:
                // 默认头像
                return 'https://imgcache.qq.com/open/qcloud/video/act/webim-avatar/avatar-1.png'
        }
    }
    return (
        <div className={shape === 'circle' ? 'shape-circle avatar' : 'avatar'}>
            <img src={avatarSrc} />
        </div>
    )
}
export default Avatar
