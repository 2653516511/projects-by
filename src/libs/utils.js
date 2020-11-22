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

// 数据结构的处理
function setPageData(data, count) {
    const len = data.length
    let index = 0
    const pageData = []

    while(index <= len) {
        pageData.push(data.slice(index, index += count))
    }
    return pageData
}

// 上拉加载更多
function scrollToBottom(callback) {
    if(_getScrollTop() + _getWindowHeight() === _getScrollHeight()) {
        // console.log('reach bottom');
        callback()
    }
}

// 这里拿到最外层的div
function getItemNode (target) {
  while(target = target.parentNode) {
    if(target.className.split(' ')[0] === 'news-item') {
      return target
    }
  }
}

// 获取页面的path
function getUrlQueryValue(key) {
  const reg = new RegExp('(^|&)' + key + '=([^&|*])(&|$)', 'i')
  const res = window.location.search.substr(1).match(reg)

  // match出来的是一个数组，所以取第二项（测试一下）
  return res !== null ? decodeURIComponent(res[2]) : null
}

export {
    tplReplace,
    scrollToTop,
    setPageData,
    scrollToBottom,
    getItemNode,
    getUrlQueryValue
}

/*********** 内部方法 ************/
function _getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  
  function _getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  }
  
  function _getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }
