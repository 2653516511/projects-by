import  HTTP from '../libs/http'
import { setPageData } from '../libs/utils';

class Service extends HTTP {
    getNewsList(type, count) {
        // 后面要用到await，所以这里返回一个promise
        return new Promise((resolve, reject) => {
            this.ajax({
                url: 'Juhe/getNewsList',
                type: 'POST',
                dataType: 'JSON',
                // ????? what is this
                data: {
                    field: type
                },
                success(data) {
                    console.log(data);

                    // 进行数据结构的处理
                    const pageData = setPageData(data.result.data, count)
                    // resolve(data)
                    resolve(pageData)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    }
}

export default new Service()
