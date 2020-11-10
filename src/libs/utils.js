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

export {
    tplReplace
}
