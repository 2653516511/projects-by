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
import NewsList from '../components/newsList'
import pageLoading from '../components/pageLoading'

// 这里解构
import { NEWS_TYPE } from '../data/index'
import service from '../service';

// 一般入口文件都是个模块，所以可以用立即执行函数包一下，证明其是一个整体
;((doc) => {
    // ???? querySelector
    const oApp = doc.querySelector('#app')
    let oListWrapper = null

    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,
        // isLoading: true,
    }
    const newsData = {}

    const init = async () => {
        render()
        // setNewsList执行完之后才能执行bindEvent
        await setNewsList()
        bindEvent()
    }

    function bindEvent() {
        navBar.bindEvent(setType)
    }

    function render() {
        const headerTpl = header.tpl({
            url: '/',
            title: 'News Top',
            showLeftIcon: false,
            showRightIcon: true
        })

        const navBarTpl = navBar.tpl(NEWS_TYPE)

        const listWrapperTpl = NewsList.wrapperTpl(82)

        oApp.innerHTML += (headerTpl + navBarTpl + listWrapperTpl)
        oListWrapper = oApp.querySelector('.news-list')
        console.log('oListWrapper', oListWrapper);
    }

    // wrapper页面中的item列表渲染
    function renderList(data) {
        const { pageNum, isLoading } = config
        const newsListTpl = NewsList.tpl({
            data,
            pageNum
        })

        oListWrapper.innerHTML += newsListTpl
        // isLoading = false
        NewsList.imgShow()
    }

    // 切换
    async function setNewsList() {
        // 解构出type和count
        const { type, count, pageNum } = config

        // 判断newsData 中是否已经存在该type，存在，则数据已经请求过，直接从缓存池中拿
        if( newsData[type]) {
            // console.log('pool');
            renderList(newsData[type][pageNum])
            return
        }

        // console.log('request');
        oListWrapper.innerHTML = pageLoading.tpl()
        // 返回的是一个promise，所以用await接收
        newsData[type] = await service.getNewsList(type, count)
        // console.log('newsData', newsData);
        setTimeout(() => {
            oListWrapper.innerHTML = ''
            renderList(newsData[type][pageNum])
        }, 1500);
    }

    function setType(type) {
        config.type = type
        // console.log('config.type', config.type);
        config.pageNum = 0
        oListWrapper.innerHTML = ''
        // 切换
        setNewsList()
    }

    init()
})(document)
