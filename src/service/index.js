import  HTTP from '../libs/http'

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
                    // console.log(data);
                    resolve(data)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    }
}

export default new Service()
