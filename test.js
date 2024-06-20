

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
        question.picture_a ? `<div><img src = "Fragen/svgs/${question.picture_a}.svg" /></div>` : question.answer_a,
        question.picture_b ? `<div><img src = "Fragen/svgs/${question.picture_b}.svg" /></div>` : question.answer_b,
        question.picture_c ? `<div><img src = "Fragen/svgs/${question.picture_c}.svg" /></div>` : question.answer_c,
        question.picture_d ? `<div><img src = "Fragen/svgs/${question.picture_d}.svg" /></div>` : question.answer_d
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


function html_answers(answers) {
    let result = "";
    for (let i = 0; i < answers.length; i++) {
        result += `<li class="option">${answers[i]}</li>`
    }
    return result;
}

function html_questions(questions) {
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
        let ans_html = html_answers(res.answers,res.correct);
        if (question.picture_question) {
            picture = `<div><img  src="Fragen/svgs/${question.picture_question}.svg" /></div>`
        }
        answer_html   += `<li> <strong>${question.number} </strong> (${res.correct}) ${res.answers[res.correct - 1]}</li>`
        let correct_answer = ` data-correct="${res.correct}"`
        question_html += `<li${ correct_answer } class="question"> <strong>${question.number} </strong>${question.question} ${picture}<ol>${ans_html}</ol></li>`
    }
    return { questions: question_html, answer: answer_html };
}



function render_test(title, test) {

    fetch('./Fragen/fragenkatalog3b.json')
        .then((response) => response.json())
        .then((json) => {
            let result = jsonPath(json, "$..questions[?(@.class=1)]"); //

            let all_questions = result.filter((frage =>
                frage.number.startsWith(test)
            ))
            document.getElementById("title").innerHTML = title;
            let sel_questions = pick(all_questions, 25)
            const questions = document.getElementById("questions");
            let html = html_questions(sel_questions);
            const answer = document.getElementById("answer");
            questions.innerHTML = `<ol>${html.questions}</ol>`
            answer.innerHTML = `<ol>${html.answer}</ol>`


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

