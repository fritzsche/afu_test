// This class keeps statistical records on all test results.

export class Statistic {
    static statistic_store_key = 'afu_test_statistic'

    constructor() {
        if (Statistic._instance) {
            return Statistic._instance
        }
        Statistic._instance = this
        this._questions = new Object()
        this._statistic = {
            records: new Array()
        }
        this.load()



    }

    _applyQuestion(question, rating) {
        if (!this._questions[question]) this._questions[question] = 0
        this._questions[question] += rating
        if (this._questions[question] < 0) this._questions[question] = 0
    }

    _applyResult(result) {
       result.correct.forEach( question => this._applyQuestion(question, 1) )
       const delta_incorrect =  - 1000
       result.incorrect.forEach( question => this._applyQuestion(question, delta_incorrect) )                 
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
       this._statistic.records.forEach(r  => {
          this._applyResult(r)
       })
    }

    addResults(result) {
        this._statistic.records.push(result)
        this._applyResult(result)
        this.store()
    }

}