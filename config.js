
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
            'N': [1, 2, 3],
            'NE': [1],
            'NEA': [1],
            'E': [1],
            'A': [1],
            'EA': [1],
        }
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
        await this.update_50Ohm()
    }

    read_dom() {
        // read "Prüfungsteil / 50Ohm"
        const ohm = document.querySelector("#pr_or_50")
        if (ohm) this._config.test_type = ohm.value
        // update "Lernziel"
        const target_sel = document.querySelector("#ziel_select")
        if (target_sel) this._config.class_target = target_sel.value
        // read the chapters selected
        const chapters = document.querySelectorAll("#dropdownMenu input")
        let result = []
        chapters.forEach(c => {
            if (c.checked) {
                const number = parseInt(c.value)
                result.push(number)
                             
            }
        })
        console.log(result) 
        this._config.chapters[ this._config.class_target ] = result
        console.log( this._config)

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


    // Update button text based on selected options
    updateButtonLabel() {
        const dropdownBtn = document.getElementById('dropdownBtn')
        const checkboxes = dropdownMenu.querySelectorAll('.option')
        const selected = [...checkboxes].filter(cb => cb.checked).length
        dropdownBtn.textContent = selected > 0 ? `${selected} Kapitel ausgewählt` : 'Bitte wähle Kapitel aus'
    }

    updateChapterEvents() {
        const checkboxes = dropdownMenu.querySelectorAll('.option')

        // Listen for changes in checkboxes
        checkboxes.forEach(cb => cb.addEventListener('change', () => {
            this.updateButtonLabel()
            //this.read_dom()

        }))
    }
    initDropdown() {
        // Get references to the dropdown elements
        const dropdownBtn = document.getElementById('dropdownBtn')
        const dropdownMenu = document.getElementById('dropdownMenu')

        // Toggle dropdown menu visibility when the button is clicked
        dropdownBtn.addEventListener('click', e => {
            dropdownMenu.classList.toggle('show')
            e.stopPropagation()
        })

        // Close the dropdown menu if clicking outside of it
        document.addEventListener('click', e => {
            if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show')
            }
        })

    }

    async updateChapterDom(target) {
        let currentClass = new Ohm(target)
        await currentClass.load()
        const chapter_html = currentClass.getChapters()
        document.querySelector("#dropdownMenu").innerHTML = chapter_html
    }

    async update_50Ohm() {
        const dom = document.querySelector("#pr_or_50")
        if (dom) {
            // 50 Ohm selected 
            if (dom.value === '5') {
                document.querySelector("#ohm").classList.remove("hidden")
                document.querySelector("#pruefung").classList.add("hidden")
                const target_sel = document.querySelector("#ziel_select")
                const target = target_sel.value
                console.log(target)
                await this.updateChapterDom(target)
                // now set checkboxes based on the current config
                const chapters = document.querySelectorAll('.option')
                const class_target = this._config.class_target
                if (this._config.test_type === '5') {
                    const chap_sel = this._config.chapters[class_target]
                    chap_sel.forEach(sel => {
                        console.log("chapter", sel)
                        const chapter_checkbox = chapters[sel - 1]
                        chapter_checkbox.checked = true
                    })
                    this.updateButtonLabel()
                }


                this.updateChapterEvents()
                // BnetzA Prüfungsteil
            } else {
                document.querySelector("#ohm").classList.add("hidden")
                document.querySelector("#pruefung").classList.remove("hidden")
            }
        }
    }
}



export { Config }