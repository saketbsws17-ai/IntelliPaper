let selectedRole="HOD";

const roles={
 HOD:{
  label:"HOD / Paper Setter",
  nav:[["dashboard","▦","Dashboard"],["questions","⌕","Question Bank"],["generate","✦","Generate Paper"],["history","◷","Paper History"],["analytics","◈","Analytics"]]
 },
 Faculty:{
  label:"Faculty",
  nav:[["dashboard","▦","Dashboard"],["questions","⌕","Question Bank"],["submit","＋","Submit Question"],["history","◷","Submission History"]]
 },
 Admin:{
  label:"Administrator",
  nav:[["dashboard","▦","Dashboard"],["users","♙","User Management"],["questions","⌕","Question Bank"],["settings","⚙","System Settings"]]
 }
};

document.querySelectorAll(".role").forEach(btn=>{
 btn.onclick=()=>{
  document.querySelectorAll(".role").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  selectedRole=btn.dataset.role;
  document.getElementById("username").value=selectedRole;
 };
});

document.getElementById("loginForm").onsubmit=e=>{
 e.preventDefault();
 const name=document.getElementById("username").value.trim();
 if(!name)return;
 document.getElementById("loginPage").classList.add("hidden");
 document.getElementById("app").classList.remove("hidden");
 setup(name);
 showToast("Login successful ✨");
};

function setup(name){
 const data=roles[selectedRole];
 document.getElementById("userName").textContent=name;
 document.getElementById("userRole").textContent=data.label;
 document.getElementById("avatar").textContent=name[0].toUpperCase();

 document.getElementById("nav").innerHTML=data.nav.map(x=>
  `<button class="nav-btn" data-page="${x[0]}">${x[1]}&nbsp;&nbsp;${x[2]}</button>`
 ).join("");

 document.querySelectorAll(".nav-btn").forEach(btn=>{
  btn.onclick=()=>showPage(btn.dataset.page);
 });

 showPage("dashboard");
}

function showPage(page){
 document.querySelectorAll(".nav-btn").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
 const titles={
  dashboard:"Dashboard",questions:"Question Bank",generate:"Generate Paper",
  history:"Paper History",analytics:"Analytics",submit:"Submit Question",
  users:"User Management",settings:"System Settings"
 };
 document.getElementById("title").textContent=titles[page]||"Dashboard";

 if(page==="dashboard") renderDashboard();
 else document.getElementById("content").innerHTML=`
  <div class="card">
   <h3>${titles[page]}</h3>
   <p class="sub">This module is reserved for Phase 2 / Phase 3.</p>
   <div style="text-align:center;padding:45px">
    <div style="font-size:45px">🚧</div>
    <p class="muted" style="margin-top:10px">Phase 1 interface is ready.</p>
   </div>
  </div>`;
}

function renderDashboard(){
 const content=document.getElementById("content");
 const d=selectedRole==="HOD"?hod():selectedRole==="Faculty"?faculty():admin();
 content.innerHTML=d;
}

function card(icon,label,num,change){
 return `<div class="card"><div>${icon}</div><div class="label">${label}</div><div class="number">${num}</div><small class="green">${change}</small></div>`;
}
function item(icon,title,sub){
 return `<div class="item"><div class="item-icon">${icon}</div><div><b>${title}</b><small>${sub}</small></div></div>`;
}

function hod(){
 return `<div class="banner"><h3>Good evening, HOD 👋</h3><p>Manage examination workflows from your intelligent workspace.</p></div>
 <div class="stats">${card("📚","Total Questions","126","+12 this week")}${card("✓","Approved Questions","94","74.6% approved")}${card("📝","Generated Papers","24","+5 this month")}${card("⏳","Pending Review","08","Needs attention")}</div>
 <div class="sections"><div class="card"><h3>Recent Activity</h3><p class="sub">Latest system activity</p><div class="activity">${item("✓","Question Q1023 approved","2 minutes ago")}${item("✦","Question paper generated","18 minutes ago")}${item("＋","New question submitted","1 hour ago")}${item("◷","Paper reviewed","Today")}</div></div>
 <div class="card"><h3>Quick Actions</h3><p class="sub">Frequently used workflows</p><div class="quick"><button onclick="showPage('generate')">✦ Generate Question Paper</button><button onclick="showPage('questions')">⌕ Open Question Bank</button><button onclick="showPage('history')">◷ View Paper History</button></div></div></div>`;
}

function faculty(){
 return `<div class="banner"><h3>Good evening, Faculty 👋</h3><p>Submit quality questions and manage your examination contributions.</p></div>
 <div class="stats">${card("＋","Questions Submitted","32","+4 this week")}${card("✓","Approved","25","78.1% approval")}${card("⏳","Pending","05","Awaiting review")}${card("✕","Rejected","02","This month")}</div>
 <div class="sections"><div class="card"><h3>Submission Activity</h3><p class="sub">Recent question submissions</p><div class="activity">${item("✓","Q1023 — ACID Properties","Approved")}${item("⏳","Q1030 — Normalization","Pending")}${item("✓","Q1012 — SQL Joins","Approved")}</div></div>
 <div class="card"><h3>Quick Actions</h3><p class="sub">Faculty workspace</p><div class="quick"><button onclick="showPage('submit')">＋ Submit New Question</button><button onclick="showPage('questions')">⌕ Browse Question Bank</button></div></div></div>`;
}

function admin(){
 return `<div class="banner"><h3>System Administration 🛠️</h3><p>Monitor users and the overall IQPG platform.</p></div>
 <div class="stats">${card("♙","Total Users","48","+3 this month")}${card("👨‍🏫","Faculty","39","Active users")}${card("👨‍💼","HOD / Setters","06","Active users")}${card("●","System Status","Online","All services normal")}</div>
 <div class="sections"><div class="card"><h3>System Overview</h3><p class="sub">Current platform status</p><div class="activity">${item("●","Frontend","Operational")}${item("●","Authentication","Operational")}${item("●","Question Bank","Operational")}</div></div>
 <div class="card"><h3>Administration</h3><p class="sub">System controls</p><div class="quick"><button onclick="showPage('users')">♙ Manage Users</button><button onclick="showPage('settings')">⚙ System Settings</button></div></div></div>`;
}

document.getElementById("logout").onclick=()=>{
 document.getElementById("app").classList.add("hidden");
 document.getElementById("loginPage").classList.remove("hidden");
 showToast("Logged out successfully.");
};

function showToast(message){
 const t=document.getElementById("toast");
 t.textContent=message;t.classList.remove("hidden");
 clearTimeout(window.toastTimer);
 window.toastTimer=setTimeout(()=>t.classList.add("hidden"),2200);
}
