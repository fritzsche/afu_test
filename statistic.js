import { Config } from "./config.js"

// This class keeps statistical records on all test results.

export class Statistic {
    static statistic_store_key = 'afu_test_statistic'
    static max_correct = 3

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
        this._conf = new Config()
    }

    _applyQuestion(question, rating) {
        if (!this._questions[question]) this._questions[question] = 0
        this._questions[question] += rating
        if (this._questions[question] < 0) this._questions[question] = 0
        if (this._questions[question] > Statistic.max_correct) this._questions[question] = Statistic.max_correct
    }

    _applyResult(result) {
        result.correct.forEach(question => this._applyQuestion(question, 1))
        const delta_incorrect = - 1000
        result.incorrect.forEach(question => this._applyQuestion(question, delta_incorrect))
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
        this._statistic.records.forEach(r => {
            this._applyResult(r)
        })

    }

    clearAll() {
        this._statistic = {
            records: new Array()
        }
        this.store()
        this._conf._renderTestCallback()

    }

    _pickRandomSamples([...arr], n = 1) {
        // Fischer Yates
        let m = arr.length
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]]
        }
        return arr.slice(0, n)
    }

    status_update(all_questions, dom) {
        const pick_array_size = Statistic.max_correct + 2
        if (!this._questions || this._questions.length == 0) {
            dom.innerHTML = " &vert; noch keine Statistik Daten"
            return
        }
        const all_selected = all_questions.length
        const pick_array = this.pick_array(all_questions)
        const level0 = pick_array[0].length + pick_array[1].length

        let question_str = ''
        for (let i = 2; i < pick_array_size; i++) {
            question_str += ` &vert; ${i - 1}-mal richtig: ${pick_array[i].length}`
        }

        dom.innerHTML = ` &vert; Gesamt: ${all_selected} 	&vert; ungelernt: ${level0} ${question_str}`

        const space = document.createElement("span")
        space.innerHTML = ' &vert; '
        dom.appendChild(space)

        const clear_statistic = document.createElement("span")
        const a = document.createElement('a')
        a.innerHTML = "Statistik löschen"
        a.href = "&"
        a.addEventListener("click", e => {
            const sicher = confirm("Wollen sie wirklich die ganze Statistik löschen?\nDies kann nicht rückgängig gemacht werden.")
            if(sicher) this.clearAll()
            e.preventDefault()
        })
        clear_statistic.appendChild(a)
        dom.appendChild(clear_statistic)
        return
    }

    pick_array(all_questions) {
        const pick_array_size = Statistic.max_correct + 2
        let pick_array = new Array(pick_array_size)

        for (let i = 0; i < pick_array_size; i++) pick_array[i] = new Array()
        // take all not learned elements at 2nd position
        all_questions.forEach(q => {
            if (typeof this._questions[q.number] === 'undefined')
                pick_array[1].push(q.number)
        })
        // collect all other questions
        for (const [key, value] of Object.entries(this._questions)) {
            if (!all_questions.find(q => q.number === key)) continue
            if (value === 0) pick_array[0].push(key)
            else pick_array[value + 1].push(key)
        }
        return pick_array
    }

    pick(all_questions, number) {
        const pick_array_size = Statistic.max_correct + 2
        let remaining_elements = number
        let pick_questions = new Array()
        const pick_array = this.pick_array(all_questions)

        console.log(this._questions)
        console.log(pick_array)
        for (let i = 0; i < pick_array_size; i++) {
            const curr_questions = pick_array[i]
            let picked = new Array()
            if (remaining_elements >= curr_questions.length) picked.push(...curr_questions)
            else picked = this._pickRandomSamples(curr_questions, remaining_elements)

            remaining_elements -= picked.length

            pick_questions.push(...picked)
            if (remaining_elements <= 0) {
                break
            }

        }
        console.log(pick_questions)
        let result = pick_questions.map(e => {
            return all_questions.find((q) => {

                return q.number === e
            })
        })
        return this._pickRandomSamples(result, result.length)
    }

    addResults(result) {
        if (this._conf._config.statistic) {
            this._statistic.records.push(result)
            this._applyResult(result)
            this.store()
        }
    }

}