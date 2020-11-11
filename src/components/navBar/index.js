import itemTpl from './tpl/item.tpl'
import wrapperTpl from './tpl/index.tpl'
import './index.scss'

import { tplReplace, scrollToTop } from '../../libs/utils'

export default {
    name: 'navBar',
    // 菜单点击事件中用到，索引index
    _curIndex: 0,
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
    },
    bindEvent(setType) {
        const oNavBar = document.querySelector('.nav')
        const oNavItems = document.querySelectorAll('.item')

        oNavBar.addEventListener('click', this._setNav.bind(this, oNavItems, setType), false)
    },
    _setNav(items, setType) {
        console.log('arguments', arguments);
        
        // ????target被挤到第[2]位了
        const tar = arguments[2].target;
        // 注意，这里去掉前后的空格，防止if里的判断不成立
        const className = tar.className.trim()
        // console.log('classname', className)

        if(className === 'item') {
            // 页面中的 data-type 中的type
            const type = tar.dataset.type
            setType(type)
            scrollToTop()

            items[this._curIndex].className = 'item'
            this._curIndex = [].indexOf.call(items, tar)
            items[this._curIndex].className += ' current'
        }
    }
}
