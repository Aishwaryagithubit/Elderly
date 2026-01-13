
const synth = window.speechSynthesis;

// --- VOICE SPEAK ---
function speak(text) {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    synth.speak(utterance);
}
function stopSpeak() {
    synth.cancel();
}

// --- PAGE NAVIGATION ---
function openPage(page){
    synth.cancel();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
}
function navSpeak(page){
    const map = {
        home:"Welcome to ELDERLY. Choose an activity to begin.",
        about:"ELDERLY is a voice-first AI companion for dignified aging.",
        features:"Explore the features including voice conversations, stories, memory exercises, and family dashboard.",
        family:"Family dashboard. Set medicine timers and track engagement.",
        faqs:"Frequently Asked Questions.",
        story:"Opening story time.",
        memory:"Opening memory exercises.",
        quiz:"Opening quiz activity.",
        bingo:"Opening bingo game.",
        paint:"Opening painting board.",
        movements:"Opening movement exercises.",
        therapy:"Opening therapy activity.",
        music:"Opening music player."
    };
    if(map[page]) speak(map[page]);
    openPage(page);
}

// --- HERO MIC ---
function talk(){
    speak("Hello, I am here with you. Choose an activity to begin.");
}

// --- STORIES ---
const stories = [
    "The soft evening light filled the room with peace. Enjoy calm moments with ELDERLY.",
    "A gentle breeze rustled the leaves as the elder enjoyed a warm cup of tea while listening to a story.",
    "Memories of childhood play filled the mind, bringing smiles and warmth with each sentence."
];
let storyIndex = 0;
function autoStartStory() { storyIndex = 0; showStory(storyIndex); }
function showStory(i) {
    const el = document.getElementById("storyPage");
    el.innerText = stories[i];
    speak(stories[i]);
}
function nextStory() { storyIndex = (storyIndex + 1) % stories.length; showStory(storyIndex); }
function prevStory() { storyIndex = (storyIndex - 1 + stories.length) % stories.length; showStory(storyIndex); }

// --- MEMORY ---
function startMemory() {
    const number = Math.floor(100 + Math.random() * 900);
    document.getElementById("memoryPrompt").innerText = "Remember this number: " + number;
    speak("Please remember this number: " + number);
}

// --- QUIZ ---
const quizData = [
    {q:"What is 2 + 2?", options:["3","4","5"], answer:"4"},
    {q:"Which color is the sky?", options:["Blue","Green","Red"], answer:"Blue"},
];
function loadQuiz() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";
    quizData.forEach((q,i) => {
        const div = document.createElement("div");
        div.className = "quiz-question";
        div.innerHTML = `<p>${q.q}</p>${q.options.map(o=>`<button class="btn primary" onclick="checkAnswer('${o}','${q.answer}',this)">${o}</button>`).join("")}`;
        container.appendChild(div);
    });
}
function checkAnswer(selected,answer,btn){
    if(selected === answer){
        btn.style.background="green"; speak("Correct answer!"); 
    } else {
        btn.style.background="red"; speak("Wrong answer!");
    }
}

// --- BINGO ---
let bingoNumbers = [];
function initBingo() {
    const container = document.getElementById("bingoContainer");
    bingoNumbers = Array.from({length:25}, (_,i)=>i+1).sort(()=>Math.random()-0.5);
    container.innerHTML = bingoNumbers.map(n=>`<div class="bingo-tile" onclick="markBingo(this)">${n}</div>`).join("");
    speak("Bingo board initialized.");
}
function markBingo(tile){
    tile.style.background = "#ec4899";
    tile.style.color = "#fff";
    speak("Marked number "+tile.innerText);
}

// --- PAINT ---
let paintIndex = 0, ctx, canvas;
const paintColors = ["#f87171","#facc15","#34d399","#60a5fa","#a78bfa","#f472b6"];
function initPaint(){
    canvas = document.getElementById("paintCanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    speak("Painting board ready. Click and draw.");
}
canvasClick = (e)=>{
    const rect=canvas.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    ctx.fillStyle=paintColors[paintIndex%paintColors.length];
    ctx.fillRect(x-15,y-15,30,30);
    paintIndex++;
}
function clearPaint(){
    ctx.fillStyle="white"; ctx.fillRect(0,0,canvas.width,canvas.height);
    speak("Canvas cleared.");
}
function downloadPaint(){
    const link=document.createElement('a');
    link.download="painting.png";
    link.href=canvas.toDataURL();
    link.click();
    speak("Painting downloaded.");
}
document.getElementById("paintCanvas")?.addEventListener("click",canvasClick);

// --- MOVEMENTS ---
function movementsActivity(){
    speak("Let's do some gentle movements. Follow the on-screen animation.");
}

// --- THERAPY ---
function therapyActivity(){
    speak("Therapy activity started. Relax and follow guidance.");
}

// --- MUSIC ---
function musicActivity(){
    speak("Music player opened. Enjoy the soothing music.");
}

// --- MEDICINE ---
function setMedicine(){
    const medName=document.getElementById("medName").value;
    const medTime=document.getElementById("medTime").value;
    if(medName && medTime){
        speak("Medicine reminder set for "+medName+" at "+medTime);
        alert("Medicine reminder set for "+medName+" at "+medTime);
    } else {
        speak("Please enter medicine name and time.");
        alert("Please enter medicine name and time.");
    }
}

// --- INIT ---
document.addEventListener("DOMContentLoaded",()=>{
    loadQuiz();
    initBingo();
    initPaint();
});

