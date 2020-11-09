import tpl from './index.tpl'           //ejsloader 这里的tpl是一个函数
import './index.scss'
import { tplReplace } from '../../libs/utils'

export default {
    name: 'Header',
    tpl (options) {
        // 从options里解构出来
        const { url, showLeftIcon, title, showRightIcon } = options
        // console.log('index.js', options);
        return tplReplace(tpl, {
            url,
            title,
            showLeftIcon: showLeftIcon ? 'block' : 'none',
            showRightIcon: showRightIcon ? 'block' : 'none'
        })
    }
}
