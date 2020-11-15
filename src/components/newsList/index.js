import tpl0 from './tpl/tpl0.tpl'
import tpl1 from './tpl/tpl1.tpl'
import tpl2 from './tpl/tpl2.tpl'
import tpl3 from './tpl/tpl3.tpl'
import wrapperTpl from './tpl/wrapper.tpl'

import './index.scss'
import { tplReplace } from '../../libs/utils'

export default {
    name: 'newsList',
    // 替换wrapperTpl中的内容
    wrapperTpl (top) {
        return tplReplace(wrapperTpl, {
            top
        })
        
    },
    // item的内容
    tpl (options) {
        // 解构出data和pageNum
        const { data, pageNum } = options
        let list = ''
        // 图片的数量是不同的，所以需要判断出需要的是哪个tpl
        let tpl = ''

        data.map( (item, index) => {
            if (!item.thumbnail_pic_s) {
                tpl = tpl0
            } else if(item.thumbnail_pic_s && !item.thumbnail_pic_s02) {
                tpl = tpl1
            } else if (item.thumbnail_pic_s02 && !item.thumbnail_pic_s03) {
                tpl = tpl2
            } else if(item.thumbnail_pic_s) {
                tpl = tpl3
            }

            list += tplReplace(tpl, {
                pageNum,
                index,
                uniqueKey: item.uniqueKey,
                url: item.url,
                title: item.title,
                author: item.author_name,
                date: item.date,
                thumbnail_pic_s: item.thumbnail_pic_s,
                thumbnail_pic_s02: item.thumbnail_pic_s02,
                thumbnail_pic_s03: item.thumbnail_pic_s03,
            })
        })
        return list
    },

    // 图片预加载
    imgShow () {
        const oImgs = document.querySelectorAll('img');
        // 这里为什么要必须加分号呢
        [...oImgs].map((img) => {
            img.onload = function() {
                img.style.opacity = '1'
            }
        })
    },

}
