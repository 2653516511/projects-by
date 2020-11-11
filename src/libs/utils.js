// 所有的 工具函数

// 模板的替换函数 (模板字符串， )
function tplReplace (template, templateObj) {
    //？？？？？？ replace的使用
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        // node: {{ url }}
        // key: ' url '
        return templateObj[key.trim()]
    })
}

function scrollToTop() {
    // 给他异步执行，防止页面还没有加载完，他已经执行了
    setInterval(() => {
        window.scrollTo(0, 0)
    }, 0);
}

export {
    tplReplace,
    scrollToTop
}
