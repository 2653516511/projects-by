import itemTpl from './tpl/item.tpl'
import wrapperTpl from './tpl/index.tpl'
import './index.scss'

import { tplReplace } from '../../libs/utils'

export default {
    name: 'navBar',
    tpl (data) {
        let itemList = ''

        // 这里用了一个技巧，直接将item解构出来
        data.map(({ title, type }, index) => {
            itemList += tplReplace(itemTpl, {
                // index为0时，是第一个，是聚焦的，给他加一个current类
                isCurrent: !index ? 'current' : '',
                title,
                type
            })
        })

        return tplReplace(wrapperTpl, {
            itemList,
            wrapperW: .6 * data.length
        })
    }
}
