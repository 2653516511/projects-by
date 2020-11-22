import tpl from './index.tpl'
import './index.scss'
import { tplReplace } from '../../libs/utils'

export default {
    name: 'moreLoading',
    _tpl(isLoading) {
        return tplReplace(tpl, {
            isLoading: isLoading ? 'loading' : '',
            text: isLoading ? 'loading more...' : 'no news'
        })
    },
    remove(oList) {
        const oMoreLoading = oList.querySelector('.more-Loading')
        oMoreLoading && oMoreLoading.remove()
    },
    add (oList, isLoading) {
        const oMoreLoading = oList.querySelector('.more-loading')
        if(!oMoreLoading) {
            oList.innerHTML += this._tpl(isLoading)
        }
    }
}
