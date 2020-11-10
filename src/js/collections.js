// console.log('collections');
import './imports'
import header from '../components/header'

;((doc) => {
    const oApp = doc.querySelector('#app')

    const init = () => {
        render()
    }

    function render() {
        const headerTpl = header.tpl({
            url: '/',
            title: 'News Collections',
            showLeftIcon: true,
            showRightIcon: false
        })

        oApp.innerHTML += headerTpl
    }

    init()

})(document)
