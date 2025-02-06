
const config_store_key = 'afu_test_config'
const config_test_select_id = 'test_select'
const config_print_avoid_page_break = 'print_no_page_break'
const config_print_more_margin = 'print_more_margin'

class Config {
    _config = {
        current_test: 'V',  // default "Vorschriften"
        print_avoid_page_break: false,
        print_more_margin: false
    }
    store() {
        localStorage.setItem(config_store_key, JSON.stringify(this._config))
    }

    load() {
        let config_str = localStorage.getItem(config_store_key)
        if (config_str) {
            let conf = JSON.parse(config_str)
            if (conf) this._config = conf
        }
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
        element.checked = this._config.print_avoid_page_break

        document.getElementById("questions").classList.remove('avoid_break')
        if (this._config.print_avoid_page_break) document.getElementById("questions").classList.add('avoid_break')
    }

    apply_print_more_margin() {
        let element = document.getElementById(config_print_more_margin)
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

    static update_50Ohm() {
        const dom = document.querySelector("#pr_or_50")
        if (dom) {
            console.log( dom.value )
            // 50 Ohm selected 
            if (dom.value === '5') {
                document.querySelector("#ohm").classList.remove("hidden")
                document.querySelector("#pruefung").classList.add("hidden")
            // Bnetz Prüfungsteil
            } else {
                document.querySelector("#ohm").classList.add("hidden")
                document.querySelector("#pruefung").classList.remove("hidden")                
            }
        }
    }
}



export { Config }