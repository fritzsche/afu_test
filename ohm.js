

export class Ohm {

    static targets = ['N', 'NE', 'NEA', 'E', 'A', 'EA']

    constructor(target) {
        if (Ohm.targets.indexOf(target) === -1) return
        this.sections = []
        this.questions = []
        this.targetChapter = {}
        this._target = target

    }

    _uniqBy(a, key) {
        let seen = new Set()
        return a.filter(item => {
            let k = key(item)
            return seen.has(k) ? false : seen.add(k)
        })
    }

    getChapters() {
       let result = ''
       this.chapters.forEach( chapter => {
          result += `<label><input type="checkbox" value="${ chapter.chapter }" class="option"/>${ chapter.chapter_txt}</label>`
       })
      return result
    }

    async load() {
        // check in constructor that only valid targets are accepted.
        await fetch(`./50Ohm/50Ohm_${this._target}.json`)
            .then((response) => response.json())
            .then((json) => {
                this.sections = json.sections
                const chap_sec = json.sections.map(c => { return { chapter: c.chapter, chapter_classes: new Set(c.chapter_classes.split("")), chapter_txt: c.chapter_txt, } })
                this.chapters = this._uniqBy(chap_sec, e => { return e.chapter })
                this.questions = json.questions
            })

    }
}
