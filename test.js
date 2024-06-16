

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

function get_answers(question) {
    return [
        question.picture_a? `<div><img width="300pt" src = "Fragen/svgs/${question.picture_a}.svg" /></div>`:  question.answer_a,
        question.picture_b? `<div><img width="300pt" src = "Fragen/svgs/${question.picture_b}.svg" /></div>`: question.answer_b,
        question.picture_c? `<div><img width="300pt" src = "Fragen/svgs/${question.picture_c}.svg" /></div>`:question.answer_c,
        question.picture_d? `<div><img width="300pt" src = "Fragen/svgs/${question.picture_d}.svg" /></div>`:question.answer_d
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
        result += `<li>${answers[i]}</li>`
    }
    return result;
}

function html_questions(questions) {
    let result = "";
    let answer = "";
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let picture = "";
        let answers = get_answers(questions[i]);
        let res = permute_answer(answers);
        let ans_html = html_answers(res.answers);
        if (question.picture_question) {
            console.log(question.picture_question);
            picture = `<div><img width="300pt" src = "Fragen/svgs/${question.picture_question}.svg" /></div>`
        }
        answer += `<li> <strong>${questions[i].number} </strong> (${res.correct}) ${res.answers[res.correct - 1]}</li>` 
        result += `<li> <strong>${questions[i].number} </strong>${questions[i].question} ${ picture }<ol>${ans_html}</ol></li>`
    }
    return { questions: result, answer: answer };
}

window.onload = function () {
    fetch('./Fragen/fragenkatalog3b.json')
        .then((response) => response.json())
        .then((json) => {
            let result = jsonPath(json, "$..questions[?(@.class=1)]"); //
            // Vorschriften
                    let vorschriften = result.filter((frage  => 
                        frage.number.startsWith("V")      
                     )) 
                    let sel_vorschriften = pick(vorschriften,25)
                    const v_questions = document.getElementById("v_questions");
                    let v_html = html_questions(sel_vorschriften);
                    const v_answer = document.getElementById("v_answer");           
                    v_questions.innerHTML = `<ol>${v_html.questions}</ol>`
                    v_answer.innerHTML = `<ol>${v_html.answer}</ol>`
            

            // Betrieb
            
            let betrieb = result.filter((frage =>
                frage.number.startsWith("B")
            ))
            const b_questions = document.getElementById("b_questions");
            let sel_betrieb = pick(betrieb, 25)
            let b_html = html_questions(sel_betrieb);
            b_questions.innerHTML = `<ol>${b_html.questions}</ol>`
            const b_answer = document.getElementById("b_answer");
            b_answer.innerHTML = `<ol>${b_html.answer}</ol>`

            let technik = result.filter((frage =>
                frage.number.startsWith("N")
            ))   
         //   console.log(technik);         
            // Technik
            const t_questions = document.getElementById("t_questions");
            let sel_technik = pick(technik, 25)   
            let t_html = html_questions(sel_technik);                     
            const t_answer = document.getElementById("t_answer");     
            t_questions.innerHTML = `<ol>${t_html.questions}</ol>`   
            t_answer.innerHTML = `<ol>${t_html.answer}</ol>`                            

        });
}
