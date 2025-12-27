const synth = speechSynthesis;

function speak(text){
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  synth.speak(u);
}

function stopSpeak(){ synth.cancel(); }

function openPage(p){
  synth.cancel();
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelector(`[data-page="${p}"]`).classList.add('active');
}

function navSpeak(page){
  const map = {
    home: "Welcome to ELDERLY. Create a caring voice experience for elders.",
    about: "ELDERLY is a voice-first AI companion for dignified aging. Calm conversations, memory exercises, and family reassurance.",
    features: "Here are the key features of ELDERLY. Voice conversations, AI stories, memory exercises, medicine reminders, and family dashboard.",
    family: "Opening family dashboard. Set medicine timers and track elder engagement.",
    faqs: "Frequently Asked Questions.",
    story: "Opening story time.",
    memory: "Opening memory exercise."
  };
  if(map[page]) speak(map[page]);
  openPage(page);
}

function talk(){
  speak("Hello. I am here with you.");
}

function playStory(){
  const s = "The soft evening light filled the room with peace. Enjoy calm moments with ELDERLY.";
  document.getElementById("storyText").innerText = s;
  speak(s);
}

function startMemory(){
  const n = Math.floor(100 + Math.random() * 900);
  const msg = "Please remember this number: " + n;
  document.getElementById("memoryPrompt").innerText = msg;
  speak(msg);
}

function setMedicine(){
  const medName = document.getElementById("medName");
  const medTime = document.getElementById("medTime");
  if(medName.value && medTime.value){
    speak("Medicine reminder set for "+medName.value+" at "+medTime.value);
  }
}
