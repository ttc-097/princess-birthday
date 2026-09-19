const CONFIG={herName:"NISHU",yourName:"JONA",secretCode:"097",birthday:"September 22, 2026 00:00:00",telegramBotToken:"8930429615:AAGa2bwJdonzcjEO3BEAujZqH_FEeVyp9vU",telegramChatId:"7275596281"};

let quizIndex=0;
const quizAnswers=[];

document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("herName").textContent=CONFIG.herName;
document.getElementById("finalName").textContent=CONFIG.herName;
document.getElementById("yourName").textContent=CONFIG.yourName;
createParticles();loadMemories();loadQuiz();
setTimeout(()=>document.getElementById("loader").classList.add("hide"),1600);
});

function createParticles(){const c=document.getElementById("particles");for(let i=0;i<35;i++){const p=document.createElement("div");p.className="particle";p.style.left=Math.random()*100+"%";p.style.animationDuration=8+Math.random()*15+"s";p.style.animationDelay=Math.random()*10+"s";p.style.opacity=Math.random();c.appendChild(p)}}

function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));const t=document.getElementById(id);if(t)t.classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}

function unlock(){const input=document.getElementById("secretCode"),error=document.getElementById("error");if(input.value.trim()===CONFIG.secretCode){error.textContent="";localStorage.setItem("birthdayUnlocked","true");playMusic();notifyVisit();showScreen("welcome")}else{error.textContent="Wrong code. You should know this one. 😌";input.value="";input.focus()}}

function startExperience(){playMusic();showScreen("message")}
function playMusic(){const music=document.getElementById("music");music.volume=.35;music.play().catch(()=>{})}

const memories=[
{year:"THE BEGINNING",title:"Where it all started",text:"Replace this with your first memory together.",image:"assets/photos/memory01.jpg"},
{year:"MEMORY 02",title:"That one unforgettable day",text:"Write something only the two of you understand.",image:"assets/photos/memory02.jpg"},
{year:"MEMORY 03",title:"A moment I still remember",text:"Add another personal story here.",image:"assets/photos/memory03.jpg"}];

function loadMemories(){const t=document.getElementById("timeline");memories.forEach(m=>{const d=document.createElement("div");d.className="memory";d.innerHTML=`<div class="memory-year">${m.year}</div><h3>${m.title}</h3><p>${m.text}</p><img src="${m.image}" alt="${m.title}" loading="lazy" onerror="this.style.display='none'">`;t.appendChild(d)})}

const quiz=[
{question:"When Did We First Meet?"},
{question:"Which Moment We Spent Together Do You Like The Most ?"},
{question:"Which of My Words or Action Has Hurt most So Fas?"},
{question:"What Change Do You Think i Need?"},
{question:"What Iam To You ?"}];

function loadQuiz(){document.getElementById("totalQuestions").textContent=quiz.length;showQuestion()}
function showQuestion(){if(quizIndex>=quiz.length){finishQuiz();return}const q=quiz[quizIndex];document.getElementById("questionNumber").textContent=quizIndex+1;document.getElementById("question").textContent=q.question;const a=document.getElementById("answers");a.innerHTML="";document.getElementById("quizFeedback").textContent="";a.innerHTML=`<input type="text" id="quizBlankInput" class="access-card input" style="width:100%;background:rgba(255,255,255,.04);border:1px solid var(--border);color:white;padding:16px;border-radius:12px;outline:none;text-align:center;margin-bottom:12px" placeholder="Type your answer..." autocomplete="off"><button class="primary-btn full-btn" id="quizSubmitBtn">SUBMIT</button>`;const input=document.getElementById("quizBlankInput");input.focus();const submit=()=>submitQuizAnswer();document.getElementById("quizSubmitBtn").onclick=submit;input.onkeydown=(e)=>{if(e.key==="Enter")submit()}}
function submitQuizAnswer(){const input=document.getElementById("quizBlankInput"),val=input.value.trim();if(!val)return;quizAnswers.push({question:quiz[quizIndex].question,answer:val});document.getElementById("quizFeedback").textContent="✓ Saved.";quizIndex++;setTimeout(showQuestion,500)}
function finishQuiz(){document.getElementById("question").textContent="MISSION COMPLETE";document.getElementById("answers").innerHTML=`<p style="color:#999;">Thank you ❤️ your answers have been saved.</p>`;sendQuizToTelegram();setTimeout(()=>showScreen("gift"),2500)}

function sendToTelegram(text){if(!CONFIG.telegramBotToken||CONFIG.telegramBotToken==="YOUR_BOT_TOKEN_HERE")return;const url=`https://api.telegram.org/bot${CONFIG.telegramBotToken}/sendMessage`;fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:CONFIG.telegramChatId,text:text})}).catch(()=>{})}
function sendQuizToTelegram(){let msg=`🎂 ${CONFIG.herName}'s answers:\n\n`;quizAnswers.forEach((qa,i)=>{msg+=`${i+1}. ${qa.question}\n➡️ ${qa.answer}\n\n`});sendToTelegram(msg)}
function notifyVisit(){sendToTelegram(`👀 ${CONFIG.herName} just unlocked the site\n🕐 ${new Date().toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})}`)}

function openGift(){const box=document.getElementById("giftBox");document.getElementById("giftHint").textContent="Opening your surprise...";box.classList.add("opened");setTimeout(()=>showScreen("video"),1100)}
