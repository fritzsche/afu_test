import { chapterDefinition } from "./chapterDefinition.js"
import { Dropdown } from "./dropdown.js"

export class Ohm {
    static targets = ['N', 'NE', 'NEA', 'E', 'A', 'EA']
    static _dropdowns = {}

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

    static getChapterHtml(def) {
        let result = ''
        def.forEach(chapter => {
            result += `<label><input type="checkbox" value="${chapter.chapter}" class="option"/>${chapter.chapter_txt}</label>`
        })
        return result
    }

    getChapters() {
        return Ohm.getChapterHtml(this.chapters)
    }

    static getAllChaptersHtml() {
        let result = ""
        Ohm.targets.forEach(target => {
            const html_for_chapter = Ohm.getChapterHtml(chapterDefinition[target])
            result += `<div class="dropdown hidden" id="${target}">
              <div class="dropdown-btn" id="dropdownBtn">Kapitel Auswahl</div>
              <div class="dropdown-menu" id="dropdownMenu">
              ${html_for_chapter}
              </div>
             </div>`
        })
        return result
    }


    static initAllChapters(config) {
        const all_test = document.getElementById('all_chapters')
        const all_chapters_html = Ohm.getAllChaptersHtml()
        all_test.innerHTML = all_chapters_html

        const callBack = () => {
           config.read_dom()
           config.store()
           config.renderTest()
        }

        Ohm.targets.forEach(target => {
            this._dropdowns[target] = new Dropdown(target,callBack)
        })
        // register event listener
        const pr_sel = document.querySelector("#pr_or_50")
        if (pr_sel) {
            pr_sel.addEventListener("change", e => {
                config.read_dom()
                config.store()                
                config.update_50Ohm()
            })

            const target_sel = document.querySelector("#ziel_select")
            if (target_sel) target_sel.addEventListener("change", e => {
                config.read_dom()
                config.store()
                config.update_50Ohm()
            })
        }
        config.update_50Ohm()

    }


    static readAllChapters() {
        let result = {}
        Ohm.targets.forEach( target => {
            let cap = []
            const chapters = document.querySelectorAll(`#${target} input`)
            chapters.forEach(c => {
                if (c.checked) {
                    const number = parseInt(c.value)
                    cap.push(number)                           
                }
            })         
            result[target] = cap
        })
        return result
    }

    static updateChaptersDom(conf) {
        for (const [target, chapters] of Object.entries(conf)) {
            const all_dom = document.querySelectorAll(`#${target} .option`)
            all_dom.forEach( dom => {
               const chapter = parseInt(dom.value)
               const isSelected = chapters.indexOf(chapter) !== -1
               dom.checked = isSelected
            })
            Ohm._dropdowns[target].updateButtonLabel()
        }
    }

    getAddQuestions(chapters) {
      let result = []
      this.questions.forEach( q => {
        const isSelectedChapter = chapters.indexOf(q.chapter) !== -1
        if (isSelectedChapter) result.push(q.number)

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

