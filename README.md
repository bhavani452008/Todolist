# Ex03 To-Do List using JavaScript
## Date: 17/11/2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM

## index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bloom - To Do Planner</title>

<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

<style>
*{margin:0;padding:0;box-sizing:border-box}

:root{
  --purple:#b69acb;
  --pink:#e4b5b2;
  --text:#fff8f5;
  --muted:#d1c5ce;
  --panel:rgba(19,18,24,.88);
  --border:rgba(255,255,255,.14);
}

body{
  min-height:100vh;
  font-family:'DM Sans',sans-serif;
  color:var(--text);
  background:
    linear-gradient(rgba(10,10,14,.48),rgba(10,10,14,.65)),
    url("todolist.jpg") center center/cover fixed;
}

button,input,select{font-family:inherit}
button{cursor:pointer}

.app{display:flex;min-height:100vh}

/* SIDEBAR */
.sidebar{
  width:225px;
  flex-shrink:0;
  padding:30px 20px;
  background:rgba(17,16,21,.91);
  border-right:1px solid var(--border);
  backdrop-filter:blur(14px);
  display:flex;
  flex-direction:column;
}

.logo{
  font-family:'Playfair Display',serif;
  font-size:28px;
  color:#e6c6aa;
  margin-bottom:40px;
}

.nav-title{
  font-size:10px;
  color:#c5b4b1;
  letter-spacing:2px;
  margin:15px 10px;
}

.nav{
  padding:13px;
  border-radius:11px;
  margin-bottom:7px;
  color:#e4dce2;
  font-size:13px;
  cursor:pointer;
  transition:.2s;
}

.nav:hover,.nav.active{
  background:rgba(202,166,180,.20);
  color:#f5d9df;
  font-weight:700;
}

.sidebar-note{
  margin-top:auto;
  background:rgba(206,174,151,.16);
  border:1px solid var(--border);
  border-radius:15px;
  padding:18px;
  font-size:12px;
  line-height:1.8;
  color:#f0ded2;
}

.sidebar-note strong{
  display:block;
  color:#f1c9b0;
  font-size:14px;
  margin-bottom:5px;
}

/* MAIN */
.main{
  flex:1;
  min-width:0;
  max-width:1500px;
  padding:32px;
}

header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
  gap:12px;
}

.greeting h1{
  font-family:'Playfair Display',serif;
  font-size:30px;
}

.greeting p{
  color:#eee1e6;
  font-size:12px;
  margin-top:7px;
}

.date-badge{
  background:rgba(22,20,25,.82);
  border:1px solid var(--border);
  padding:13px 17px;
  border-radius:12px;
  font-size:12px;
  color:#f0d5d8;
}

/* HERO */
.hero{
  background:linear-gradient(110deg,
    rgba(44,35,49,.93),
    rgba(66,43,49,.90),
    rgba(73,55,42,.90));
  border:1px solid var(--border);
  border-radius:20px;
  padding:28px;
  margin-bottom:23px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.hero h2{
  font-family:'Playfair Display',serif;
  font-size:27px;
  margin-bottom:8px;
  color:#fff3ee;
}

.hero p{color:#f0dfe2;font-size:12px}
.hero-icon{font-size:65px}

/* STATS */
.stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:13px;
  margin-bottom:25px;
}

.stat,.panel,.progress-panel{
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:17px;
  backdrop-filter:blur(13px);
  box-shadow:0 10px 28px rgba(0,0,0,.16);
}

.stat{padding:17px}
.stat-icon{font-size:22px}
.stat p{color:var(--muted);font-size:11px;margin-top:10px}
.stat h2{font-size:25px;margin-top:5px;color:#f5e5e8}

/* CONTENT */
.content{
  display:grid;
  grid-template-columns:1.35fr .8fr;
  gap:20px;
  align-items:start;
}

.panel{padding:22px;margin-bottom:18px}

.panel-heading{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:19px;
  gap:10px;
}

.panel-heading h2{
  font-family:'Playfair Display',serif;
  font-size:21px;
}

.subtext{font-size:11px;color:var(--muted);margin-top:5px}

/* WEEK */
.week{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  gap:8px;
  margin-bottom:22px;
}

.day{
  border:1px solid var(--border);
  border-radius:12px;
  padding:12px 3px;
  text-align:center;
  cursor:pointer;
  background:rgba(255,255,255,.08);
  color:#f7f0f2;
}

.day small{
  display:block;
  font-size:10px;
  color:#d0c3ce;
  margin-bottom:8px;
}

.day strong{font-size:14px}

.day.active{
  background:rgba(186,151,205,.38);
  border-color:#d4b6dc;
  color:white;
}

.day.today:not(.active){border-color:#e0bdc9}

/* FORM */
.form{
  background:rgba(255,255,255,.08);
  border:1px solid var(--border);
  padding:16px;
  border-radius:13px;
  margin-bottom:20px;
  display:none;
}

.form.show{display:block}

.form label{
  display:block;
  font-size:11px;
  color:#e0d4df;
  margin-bottom:6px;
}

.form input,.form select{
  width:100%;
  padding:11px;
  background:rgba(18,17,23,.95);
  border:1px solid rgba(255,255,255,.2);
  border-radius:8px;
  outline:none;
  color:white;
  margin-bottom:12px;
  font-size:12px;
}

.form input:focus,.form select:focus{border-color:#c6a8d7}

.form-row{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

.primary-btn{
  background:#9876aa;
  color:white;
  border:0;
  border-radius:9px;
  padding:11px 16px;
  font-weight:700;
  font-size:12px;
}

.add-button{
  background:rgba(190,160,207,.20);
  color:#f1d9f4;
  border:1px solid var(--border);
  padding:10px 14px;
  border-radius:9px;
  font-weight:700;
  font-size:12px;
}

/* TASKS */
.task-list{display:grid;gap:11px}

.task{
  padding:15px;
  border-radius:13px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  background:rgba(255,255,255,.09);
  border:1px solid var(--border);
  border-left:4px solid #d3a8c7;
  transition:.2s;
}

.task:nth-child(3n+2){border-left-color:#e2b6a3}
.task:nth-child(3n){border-left-color:#a9cdb4}
.task:hover{transform:translateY(-2px)}
.task-info{min-width:0}
.task-info h3{font-size:13px;margin-bottom:6px;overflow-wrap:anywhere}
.task-info p{font-size:10px;color:#d1c5ce}
.task.completed{opacity:.55}
.task.completed h3{text-decoration:line-through}

.task-actions{display:flex;gap:5px;flex-shrink:0}

.task-actions button{
  border:0;
  background:rgba(255,255,255,.14);
  color:white;
  padding:8px;
  border-radius:7px;
  font-size:11px;
}

.empty{
  text-align:center;
  color:#e1d5de;
  padding:30px;
  font-size:12px;
}

/* TIMER */
.timer-panel{
  background:linear-gradient(145deg,rgba(43,34,53,.95),rgba(63,42,53,.94));
  border:1px solid var(--border);
  text-align:center;
  border-radius:17px;
  padding:24px 15px;
  margin-bottom:18px;
  backdrop-filter:blur(12px);
}

.timer-panel h3{
  font-family:'Playfair Display',serif;
  font-size:21px;
  color:#fff0f4;
}

.timer-circle{
  width:170px;
  height:170px;
  border-radius:50%;
  margin:22px auto;
  display:grid;
  place-items:center;
  background:conic-gradient(#b69acb 0deg,#b69acb 360deg,#e1d8ec 360deg);
}

.timer-inner{
  width:145px;
  height:145px;
  background:#29212e;
  border-radius:50%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}

.timer-inner strong{
  font-size:32px;
  color:#fff0f4;
  font-variant-numeric:tabular-nums;
}

.timer-inner small{font-size:10px;color:#d7c4d4}

.timer-controls{
  display:flex;
  justify-content:center;
  gap:8px;
}

.timer-controls button{
  border:0;
  padding:11px 16px;
  border-radius:9px;
  font-weight:700;
  font-size:11px;
}

.start{background:#9876aa;color:white}
.pause{background:rgba(255,255,255,.16);color:white}
.reset{background:rgba(223,174,170,.22);color:#ffe6e2}

.mode-buttons{
  display:flex;
  justify-content:center;
  gap:7px;
  margin-top:15px;
  flex-wrap:wrap;
}

.mode-buttons button{
  border:1px solid var(--border);
  background:rgba(255,255,255,.10);
  color:#f4e9f2;
  border-radius:20px;
  padding:7px 11px;
  font-size:10px;
}

.mode-buttons button.active{background:#9876aa}

/* PROGRESS */
.progress-panel{
  padding:20px;
  margin-top:18px;
}

.progress-panel h3{
  font-family:'Playfair Display',serif;
  margin-bottom:14px;
  font-size:18px;
}

.track{
  background:rgba(255,255,255,.17);
  height:9px;
  border-radius:20px;
  overflow:hidden;
}

.fill{
  background:linear-gradient(90deg,#b69acb,#e4b5b2);
  height:100%;
  width:0%;
  transition:.4s;
}

.progress-label{
  display:flex;
  justify-content:space-between;
  margin-top:10px;
  font-size:11px;
  color:#d1c5ce;
}

footer{
  text-align:center;
  padding:25px 0 5px;
  color:#f1e7eb;
  font-size:11px;
}

@media(max-width:950px){
  .sidebar{display:none}
  .content{grid-template-columns:1fr}
}

@media(max-width:600px){
  body{
    background:
      linear-gradient(rgba(10,10,14,.48),rgba(10,10,14,.65)),
      url("todolist.jpg") center center/cover fixed;
  }
  .main{padding:18px 13px}
  .stats{grid-template-columns:repeat(2,1fr)}
  .hero{padding:22px}
  .hero h2{font-size:21px}
  .hero-icon{font-size:40px}
  .greeting h1{font-size:23px}
  .date-badge{font-size:10px;padding:10px}
  .panel{padding:15px}
  .week{gap:4px}
  .day{padding:10px 2px}
  .task{align-items:flex-start}
}
</style>
</head>

<body>
<div class="app">

<aside class="sidebar">
  <div class="logo">Bloom. 🌷</div>

  <div class="nav-title">MENU</div>
  <div class="nav active" onclick="showView('all',this)">🏡 My Dashboard</div>
  <div class="nav" onclick="showView('today',this)">📅 Today's Plan</div>
  <div class="nav" onclick="showView('pending',this)">⏳ Pending Tasks</div>
  <div class="nav" onclick="showView('completed',this)">🌟 Completed</div>

  <div class="nav-title">MY SPACE</div>
  <div class="nav" onclick="showView('all',this)">📚 Study Planner</div>
  <div class="nav" onclick="resetTimer()">⏱ Focus Timer</div>

  <div class="sidebar-note">
    <strong>🌼 Daily Reminder</strong>
    You don't have to be perfect.
    Just keep growing a little every day!
  </div>
</aside>

<main class="main">

<header>
  <div class="greeting">
    <h1>Hello, Achiever! 🌸</h1>
    <p>Make today beautiful and productive.</p>
  </div>
  <div class="date-badge" id="headerDate"></div>
</header>

<section class="hero">
  <div>
    <h2>Little steps, big dreams. ✨</h2>
    <p>Plan your time. Follow your dreams. Bloom every day.</p>
  </div>
  <div class="hero-icon">🌻</div>
</section>

<section class="stats">
  <div class="stat">
    <div class="stat-icon">📖</div>
    <p>Total Sessions</p>
    <h2 id="total">0</h2>
  </div>
  <div class="stat">
    <div class="stat-icon">🌟</div>
    <p>Completed</p>
    <h2 id="done">0</h2>
  </div>
  <div class="stat">
    <div class="stat-icon">⏰</div>
    <p>Study Time</p>
    <h2 id="studyTime">0m</h2>
  </div>
  <div class="stat">
    <div class="stat-icon">🌱</div>
    <p>Remaining</p>
    <h2 id="pending">0</h2>
  </div>
</section>

<div class="content">

<section class="panel">
  <div class="panel-heading">
    <div>
      <h2>My Study Schedule 📚</h2>
      <p class="subtext">Make time for your dreams.</p>
    </div>
    <button class="add-button" onclick="toggleForm()">+ Add</button>
  </div>

  <div class="week" id="week"></div>

  <form class="form" id="taskForm">
    <label>SUBJECT / TASK NAME</label>
    <input id="taskName" placeholder="Eg: Mathematics - Algebra" required>

    <div class="form-row">
      <div>
        <label>DATE</label>
        <input type="date" id="taskDate" required>
      </div>
      <div>
        <label>SUBJECT</label>
        <select id="subject">
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Computer</option>
          <option>Social Studies</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div>
        <label>START TIME</label>
        <input type="time" id="startTime" required>
      </div>
      <div>
        <label>END TIME</label>
        <input type="time" id="endTime" required>
      </div>
    </div>

    <button class="primary-btn" type="submit" id="saveButton">
      Save Study Session ✨
    </button>
  </form>

  <div class="panel-heading">
    <h2 style="font-size:17px">Daily Activities</h2>
    <span class="subtext" id="sessionCount"></span>
  </div>

  <div class="task-list" id="taskList"></div>
</section>

<section>
  <div class="timer-panel">
    <h3>Focus Time ☁️</h3>
    <p class="subtext" style="margin-top:6px">A little focus goes a long way.</p>

    <div class="timer-circle" id="timerCircle">
      <div class="timer-inner">
        <strong id="timer">25:00</strong>
        <small id="timerLabel">FOCUS SESSION</small>
      </div>
    </div>

    <div class="timer-controls">
      <button class="start" onclick="startTimer()">▶ Start</button>
      <button class="pause" onclick="pauseTimer()">Ⅱ Pause</button>
      <button class="reset" onclick="resetTimer()">↻ Reset</button>
    </div>

    <div class="mode-buttons">
      <button class="active" onclick="setMode(25,this)">25 min</button>
      <button onclick="setMode(45,this)">45 min</button>
      <button onclick="setMode(60,this)">60 min</button>
      <button onclick="setMode(5,this)">Break 5</button>
    </div>
  </div>

  <div class="progress-panel">
    <h3>Today's Progress 🌷</h3>
    <div class="track">
      <div class="fill" id="progress"></div>
    </div>
    <div class="progress-label">
      <span id="progressText">0% completed</span>
      <span id="progressCount">0 / 0</span>
    </div>
  </div>

  <div class="progress-panel">
    <h3>💌 A Little Motivation</h3>
    <p style="font-size:12px;line-height:1.8;color:#d1c5ce">
      Believe in your journey. Every page you read and every
      problem you solve takes you one step closer to your goal.
    </p>
  </div>
</section>

</div>

<footer>Made with 🌷 Bloom Planner · Your personal study space</footer>
</main>
</div>

<script>
let tasks=JSON.parse(localStorage.getItem("bloomTasks"))||[];
let selectedDate=dateString(new Date());
let filter="all";
let editingId=null;

let duration=25*60;
let remaining=duration;
let timerInterval=null;
let endAt=null;
let focusSeconds=Number(localStorage.getItem("bloomFocus")||0);
let focusStarted=null;
let mode="FOCUS SESSION";

function dateString(date){
  return date.getFullYear()+"-"+
    String(date.getMonth()+1).padStart(2,"0")+"-"+
    String(date.getDate()).padStart(2,"0");
}

document.getElementById("headerDate").textContent=
  new Date().toLocaleDateString("en-US",{
    weekday:"long",month:"short",day:"numeric"
  });

document.getElementById("taskDate").value=selectedDate;

function save(){
  localStorage.setItem("bloomTasks",JSON.stringify(tasks));
}

function renderWeek(){
  const week=document.getElementById("week");
  week.innerHTML="";
  const base=new Date(selectedDate+"T12:00:00");

  for(let i=0;i<7;i++){
    const date=new Date(base);
    date.setDate(base.getDate()-base.getDay()+i);
    const key=dateString(date);

    const div=document.createElement("div");
    div.className="day"+
      (key===selectedDate?" active":"")+
      (key===dateString(new Date())?" today":"");

    const small=document.createElement("small");
    small.textContent=date.toLocaleDateString("en-US",{weekday:"short"});

    const strong=document.createElement("strong");
    strong.textContent=date.getDate();

    div.append(small,strong);

    div.onclick=()=>{
      selectedDate=key;
      document.getElementById("taskDate").value=key;
      filter="all";
      render();
    };

    week.appendChild(div);
  }
}

function toggleForm(){
  document.getElementById("taskForm").classList.toggle("show");
}

document.getElementById("taskForm").addEventListener("submit",function(e){
  e.preventDefault();

  const name=document.getElementById("taskName").value.trim();
  const date=document.getElementById("taskDate").value;
  const start=document.getElementById("startTime").value;
  const end=document.getElementById("endTime").value;

  if(!name)return;

  if(end<=start){
    alert("Please choose an end time after the start time!");
    return;
  }

  const data={
    name,date,start,end,
    subject:document.getElementById("subject").value
  };

  if(editingId!==null){
    const task=tasks.find(t=>t.id===editingId);
    Object.assign(task,data);
    editingId=null;
  }else{
    tasks.push({
      id:Date.now(),
      ...data,
      completed:false
    });
  }

  save();
  this.reset();
  document.getElementById("taskDate").value=selectedDate;
  document.getElementById("saveButton").textContent="Save Study Session ✨";
  this.classList.remove("show");
  render();
});

function editTask(id){
  const t=tasks.find(x=>x.id===id);
  editingId=id;

  document.getElementById("taskName").value=t.name;
  document.getElementById("taskDate").value=t.date;
  document.getElementById("startTime").value=t.start;
  document.getElementById("endTime").value=t.end;
  document.getElementById("subject").value=t.subject;

  document.getElementById("saveButton").textContent="Update Session";
  document.getElementById("taskForm").classList.add("show");
  window.scrollTo({top:0,behavior:"smooth"});
}

function deleteTask(id){
  if(!confirm("Delete this study session?"))return;
  tasks=tasks.filter(t=>t.id!==id);
  save();
  render();
}

function completeTask(id){
  const task=tasks.find(t=>t.id===id);
  task.completed=!task.completed;
  save();
  render();
}

function showView(type,el){
  filter=type;
  selectedDate=dateString(new Date());

  document.querySelectorAll(".nav").forEach(n=>n.classList.remove("active"));
  if(el)el.classList.add("active");

  document.getElementById("taskDate").value=selectedDate;
  render();
}

function render(){
  renderWeek();

  const list=document.getElementById("taskList");
  list.innerHTML="";

  let filtered=tasks.filter(t=>t.date===selectedDate);

  if(filter==="today"){
    filtered=filtered.filter(t=>t.date===dateString(new Date()));
  }
  if(filter==="pending"){
    filtered=tasks.filter(t=>!t.completed);
  }
  if(filter==="completed"){
    filtered=tasks.filter(t=>t.completed);
  }

  filtered.sort((a,b)=>a.start.localeCompare(b.start));

  document.getElementById("sessionCount").textContent=
    filtered.length+" sessions";

  if(!filtered.length){
    list.innerHTML='<div class="empty">🌸<br><br>No sessions planned here.<br>Add something lovely to your day!</div>';
  }

  filtered.forEach(t=>{
    const card=document.createElement("div");
    card.className="task"+(t.completed?" completed":"");

    const info=document.createElement("div");
    info.className="task-info";

    const title=document.createElement("h3");
    title.textContent=(t.completed?"✓ ":"📚 ")+t.name;

    const details=document.createElement("p");
    details.textContent=t.subject+" · "+t.start+" – "+t.end;

    info.append(title,details);

    const actions=document.createElement("div");
    actions.className="task-actions";

    const edit=document.createElement("button");
    edit.textContent="✎";
    edit.title="Edit";
    edit.onclick=()=>editTask(t.id);

    const done=document.createElement("button");
    done.textContent=t.completed?"↶":"✓";
    done.title="Complete";
    done.onclick=()=>completeTask(t.id);

    const del=document.createElement("button");
    del.textContent="✕";
    del.title="Delete";
    del.onclick=()=>deleteTask(t.id);

    actions.append(edit,done,del);
    card.append(info,actions);
    list.appendChild(card);
  });

  updateStats();
}

function updateStats(){
  const todayTasks=tasks.filter(t=>t.date===dateString(new Date()));
  const done=todayTasks.filter(t=>t.completed).length;
  const total=todayTasks.length;

  document.getElementById("total").textContent=total;
  document.getElementById("done").textContent=done;
  document.getElementById("pending").textContent=total-done;

  const h=Math.floor(focusSeconds/3600);
  const m=Math.floor((focusSeconds%3600)/60);

  document.getElementById("studyTime").textContent=
    h>0?h+"h "+m+"m":m+"m";

  const percent=total?Math.round(done/total*100):0;

  document.getElementById("progress").style.width=percent+"%";
  document.getElementById("progressText").textContent=percent+"% completed";
  document.getElementById("progressCount").textContent=done+" / "+total;
}

/* TIMER */
function formatTime(s){
  const m=Math.floor(s/60);
  const sec=s%60;
  return String(m).padStart(2,"0")+":"+
    String(sec).padStart(2,"0");
}

function updateTimer(){
  document.getElementById("timer").textContent=formatTime(remaining);

  const percent=duration?((duration-remaining)/duration)*360:0;
  document.getElementById("timerCircle").style.background=
    `conic-gradient(#b69acb ${percent}deg,#e1d8ec ${percent}deg)`;

  document.getElementById("timerLabel").textContent=mode;
}

function startTimer(){
  if(timerInterval)return;

  if(remaining<=0){
    alert("Choose a timer duration first!");
    return;
  }

  endAt=Date.now()+remaining*1000;
  focusStarted=Date.now();

  timerInterval=setInterval(()=>{
    remaining=Math.max(0,Math.ceil((endAt-Date.now())/1000));
    updateTimer();

    if(remaining===0){
      clearInterval(timerInterval);
      timerInterval=null;

      const elapsed=focusStarted?
        Math.floor((Date.now()-focusStarted)/1000):duration;

      if(mode==="FOCUS SESSION"){
        focusSeconds+=elapsed;
        localStorage.setItem("bloomFocus",focusSeconds);
        updateStats();
      }

      focusStarted=null;
      endAt=null;

      alert(mode==="FOCUS SESSION"?
        "Wonderful! Study session completed 🌷 Take a break!":
        "Break completed! Ready to focus again?");
    }
  },250);
}

function pauseTimer(){
  if(!timerInterval)return;

  remaining=Math.max(0,Math.ceil((endAt-Date.now())/1000));
  clearInterval(timerInterval);
  timerInterval=null;
  endAt=null;

  if(focusStarted&&mode==="FOCUS SESSION"){
    focusSeconds+=Math.floor((Date.now()-focusStarted)/1000);
    localStorage.setItem("bloomFocus",focusSeconds);
    updateStats();
  }

  focusStarted=null;
  updateTimer();
}

function resetTimer(){
  clearInterval(timerInterval);
  timerInterval=null;
  remaining=duration;
  endAt=null;
  focusStarted=null;
  updateTimer();
}

function setMode(minutes,button){
  pauseTimer();

  duration=minutes*60;
  remaining=duration;
  mode=minutes===5?"SHORT BREAK":"FOCUS SESSION";

  document.querySelectorAll(".mode-buttons button")
    .forEach(b=>b.classList.remove("active"));

  button.classList.add("active");
  updateTimer();
}

/* LOAD */
render();
updateTimer();
</script>
</body>
</html>
```

## OUTPUT

![alt text](image.png)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.
