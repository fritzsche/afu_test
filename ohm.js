

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


    async load() {
        // check in constructor that only valid targets are accepted.
        await fetch(`./50Ohm/50Ohm_${this._target}.json`)
            .then((response) => response.json())
            .then((json) => {
                this.sections = json.sections
                const chap_sec = json.sections.map(c => { return { chapter: c.chapter, chapter_classes: new Set(c.chapter_classes.split("")), chapter_txt: c.chapter_txt, } })
                this.chapters = this._uniqBy(chap_sec, e => { return e.chapter })
                this.questions = json.questions
                console.log(this.chapters)
                /*
                                Ohm.targetChapter = {}
                
                                let chapters = []
                
                                Ohm.targets.forEach(t => {
                                    Ohm.targetChapter[t] = []
                                    let target_set = new Set(t)
                                    Ohm.allChapters.forEach(c => {
                                        const inter = target_set.intersection(c.chapter_classes)
                                        console.log(inter)
                                        if (inter.size > 0) {
                                            Ohm.targetChapter[t].push(c)
                                        }
                                    })
                
                                })
                
                                console.log(Ohm.targetChapter)
                */
            })

    }
    /*
        static relevantClassed(value) {
            let result = []
            switch (value) {
                case 'A':
                    result = ['N', 'E', 'A']
                    break
                case 'E':
                    result = ['N', 'E']
                    break
                case 'N':
                    result = ['N']
                    break
                case 'NE':
                    result = ['E ']
                    break
                case 'NA':
                    result
                    break
    
            }
        }
    
        static getChapters(target) {
            //       result
        }
    */
}
