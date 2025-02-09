
class Test {
    static DEFAULT_NUMBER_OF_QUESTIONS = 25


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
        if (evaluate_button) evaluate_button.addEventListener("click", (e) => {this.eval_test(e)})

        let again_button = document.getElementById("again_button")
        if (again_button) again_button.addEventListener("click", (e) => {             
            render_test()            
        })

        let question = document.getElementById("questions")
        if (question) {
            this.updateAnsweredQuestions()
            question.addEventListener("change", (e) => {this.changeQuestionEvent(e)})    
        }
    }

    changeQuestionEvent(e) {
        if (e.target.classList.contains('option')) {
           this.updateAnsweredQuestions()
        }
    }

    eval_test() {
        var correct = 0;
        // calculate all correct answers
        var all_correct = document.querySelectorAll('.option[data-option=correct]:checked');
        if (all_correct) correct = all_correct.length;
        // deactivate radio buttons
        var radio_buttons = document.querySelectorAll('input[type=radio]:not(:checked)');
        if (radio_buttons) radio_buttons.forEach(element => {
            element.disabled = true
        })
        var green = document.querySelectorAll('.opt_lab:has( .option[data-option=correct])');
        if (green) green.forEach(element => {
            element.classList.add("correct_answer");
        });
    
        var red = document.querySelectorAll('.quest:has( .option[data-option=incorrect]:checked)');
        red.forEach(element => {
            element.classList.add("incorrect");
        });
    
        var yellow = document.querySelectorAll('.quest:not(:has( .option:checked )) ');
        yellow.forEach(element => {
            element.classList.add("unanswered");
        });
    
        var corr = document.querySelectorAll('.quest:has( .option[data-option=correct]:checked )');
        corr.forEach(element => {
            element.classList.add("correct");
        });
    
        var result_str = `<span class="red"><span class="smiley"> &#128531;</span> ${correct} von 25 Fragen richtig beantwortet: leider nicht bestanden... </span>`
        if (correct >= 19) {
            result_str = `<span class="green"><span class="smiley">&#128512;</span> ${correct} von 25 Fragen richtig beantwortet:  Bestanden!!! </span>`
        } else if (correct >= 17) {
            result_str = `<span class="yellow"><span class="smiley">&#128528;</span> ${correct} von 25 Fragen richtig beantwortet:  Eventuell eine mündliche Nachprüfung... </span>`
        }
        document.querySelector("#result_span").innerHTML = result_str
        this.showResult()
        window.scrollTo(0, document.body.scrollHeight)    
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