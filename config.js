
import { Ohm } from "./ohm.js"


const config_store_key = 'afu_test_config'
const config_test_select_id = 'test_select'
const config_print_avoid_page_break = 'print_no_page_break'
const config_print_more_margin = 'print_more_margin'

class Config {
    _config = {
        current_test: 'V',  // default "Vorschriften"
        print_avoid_page_break: false,
        print_more_margin: false,
        test_type: 'P',
        class_target: 'N',
        chapters: {
            'N': [1],
            'NE': [1],
            'NEA': [1],
            'E': [1],
            'A': [1],
            'EA': [1],
        }
    }
    constructor(renderTestCallback) {
        this._renderTestCallback = renderTestCallback
    }

    store() {
        localStorage.setItem(config_store_key, JSON.stringify(this._config))
    }

    load() {
        let config_str = localStorage.getItem(config_store_key)
        if (config_str) {
            let conf = JSON.parse(config_str)
            if (conf) this._config = { ...this._config, ...conf }
        }
    }


    async update_dom() {
        this.apply_print_options()

        // update "Prüfungsteil / 50Ohm"
        const ohm = document.querySelector("#pr_or_50")
        const test_type = this._config.test_type
        if (ohm) ohm.value = test_type

        // update "Lernziel"
        const target_sel = document.querySelector("#ziel_select")
        const class_target = this._config.class_target
        if (target_sel) target_sel.value = class_target


        // build the DOM
       this.update_50Ohm()
       Ohm.updateChaptersDom(this._config.chapters)

    }

    read_dom() {
        // read "Prüfungsteil / 50Ohm"
        const ohm = document.querySelector("#pr_or_50")
        if (ohm) this._config.test_type = ohm.value
        // update "Lernziel"
        const target_sel = document.querySelector("#ziel_select")
        if (target_sel) this._config.class_target = target_sel.value
        // read the chapters selected
        const result = Ohm.readAllChapters() 
        this._config.chapters = result
    }

    get current_test() {
        return this._config.current_test
    }

    set current_test(test) {
        this._config.current_test = test
    }

    _selectElement(id, valueToSelect) {
        let element = document.getElementById(id)
        element.value = valueToSelect
    }

    set_test_select_option(test) {
        this._selectElement(config_test_select_id, test)
    }

    apply_print_avoid_page_break() {
        let element = document.getElementById(config_print_avoid_page_break)
        if (!element) return
        element.checked = this._config.print_avoid_page_break

        document.getElementById("questions").classList.remove('avoid_break')
        if (this._config.print_avoid_page_break) document.getElementById("questions").classList.add('avoid_break')
    }

    apply_print_more_margin() {
        let element = document.getElementById(config_print_more_margin)
        if (!element) return
        element.checked = this._config.print_more_margin

        document.getElementById("questions").classList.remove('more_margin')
        if (this._config.print_more_margin) document.getElementById("questions").classList.add('more_margin')
    }

    apply_print_options() {
        this.apply_print_avoid_page_break()
        this.apply_print_more_margin()
    }

    change_print_avoid_page_break() {
        let element = document.getElementById(config_print_avoid_page_break)
        let avoid_break = element.checked
        if (avoid_break) this._config.print_avoid_page_break = true; else this._config.print_avoid_page_break = false
        this.store()
        this.apply_print_avoid_page_break()
    }

    change_print_more_margin() {
        let element = document.getElementById(config_print_more_margin)
        let more_margin = element.checked
        if (more_margin) this._config.print_more_margin = true
        else
            this._config.print_more_margin = false
        this.store()
        this.apply_print_more_margin()
    }

    renderTest() {
        if ( this._renderTestCallback ) this._renderTestCallback()
    }

    update_50Ohm() {
        const dom = document.querySelector("#pr_or_50")
        if (dom) {
            if (dom.value === '5') {
                // 50 Ohm selected 
                document.querySelector("#ohm").classList.remove("hidden")
                document.querySelector("#pruefung").classList.add("hidden")
                const target_sel = document.querySelector("#ziel_select")
                const target = target_sel.value
                const chapters_dom = document.querySelector("#all_chapters")
                const all_drops = chapters_dom.querySelectorAll(".dropdown")
                all_drops.forEach( d => {
                    if (d.id === target) d.classList.remove("hidden")
                       else d.classList.add("hidden")
                })
                this.renderTest()
            } else {
                // BnetzA Prüfungsteil
                document.querySelector("#ohm").classList.add("hidden")
                document.querySelector("#pruefung").classList.remove("hidden")
            }
        }
        
    }
}



export { Config }