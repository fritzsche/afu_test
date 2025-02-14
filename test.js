import { Config } from "./config.js"

import { Ohm } from "./ohm.js"





const config = new Config(renderCallback)

function renderCallback() {
    const selected_test = config._config.current_test
    const title = test_name(selected_test)

    render_test(title, selected_test)
}

import { Test } from "./online.js"
const onlineTest = new Test()

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function pick(questions, num) {
    let result = []
    // sort questions
    questions.sort((a, b) => {
        return a.number.toLowerCase().localeCompare(b.number.toLowerCase())
    })

    // when picking questions we try to distribute though the
    // complete question catalog by building packages of question 
    // we draw questions one at a time

    // the final flag is used if the random number generator choose the last 
    // element of a package. In this case the next pack with select from 2nd in package 
    // to avoid the to consecutive numbers are selected.

    let final = false
    for (let rem_num = num; rem_num > 0; rem_num--) {
        let pack_size = Math.floor(questions.length / rem_num)
        let pack_mod = questions.length % rem_num
        if (pack_mod > 0) pack_size++
        let r = getRandomInt(pack_size > 1 && final ? 1 : 0, pack_size)
        final = (pack_size == r + 1) ? true : false
        result.push(questions[r])
        questions.splice(0, pack_size)
    }

    return result.sort((a, b) => {
        return a.number.toLowerCase().localeCompare(b.number.toLowerCase())
    })
}


function get_answers(question) {  //style="zoom: 200%"
    return [
        question.picture_a ? `<img src="Fragen/svgs/${question.picture_a}.svg" />` : `<span class="text_opt">${question.answer_a}</span>`,
        question.picture_b ? `<img src="Fragen/svgs/${question.picture_b}.svg" />` : `<span class="text_opt">${question.answer_b}</span>`,
        question.picture_c ? `<img src="Fragen/svgs/${question.picture_c}.svg" />` : `<span class="text_opt">${question.answer_c}</span>`,
        question.picture_d ? `<img src="Fragen/svgs/${question.picture_d}.svg" />` : `<span class="text_opt">${question.answer_d}</span>`
    ]
}

function permute_answer(arr) {
    let result = []
    let correct = -1
    for (let i = 0; i < 4; i++) {
        let r = getRandomInt(0, arr.length)
        result.push(arr[r])
        if (r == 0 && correct == -1) {
            correct = result.length
        }
        arr.splice(r, 1)
    }
    return { answers: result, correct: correct }
}


function html_answers(answers, correct, number, online) {
    let result = ""
    for (let i = 0; i < answers.length; i++) {
        let opt = `data-option ="${i == correct - 1 ? "correct" : "incorrect"}"`
        if (online) {
            result += `<div class="opt_lab"><label for="${number}-${i}"><input class="option" ${opt} type="radio" id="${number}-${i}" name="${number}" value="${number}-${i}" />
            ${answers[i]}</label></div>`
        } else {
            result += `<li class="option" ${opt}>${answers[i]}</li>`
        }
    }
    if (!online) result = `<ol>${result}</ol>`
    return result
}

function html_questions(questions, online) {
    let question_html = ""
    let answer_html = ""
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i]
        let picture = ""
        // select all answers of question
        let answers = get_answers(question)
        // permuted answers
        // the correct answer number is provided
        let res = permute_answer(answers)
        // generate a html fragment from permuted
        // answers
        let ans_html = html_answers(res.answers, res.correct, question.number, online)
        if (question.picture_question) {
            const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
            let badQuestion = false
            switch (question.number) {
                case 'BE207':
                case 'BE208':
                case 'BE209':
                case 'NE209':
                case 'NF101':
                case 'NF102':
                case 'NF103':
                case 'NF104':
                case 'NF105':
                case 'NF106':
                case 'NG302': badQuestion = true
            }
            if (isFirefox && badQuestion) picture = `<div><img  src="Fragen/svgs/${question.picture_question}.png" /></div>`
            else picture = `<div><img  src="Fragen/svgs/${question.picture_question}.svg" /></div>`
        }
        answer_html += `<li> <strong class="title">${question.number} </strong> (${res.correct}) ${res.answers[res.correct - 1]}</li>`
        let correct_answer = ` data-correct="${res.correct}"`
        question_html += `<div data-question="${question.number}" class="quest"><li${correct_answer} class="question"> <strong class="title">${question.number} </strong>${question.question} ${picture} ${ans_html}</li></div>`
    }
    return { questions: question_html, answer: answer_html }
}



async function render_test(title, test) {

    let ohm
    if (config._config.test_type === '5') {
        ohm = new Ohm(config._config.class_target)
        await ohm.load()
    }
    await fetch('./Fragen/fragenkatalog3b.json')
        .then((response) => response.json())
        .then((json) => {
            const answer = document.getElementById("answer")
            let html = ""

            let result = new Array()
            const traverse = (jsonObj) => {
                if (jsonObj !== null && typeof jsonObj == "object") {
                    Object.entries(jsonObj).forEach(([key, value]) => {
                        if (key === 'questions') result.push(...value)
                        else traverse(value)
                    })
                }
            }

            traverse(json)

            let all_questions = []
            // Query parameter special code 
            let specificQuestions = []
            const urlParams = new URLSearchParams(window.location.search)
            const specificQuestionsString = urlParams.get('q')
            if (specificQuestionsString) {
                specificQuestions = specificQuestionsString.split(/\s|;|\r/g).filter(Boolean)


                all_questions = result.filter((frage =>
                    specificQuestions.indexOf(frage.number) >= 0
                ))

                const hide_dom_elements = document.querySelectorAll(".special_hide")
                hide_dom_elements.forEach(d => {
                    d.style.display = 'none'
                })
                document.getElementById("title").innerHTML = 'Fragen'

            } else {
                if (config._config.test_type === '5') {

                    const validQuestions = ohm.getAddQuestions(config._config.chapters[config._config.class_target])
                    all_questions = result.filter((frage => {
                        return validQuestions.indexOf(frage.number) !== -1
                    }
                    ))
                } else {
                    all_questions = result.filter((frage =>
                        frage.number.startsWith(test)
                    ))
                }
                document.getElementById("title").innerHTML = title
            }
            let sel_questions = pick(all_questions, Math.min(config._config.max_questions, all_questions.length))
            const questions = document.getElementById("questions")


            if (answer) {
                html = html_questions(sel_questions, false)
            } else {
                html = html_questions(sel_questions, true)
                onlineTest.showAnswer()
            }

            questions.innerHTML = `<ol>${html.questions}</ol>`
            if (answer) {
                answer.innerHTML = `<ol>${html.answer}</ol>`
            }

        })
    renderMathInElement(document.body, {
        // customized options
        // • auto-render specific keys, e.g.:
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
        ],
        // • rendering keys, e.g.:
        throwOnError: true
    })
    onlineTest.updateAnsweredQuestions()
}

const test_name = (test) => {
    const test_type = config._config.test_type
    if (test_type === '5') return 'DARC 50&#8486;'
    switch (test) {
        case 'B': return "Betriebstechnik"
        case 'N': return "Technik Klasse N"
        case 'E': return "Technik Klasse E"
        case 'A': return "Technik Klasse A"
        case 'V': return "Vorschriften"
        default: return ""
    }
}

function select_test() {
    var sel_test = document.getElementById("test_select")
    let selected_test = 'V'
    switch (sel_test.selectedIndex) {
        case 1:
            selected_test = 'B'
            break
        case 2:
            selected_test = 'N'
            break
        case 3:
            selected_test = 'E'
            break
        case 4:
            selected_test = 'A'
            break
        default: selected_test = 'V'
    }
    config.current_test = selected_test
    render_test(test_name(selected_test), selected_test)
    config.store()
    document.body.scrollTop = document.documentElement.scrollTop = 0
}

function print_option() {
    config.change_print_avoid_page_break()
    config.change_print_more_margin()
}

window.onload = async () => {
    config.load()
    Ohm.initAllChapters(config)
    config.update_dom()
    const current_test = config.current_test

    await render_test(test_name(current_test), current_test)
    config.set_test_select_option(current_test)

    const test_select = document.getElementById("test_select")
    if (test_select) test_select.addEventListener("change", select_test)

    const print_no_page_break = document.getElementById("print_no_page_break")
    if (print_no_page_break) {
        config.load()
        config.apply_print_options()
        print_no_page_break.addEventListener("change", print_option)
        let print_more_margin = document.getElementById("print_more_margin").addEventListener("change", print_option)
    }
    onlineTest.registerEvent(select_test)
}