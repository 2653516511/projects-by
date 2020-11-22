import tpl from './index.tpl'
import './index.scss'
import { tplReplace } from '../../libs/utils'

export default {
    name: 'newsFrame',
    tpl(url) {
        return tplReplace(tpl, {
            url
        })
    }
}
