import tpl from './index.tpl'
import './index.scss'
import { tplReplace } from '../../libs/utils'

export default {
    name: 'follow',
    // 状态的改变
    follow () {
        return tplReplace(tpl, {
            star: 'star'
        })
    },
    unfollow () {
        return tplReplace(tpl, {
            star: 'star-o'
        })
    },
    // 绑定事件处理函数
    bindEvent (doFollow) {
        const oFollow = document.querySelector('.follow')
        oFollow.addEventListener('click', this._setFollow.bind(this, oFollow, doFollow), false)

    },
    // 仅操作视图
    _setFollow (oFollow, doFollow) {
        const className = oFollow.className
        oFollow.className = 'follow iconfont icon-'
        switch (className) {
            case 'follow iconfont icon-star':
                oFollow.className += 'star-o'
                // 传参false，从followList中删除
                doFollow(false)
                break
            case 'follow iconfont icon-star-o':
                oFollow.className += 'star'
                // 传参true，收藏
                doFollow(true)
                break
            default:
                break
        }
    }
}
