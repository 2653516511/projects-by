import tpl from './index.tpl'
import './index.scss'
import { tplReplace } from '../../libs/utils'

export default {
    name: 'noDataTpl',
    tpl () {
        return tplReplace(tpl, {
            text: 'no collected news'
        })
    }
}
