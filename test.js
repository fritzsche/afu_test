

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


function pick(arr, num) {
    let result = []
    for (let i = 0; i < num; i++) {
        let r = getRandomInt(0, arr.length);
        result.push(arr[r]);
        arr.splice(r, 1);
    }
    return result.sort((a, b) => {
        return a.number.toLowerCase().localeCompare(b.number.toLowerCase());
    });
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
    let result = [];
    let correct = -1;
    for (let i = 0; i < 4; i++) {
        let r = getRandomInt(0, arr.length);
        result.push(arr[r]);
        if (r == 0 && correct == -1) {
            correct = result.length;
        }
        arr.splice(r, 1);
    }
    return { answers: result, correct: correct };
}


function html_answers(answers, correct, number, online) {
    let result = "";
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
    return result;
}

function html_questions(questions, online) {
    let question_html = "";
    let answer_html = "";
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let picture = "";
        // select all answers of question
        let answers = get_answers(question);
        // pernutate answers
        // the correct answer number is provided
        let res = permute_answer(answers);
        // generate a html fragment from permutated
        // answers
        let ans_html = html_answers(res.answers, res.correct, question.number, online);
        if (question.picture_question) {
            picture = `<div><img  src="Fragen/svgs/${question.picture_question}.svg" /></div>`
        }
        answer_html += `<li> <strong>${question.number} </strong> (${res.correct}) ${res.answers[res.correct - 1]}</li>`
        let correct_answer = ` data-correct="${res.correct}"`
        question_html += `<div class="quest"><li${correct_answer} class="question"> <strong>${question.number} </strong>${question.question} ${picture} ${ans_html}</li></div>`
    }
    return { questions: question_html, answer: answer_html };
}



function render_test(title, test) {

    fetch('./Fragen/fragenkatalog3b.json')
        .then((response) => response.json())
        .then((json) => {
            const answer = document.getElementById("answer");
            let html = "";
            let result = jsonPath(json, "$..questions[?(@.class=1)]");

            let all_questions = result.filter((frage =>
                frage.number.startsWith(test)
            ))
            document.getElementById("title").innerHTML = title;
            let sel_questions = pick(all_questions, 25)
            const questions = document.getElementById("questions");


            if (answer) {
                html = html_questions(sel_questions, false);
            } else {
                html = html_questions(sel_questions, true);
                document.querySelector("button").hidden = false;
                document.querySelector("#result").innerHTML = ""
            }

            questions.innerHTML = `<ol>${html.questions}</ol>`
            if (answer) {
                answer.innerHTML = `<ol>${html.answer}</ol>`
            }

        });
    setTimeout(() => {
        renderMathInElement(document.body, {
            // customised options
            // • auto-render specific keys, e.g.:
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            // • rendering keys, e.g.:
            throwOnError: true
        });

    }, 500);

}


window.onload = function () {
    render_test("Vorschriften", "V");
}

function select_test() {
    var sel_test = document.getElementById("test_select");
    //document.getElementById("favourite").value = sel_test.options[sel_test.selectedIndex].text;
    console.log(sel_test.selectedIndex);
    switch (sel_test.selectedIndex) {
        case 1:
            render_test("Betriebstechnik", "B")
            break;
        case 2:
            render_test("Technik Klasse N", "N")
            break;
        case 3:
            render_test("Technik Klasse E", "E")
            break;
        case 4:
            render_test("Technik Klasse A", "A")
            break;
        default: render_test("Vorschriften", "V")
    }
}


function eval_test() {
    console.log("Evaluate");
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


    var nochmal = '<button type="submit" onClick="select_test()">Nochmal!</button>'
    var result_str = `<div class="red"><span class="smily"> &#128531;</span> ${correct} von 25 Fragen richtig beantwortet: leider nicht bestanden... ${nochmal}<div>`
    if (correct >= 19) {
        result_str = `<div class="green"><span class="smily">&#128512;</span> ${correct} von 25 Fragen richtig beantwortet:  Bestanden!!! ${nochmal}<div>`
    } else if (correct >= 17) {
        result_str = `<div class="yellow"><span class="smily">&#128528;</span> ${correct} von 25 Fragen richtig beantwortet:  Eventuell eine mündliche Nachprüfung... ${nochmal}<div>`
    }

    document.querySelector("button").hidden = true;
    document.querySelector("#result").innerHTML = result_str
    window.scrollTo(0, document.body.scrollHeight)

}

