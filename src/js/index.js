// console.log('index');
import './imports'

// import service from  '../service/index'

// async function getNewsList() {
//     const data = await service.getNewsList('top', 10)
//     console.log(data);
// }

// getNewsList()

import header from '../components/header'
import navBar from '../components/navBar'

// 这里解构
import { NEWS_TYPE } from '../data/index'

// 一般入口文件都是个模块，所以可以用立即执行函数包一下，证明其是一个整体
;((doc) => {
    // ???? querySelector
    const oApp = doc.querySelector('#app')

    const init = () => {
        render()
    }

    function render() {
        const headerTpl = header.tpl({
            url: '/',
            title: 'News Top',
            showLeftIcon: false,
            showRightIcon: true
        })

        const navBarTpl = navBar.tpl(NEWS_TYPE)

        oApp.innerHTML += (headerTpl + navBarTpl)
    }

    init()
})(document)
