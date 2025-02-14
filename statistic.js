


export class Statistic {
    static statistic_store_key = 'afu_test_statistic'

    constructor() {
        if (Statistic._instance) {
            return Statistic._instance
        }
        Statistic._instance = this

        this._statistic = {
            records: []
        }
        this.load()

    }
    store() {
        localStorage.setItem(Statistic.statistic_store_key, JSON.stringify(this._statistic))
    }

    load() {
        const statistic_str = localStorage.getItem(Statistic.statistic_store_key)
        if (statistic_str) {
            const statistic = JSON.parse(statistic_str)
            this._statistic = statistic
            if (statistic) this._statistic = { ...this._statistic, ...statistic }
        }
    }

    addResults(result) {
        this._statistic.records.push(result)
        this.store()
    }

}