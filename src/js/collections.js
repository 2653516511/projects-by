// console.log('collections');
import './imports'
import header from '../components/header'
import newsList from '../components/newsList'
import noDataTip from '../components/noDataTip'

;((doc) => {
    const oApp = doc.querySelector('#app')
    const followList = JSON.parse(localStorage.getItem('followList') || '[]')
    let oListWrapper = null

    const init = () => {
        render()
        bindEvent()
    }

    function render() {
        const headerTpl = header.tpl({
            url: '/',
            title: 'News Collections',
            showLeftIcon: true,
            showRightIcon: false
        })

        // 注意，这里不能直接写followList, 因为if([]) != if('')
        if(followList.length) {
            const listWrapperTpl = newsList.wrapperTpl(44)
            oApp.innerHTML += (headerTpl + listWrapperTpl)
            oListWrapper = oApp.querySelector('.news-list')
            renderList(followList)
        } else {
            // 没有收藏新闻
            oApp.innerHTML += (headerTpl + noDataTip.tpl())
        }

    }

    function bindEvent() {
        followList.length && newsList.bindEvent(oListWrapper, setCurrentNews)
    }

    function renderList(data) {
        const newsListTpl = newsList.tpl({
            data,
            // 不需要pageNum，所以随意给一个值
            pageNum: -1
        })
        oListWrapper.innerHTML += newsListTpl

    }

    function setCurrentNews(options) {
        const { idx } = options
        const currentNews = followList[idx]
        localStorage.setItem('currentNews', JSON.stringify(currentNews))
    }

    init()

})(document)
