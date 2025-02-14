import { Statistic } from "./statistic.js"

class Test {
    static DEFAULT_NUMBER_OF_QUESTIONS = 25


    constructor() {
        if (Test._instance) {
            return Test._instance
        }
        Test._instance = this

        this._statistic = new Statistic()

    }


    numberOfAnsweredQuestions() {
        const checked = document.querySelectorAll('#questions .option:checked').length
        return checked
    }

    numberOfAllQuestions() {
        return document.querySelectorAll('.quest').length
    }

    updateAnsweredQuestions() {
        const no_answer = document.getElementById("online_noanswer")
        if (no_answer) {
            let all = this.numberOfAllQuestions()
            let missing = all - this.numberOfAnsweredQuestions()
            if (missing === 0) {
                no_answer.classList.remove('no_answer')
                no_answer.innerHTML = `Alle ${all} Fragen beantwortet.`
            } else {
                no_answer.classList.add('no_answer')
                no_answer.innerHTML = `noch ${missing} Fragen...`
            }
        }

    }

    registerEvent(render_test) {
        let evaluate_button = document.getElementById("evaluate_button")
        if (evaluate_button) evaluate_button.addEventListener("click", (e) => { this.eval_test(e) })

        let again_button = document.getElementById("again_button")
        if (again_button) again_button.addEventListener("click", (e) => {
            render_test()
        })

        let question = document.getElementById("questions")
        if (question) {
            this.updateAnsweredQuestions()
            question.addEventListener("change", (e) => { this.changeQuestionEvent(e) })
        }
    }

    changeQuestionEvent(e) {
        if (e.target.classList.contains('option')) {
            this.updateAnsweredQuestions()
        }
    }

    eval_test() {
        var correct = 0

        var stats =
        {
            time: new Date(),
            correct: [],
            incorrect: [],
            no_answer: [],
            number_of_questions: 0
        }


        // calculate all correct answers
        const all_correct = document.querySelectorAll('.option[data-option=correct]:checked')

        const all_questions = document.querySelectorAll('.option[data-option=correct]').length
        stats.number_of_questions = all_questions
        // 19 von 25 Fragen ist bestanden
        const bestanden = Math.ceil((19 / 25) * all_questions)
        // 17 von 25 Fragen gibt eventuell Nachprüfung
        const nachpruefung = Math.ceil((17 / 25) * all_questions)

        if (all_correct) correct = all_correct.length
        // deactivate radio buttons
        var radio_buttons = document.querySelectorAll('input[type=radio]:not(:checked)')
        if (radio_buttons) radio_buttons.forEach(element => {
            element.disabled = true
        })
        var green = document.querySelectorAll('.opt_lab:has( .option[data-option=correct])')
        if (green) green.forEach(element => {
            element.classList.add("correct_answer")
        })

        // mark incorrect answers
        var red = document.querySelectorAll('.quest:has( .option[data-option=incorrect]:checked)')
        red.forEach(element => {
            element.classList.add("incorrect")
            const question = element.dataset.question
            stats.incorrect.push(question)

        })

        // mark correct answers
        var yellow = document.querySelectorAll('.quest:not(:has( .option:checked )) ')
        yellow.forEach(element => {
            element.classList.add("unanswered")
            const question = element.dataset.question
            stats.no_answer.push(question)            
        })

        // make correct answers
        var corr = document.querySelectorAll('.quest:has( .option[data-option=correct]:checked )')
        corr.forEach(element => {
            element.classList.add("correct")    
            const question = element.dataset.question
            stats.correct.push(question)                       
        })

        var result_str = `<span class="red"><span class="smiley"> &#128531;</span> ${correct} von ${all_questions} Fragen richtig beantwortet: leider nicht bestanden... </span>`
        if (correct >= bestanden) {
            result_str = `<span class="green"><span class="smiley">&#128512;</span> ${correct} von ${all_questions} Fragen richtig beantwortet:  Bestanden!!! </span>`
        } else if (correct >= nachpruefung) {
            result_str = `<span class="yellow"><span class="smiley">&#128528;</span> ${correct} von ${all_questions} Fragen richtig beantwortet:  Eventuell eine mündliche Nachprüfung... </span>`
        }
        document.querySelector("#result_span").innerHTML = result_str
        this.showResult()
        window.scrollTo(0, document.body.scrollHeight)
        this._statistic.addResults(stats)
    }

    showResult() {
        document.querySelector("#online_answer").hidden = true
        document.querySelector("#result").hidden = false
    }
    showAnswer() {
        document.querySelector("#online_answer").hidden = false
        document.querySelector("#result").hidden = true
    }
}


export { Test }