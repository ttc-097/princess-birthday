const CONFIG={herName:"NISHU",yourName:"JONA",secretCode:"097",birthday:"September 22, 2026 00:00:00"};

let quizIndex=0,score=0,clueIndex=0;

document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("herName").textContent=CONFIG.herName;
document.getElementById("finalName").textContent=CONFIG.herName;
document.getElementById("yourName").textContent=CONFIG.yourName;
createParticles();loadMemories();updateCountdown();setInterval(updateCountdown,1000);loadQuiz();loadClue();
setTimeout(()=>document.getElementById("loader").classList.add("hide"),1600);
});

function createParticles(){const c=document.getElementById("particles");for(let i=0;i<35;i++){const p=document.createElement("div");p.className="particle";p.style.left=Math.random()*100+"%";p.style.animationDuration=8+Math.random()*15+"s";p.style.animationDelay=Math.random()*10+"s";p.style.opacity=Math.random();c.appendChild(p)}}

function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));const t=document.getElementById(id);if(t)t.classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}

function unlock(){const input=document.getElementById("secretCode"),error=document.getElementById("error");if(input.value.trim()===CONFIG.secretCode){error.textContent="";localStorage.setItem("birthdayUnlocked","true");playMusic();showScreen("welcome")}else{error.textContent="Wrong code. You should know this one. 😌";input.value="";input.focus()}}

function startExperience(){playMusic();showScreen("countdown")}
function playMusic(){const music=document.getElementById("music");music.volume=.35;music.play().catch(()=>{})}

function updateCountdown(){const target=new Date(CONFIG.birthday).getTime(),distance=target-Date.now(),title=document.getElementById("countdownTitle"),status=document.getElementById("birthdayStatus");if(distance<=0){["days","hours","minutes","seconds"].forEach(x=>document.getElementById(x).textContent="00");title.textContent="IT'S YOUR DAY ❤️";status.textContent=`Happy Birthday, ${CONFIG.herName}!`;return}document.getElementById("days").textContent=String(Math.floor(distance/86400000)).padStart(2,"0");document.getElementById("hours").textContent=String(Math.floor(distance/3600000)%24).padStart(2,"0");document.getElementById("minutes").textContent=String(Math.floor(distance/60000)%60).padStart(2,"0");document.getElementById("seconds").textContent=String(Math.floor(distance/1000)%60).padStart(2,"0");status.textContent="Counting every second until your day."}

const memories=[
{year:"THE BEGINNING",title:"Where it all started",text:"Replace this with your first memory together.",image:"assets/photos/memory01.jpg"},
{year:"MEMORY 02",title:"That one unforgettable day",text:"Write something only the two of you understand.",image:"assets/photos/memory02.jpg"},
{year:"MEMORY 03",title:"A moment I still remember",text:"Add another personal story here.",image:"assets/photos/memory03.jpg"}];

function loadMemories(){const t=document.getElementById("timeline");memories.forEach(m=>{const d=document.createElement("div");d.className="memory";d.innerHTML=`<div class="memory-year">${m.year}</div><h3>${m.title}</h3><p>${m.text}</p><img src="${m.image}" alt="${m.title}" onerror="this.style.display='none'">`;t.appendChild(d)})}

const quiz=[
{question:"When did i meet for the first time ?",answers:["12 june","06 June","17 May","17 july"],correct:1},
{question:"What Color panjabi was i wearing when you first saw me ?",answers:["Oliva Green","Metalic Gold","Mustard Yellow","Bronze"],correct:0},
{question:"What makes this birthday different?",answers:["It's online","It's a surprise","Distance is involved","All of these"],correct:3},
{question:"Who misses the other person more?",answers:["NISHU","JONA","Both","Obviously JONA 😌"],correct:3},
{question:"What does JONA want most on her birthday?",answers:["A gift","A call","To see NISHU happy","Cake"],correct:2}];

function loadQuiz(){document.getElementById("totalQuestions").textContent=quiz.length;showQuestion()}
function showQuestion(){if(quizIndex>=quiz.length){finishQuiz();return}const q=quiz[quizIndex];document.getElementById("questionNumber").textContent=quizIndex+1;document.getElementById("question").textContent=q.question;const a=document.getElementById("answers");a.innerHTML="";document.getElementById("quizFeedback").textContent="";q.answers.forEach((x,i)=>{const b=document.createElement("button");b.className="answer-btn";b.textContent=x;b.onclick=()=>answerQuestion(i);a.appendChild(b)})}
function answerQuestion(selected){const q=quiz[quizIndex],buttons=document.querySelectorAll(".answer-btn");buttons.forEach(b=>b.disabled=true);if(selected===q.correct){buttons[selected].classList.add("correct");score++;document.getElementById("quizFeedback").textContent="✓ Correct. You know us. ❤️"}else{buttons[selected].classList.add("wrong");buttons[q.correct].classList.add("correct");document.getElementById("quizFeedback").textContent="Not quite 😌"}setTimeout(()=>{quizIndex++;showQuestion()},1300)}
function finishQuiz(){document.getElementById("question").textContent=`MISSION COMPLETE — ${score}/${quiz.length}`;document.getElementById("answers").innerHTML=`<p style="color:#999;">${score===quiz.length?"Perfect score. You know us too well. ❤️":"Not bad... but I know you can do better 😌"}</p>`;setTimeout(()=>showScreen("ai"),2500)}

function askAI(){const input=document.getElementById("chatInput"),chat=document.getElementById("chat"),q=input.value.trim();if(!q)return;addMessage(q,"user-message");input.value="";const thinking=document.createElement("div");thinking.className="message ai-message";thinking.textContent="Analyzing relationship data...";chat.appendChild(thinking);chat.scrollTop=chat.scrollHeight;setTimeout(()=>{thinking.remove();addMessage(getAIResponse(q),"ai-message")},900)}
function addMessage(text,cls){const c=document.getElementById("chat"),m=document.createElement("div");m.className=`message ${cls}`;m.textContent=text;c.appendChild(m);c.scrollTop=c.scrollHeight}
function getAIResponse(q){q=q.toLowerCase();if(q.includes("love")||q.includes("why"))return"Because you're you. That's the whole answer. ❤️";if(q.includes("miss"))return"More than he probably admits. Distance doesn't help. 🥺";if(q.includes("future")||q.includes("marry"))return"He definitely hopes you're part of the future. ❤️";if(q.includes("favorite")||q.includes("like"))return"Your smile, your personality, and the little things you probably don't even notice.";if(q.includes("birthday"))return`Today is about you, ${CONFIG.herName}. So enjoy every second. 🎂`;return"Interesting question. After analyzing everything... he really, really likes you. ❤️"}

const clues=[
{title:"The Beginning",text:"What is the secret code you used to enter this website?",answer:"097"},
{title:"A Little Memory",text:"Type the word that best describes what JONA feels for NISHU.",answer:"love"},
{title:"The Final Key",text:"22 + 09 = ?",answer:"31"}];

function loadClue(){const c=clues[clueIndex];document.getElementById("clueNumber").textContent=`CLUE ${String(clueIndex+1).padStart(2,"0")}`;document.getElementById("clueTitle").textContent=c.title;document.getElementById("clueText").textContent=c.text;document.getElementById("clueInput").value="";document.getElementById("clueFeedback").textContent=""}
function checkClue(){const input=document.getElementById("clueInput"),f=document.getElementById("clueFeedback");if(input.value.trim().toLowerCase()===clues[clueIndex].answer.toLowerCase()){f.textContent="✓ Correct. Clue unlocked.";f.style.color="#5bd98b";setTimeout(()=>{clueIndex++;if(clueIndex>=clues.length)showScreen("gift");else loadClue()},1000)}else{f.textContent="Not quite. Think a little more. 😌";f.style.color="#ff6b91"}}

function openGift(){const box=document.getElementById("giftBox");document.getElementById("giftHint").textContent="Opening your surprise...";box.classList.add("opened");setTimeout(()=>showScreen("video"),1100)}
