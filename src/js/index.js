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
import { scrollToBottom } from '../libs/utils'

// 一般入口文件都是个模块，所以可以用立即执行函数包一下，证明其是一个整体
;((doc) => {
    // ???? querySelector
    const oApp = doc.querySelector('#app')
    let oListWrapper = null

    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,
        // 上拉加载更多的锁
        isLoading: false,
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
        // 绑定上拉加载更多事件处理函数
        window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false)
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
        // console.log('oListWrapper', oListWrapper);
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

    // 上拉加载更多. 触底功能
    /**
     * 这里利用锁的概念，没必要非要用防抖节流，
     *      就直接利用一把锁，控制程序什么时候加载
     */
    function getMoreList() {
        if(!config.isLoading) {
            config.isLoading = true
            console.log('reach bottom');

            setTimeout(() => {
                config.isLoading = false
            }, 3000);
        }

    }

    init()
})(document)
