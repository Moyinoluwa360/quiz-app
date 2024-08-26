import {questionsArr} from "./data.mjs"
let question_num = 0
let score = 0
const exitQuiz = (function(){
    const exitQuiz = document.querySelector(".exit-quiz")
    exitQuiz.addEventListener("click",()=>{
        document.querySelector(".quiz-instruction").setAttribute("style", "display:none;")
        document.querySelector(".start-btn").setAttribute("style", "display:flex;")
    })
})()

const startQuiz = (function(){
    const startQuiz = document.querySelector(".start-btn")
    startQuiz.addEventListener("click",()=>{
        document.querySelector(".quiz-instruction").setAttribute("style", "display:flex;")
        startQuiz.setAttribute("style", "display:none;")
    })
})()

const conntinueToQuiz = (function(){
    const continueToQuiz = document.querySelector(".continue")
    continueToQuiz.addEventListener("click",()=>{
        document.querySelector(".quiz-instruction").setAttribute("style", "display:none;")
        document.querySelector(".questions-container").setAttribute("style", "display:flex;")
        createQuestionsDiv()
        timeFunctions()
    })
})()

const quitBtn = (function(){
    const quitBtn = document.querySelector(".quit-btn")
    quitBtn.addEventListener("click",()=>{
        document.querySelector(".completed").setAttribute("style", "display:none;")
        document.querySelector(".start-btn").setAttribute("style", "display:flex;")
    })
})()
const replayBtn = (function(){
    const replayBtn =  document.querySelector(".replay-btn")
    replayBtn.addEventListener("click",()=>{
        document.querySelector(".completed").setAttribute("style", "display:none;")
        document.querySelector(".questions-container").setAttribute("style", "display:flex;")
        createQuestionsDiv()
        timeFunctions()

    })
})()
const nextBtn = function(){
    console.log(question_num)
    if (question_num >= 50){
        const questionsContainer = document.querySelector(".questions-container")
        setTimeout(() => {
            questionsContainer.setAttribute("style", "display:none;")
            document.querySelector(".completed").setAttribute("style", "display:flex;")
            document.querySelector(".score").textContent = score
            score = 0
            question_num = 0
            const questionsDiv = document.querySelector(".questions-div")
            document.querySelector(".question-container").removeChild(questionsDiv)
        }, 3000);
    }else{
        const nextBtn = document.querySelector(".next-btn")
        nextBtn.setAttribute("style", "display:flex;")
        nextBtn.addEventListener("click",nextBtnFn)
    }
}

function timeFunctions(){
    const progress = document.querySelector(".progress")
    const timeLeft = document.querySelector(".time-seconds")
    let width = 0
    let time = 15
    const handleTiming = setInterval(handleTimeLeft,1000);
    const allOptions = document.querySelectorAll(".option")
    console.log(allOptions)
    allOptions.forEach(option => {
        option.addEventListener("click",()=>{
            question_num++
            nextBtn()
            removeEventListeners()
            clearInterval(handleTiming)
        })
    });
    function handleTimeLeft(){
        if (time <= 0){
            document.querySelector(".time-up").textContent = "Time out"
            const allOptions = document.querySelectorAll(".option")
            allOptions.forEach(option => {
                if (option.textContent === questionsArr[question_num].correct_answer){
                    option.style.backgroundColor = "green"
                    const correctImg = new Image()
                    correctImg.src = "./correct.svg"
                    option.appendChild(correctImg)
                }
                option.replaceWith(option.cloneNode(true));
        });
            question_num++
            nextBtn()
            clearInterval(handleTiming)
        }else{
            width += 6.66
            time--
            progress.style.width = width + "%"
            timeLeft.textContent = time.toString().padStart(2, "0")
        }
    }
}

function createQuestionsDiv(){
    const questionsDiv = document.createElement("div")
    questionsDiv.classList.add("questions-div")
    const question = document.createElement("div")
    questionsDiv.appendChild(question)
    question.textContent = questionsArr[question_num].question
    for (let i = 0; i < 4;i++){
        const options = document.createElement("div")
        options.classList.add("option")
        options.textContent = questionsArr[question_num].options[i]
        options.addEventListener("click",function(){
            validateAnswer(options)
        })
        questionsDiv.appendChild(options)
    }
    document.querySelector(".question-container").appendChild(questionsDiv)
}

function validateAnswer(option){
    const urAns = option.textContent 
    console.log(urAns)
    const correct_answer = questionsArr[question_num].correct_answer
    console.log(correct_answer)
    if (option.textContent === correct_answer){
        option.style.backgroundColor = "green"
        const correctImg = new Image()
        correctImg.src = "./correct.svg"
        option.appendChild(correctImg)
        score++
    }else{
        option.style.backgroundColor = "red"
        const correctImg = new Image()
        correctImg.src = "./wrong.svg"
        option.appendChild(correctImg)
        //
        const allOptions = document.querySelectorAll(".option")
        for (let i = 0; i < 4; i++){
            if (allOptions[i].textContent === correct_answer){
                allOptions[i].style.backgroundColor = "green"
                const correctImg = new Image()
                correctImg.src = "./correct.svg"
                allOptions[i].appendChild(correctImg)
            }
        }
    }
}
function removeEventListeners() {
    const allOptions = document.querySelectorAll(".option")
    allOptions.forEach(option => {
        option.replaceWith(option.cloneNode(true));
    });
}

function nextBtnFn(){
    const questionsDiv = document.querySelector(".questions-div")
    document.querySelector(".question-container").removeChild(questionsDiv)
    createQuestionsDiv()
    timeFunctions()
    document.querySelector(".time-up").textContent = "Time left"
    document.querySelector(".question-page").textContent = question_num + 1
    document.querySelector(".next-btn").setAttribute("style", "display:none;")
}
