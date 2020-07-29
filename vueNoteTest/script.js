// import marked from 'marked'
Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm:ss'))

new Vue({
    name: 'mine',
    el: '#notebook',
    data() {
        return {
            content: 'simple vue',
            notes: [],
            // notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null
        }
    },
    created() {
        this.content = localStorage.getItem('content') || 'simple vue'
    },
    watch: {
        content: {
            handler: 'saveNote'
            // handler(newVal, oldVal) {
                
            // }
        },
        selectedId(val) {
            localStorage.setItem('selected-id', val)
        }
    },
    computed: {
        notePreview() {
            // return this.content
            return this.showNote ? this.showNote : this.content
        },
        addButtonTitle () {
            return this.notes.length + ' note(s) already'
        },
        showNote() {
            var not = this.notes.find(item => item.id === this.selectedId)
            // console.log('showNote', not)
            return not
        },
        sortNotes() {
            return this.notes.slice()
                .sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1))
        }
    },
    methods: {
        saveNote(newVal, oldVal) {
            console.log('oldval:' + oldVal + ', newval:' + newVal)
            localStorage.setItem('content', newVal)
        },
        addNote() {
            const note = {
                id: String(Date.now()),
                title: 'New note: ' + (this.notes.length+1),
                created: Date.now(),
                favorite: false,
                content: this.content
            }
            this.notes.push(note)
        },
        selectNote(note) {
            this.selectedId = note.id
            // console.log('selectNote', this.selectedId)
            // this.showNote()
        },
        // showNote() {
            
        //     var not = this.notes.find(item => item.id === this.selectedId)
        //     console.log('showNote', not)
        //     return not
        // }
        deleteNote() {
            if(this.showNote && confirm('delete the note?')) {
                const index = this.notes.indexOf(this.showNote)
                if(index !== -1) {
                    this.notes.splice(index,1)
                }
            }
        },
        favoriteNote() {
            this.showNote.favorite = !this.showNote.favorite
            
            // change border-color according to favorite
            var changeStar = document.getElementById('star')
            let borderColor = changeStar.style
            borderColor.borderColor = this.showNote.favorite ? 'red': '#ade2ca'
            // console.log('starColor', changeStar.style.color)
        }
        
    }
})
// console.log('dd')
// const html = marked('**Bold** *Italic* [link] (http://vuejs.org')
// console.log('html', html)