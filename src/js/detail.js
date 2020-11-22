// console.log('detail');
import './imports'
import header from '../components/header'
import newsFrame from '../components/iframe'
import follow from '../components/follow'
import { getUrlQueryValue } from '../libs/utils'

;((doc) => {
    const oApp = doc.querySelector('#app')
    const currentNews = JSON.parse(localStorage.getItem('currentNews'))
    console.log('currentNews', currentNews);
    // 如果localstorage中没有，则传入'[]'，就会解析成空数组（注意：这里不是'', 而是'[]'）
    const followList = JSON.parse(localStorage.getItem('followList') || '[]')

    const init = () => {
        render()
        bindEvent()
    }

    function render() {
        const headerTpl = header.tpl({
            // url: '/',
            url: getUrlQueryValue('path'),
            title: 'News Detail',
            showLeftIcon: true,
            showRightIcon: false
        })
        const newsFrameTpl = newsFrame.tpl(currentNews.url)
        const followTpl = createFollowTpl()
        oApp.innerHTML += (headerTpl + newsFrameTpl + followTpl)
    }

    // 渲染follow组件
    function createFollowTpl() {
        // console.log('followList', followList);
        const isExist = followList.find(item => item.uniquekey === currentNews.uniquekey);

        return isExist ? follow.follow() : follow.unfollow();
    }
    // 收藏事件
    function bindEvent () {
        follow.bindEvent(doFollow)
    }

    function doFollow (status) {
        // console.log('status', status);

        // 操作localstorage
        let followList = JSON.parse(localStorage.getItem('followList') || '[]')
        // console.log('followList2', followList);
        if(status) {
            followList.push(currentNews)
        } else {
            // 利用数组的filter方法，将不满足条件的排除掉
            followList = followList.filter((item) => item.uniquekey !== currentNews.uniquekey)
        }

        localStorage.setItem('followList', JSON.stringify(followList))
    }
    

    init()

})(document)
