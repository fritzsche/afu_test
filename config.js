
const config_store_key = 'afu_test_config'
const config_test_select_id = 'test_select'

class Config {
    _config = {
        current_test: 'V'  // default "Vorschriften"
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
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    set_test_select_option(test) {
        this._selectElement(config_test_select_id,test)
    }

}


export { Config }