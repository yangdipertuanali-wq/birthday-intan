const pages = [...document.querySelectorAll(".page")];
let unlocked = false;
let musicOn = false;
let typingStarted = false;

function go(n){
  pages.forEach((p,i)=>p.classList.toggle("active",i===n-1));
  window.scrollTo({top:0,behavior:"smooth"});
  if(n===5 && !typingStarted){ typingStarted=true; startTyping(); }
  burstHearts(8);
}

const BIRTHDAY_TARGET = new Date("2026-10-07T00:00:00+07:00");
let birthdayReached = false;

function updateCountdown(){
  const now=new Date();
  const remaining=BIRTHDAY_TARGET-now;
  const el=document.getElementById("countdown");
  const reward=document.getElementById("birthdayReward");
  const startBtn=document.getElementById("startJourneyBtn");

  if(remaining<=0){
    birthdayReached=true;
    el.textContent="00 : 00 : 00 : 00";
    reward.classList.remove("hidden");
    startBtn.classList.add("hidden");
    if(!window._birthdayCelebrated){
      window._birthdayCelebrated=true;
      burstHearts(30);
      confetti();
    }
    return;
  }

  const total=Math.floor(remaining/1000);
  const days=Math.floor(total/86400);
  const hrs=Math.floor(total%86400/3600);
  const mins=Math.floor(total%3600/60);
  const secs=total%60;
  el.textContent=`${String(days).padStart(2,"0")} : ${String(hrs).padStart(2,"0")} : ${String(mins).padStart(2,"0")} : ${String(secs).padStart(2,"0")}`;
}
setInterval(updateCountdown,1000); updateCountdown();

function openBirthdayGift(){
  burstHearts(55);
  confetti();
  const reward=document.getElementById("birthdayReward");
  reward.innerHTML=`
    <div class="reward-glow">💖</div>
    <p class="eyebrow">FOR MY FAVORITE GIRL</p>
    <h2>HAPPY 19TH BIRTHDAY, INTANNN! 🎂💐</h2>
    <p>Hadiah pertama sudah kebuka... sekarang lanjut masuk ke perjalanan kecil yang Ali buat khusus buat kamu yaa 🥹💕</p>
    <button class="btn primary" onclick="go(2)">LANJUT BUKA SEMUANYA 💌</button>
  `;
  reward.classList.add("opened");
  document.getElementById("bgMusic").play().then(()=>musicOn=true).catch(()=>{});
}

const PASSWORD_HASH="117aa5c540f10f30459f8f21c8b68e1ba3e71bccd3f98ffda7c00237907eef2d";
async function sha256(text){
  const data=new TextEncoder().encode(text);
  const hash=await crypto.subtle.digest("SHA-256",data);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
async function unlock(){
  const input=document.getElementById("password");
  const msg=document.getElementById("passmsg");
  if(!input.value){msg.textContent="Isi password rahasianya duluu 🤭"; return;}
  const ok=(await sha256(input.value))===PASSWORD_HASH;
  if(ok){
    unlocked=true; msg.textContent="Akses diterima 💗 tungguu...";
    burstHearts(30); setTimeout(()=>go(5),650);
  }else{
    msg.textContent="Hehe bukan itu 🤭 coba lagi yaa...";
    input.animate([{transform:"translateX(-7px)"},{transform:"translateX(7px)"},{transform:"translateX(0)"}],{duration:250});
  }
}

const letter=`sayangkuuu selamattt ulangg tahunn, 19 tahunn sudahhh kamuu berjuang dann belajar, banyakk hal sudahh terjadii, pelan-pelan dari kamuu remaja menuju dewasa, kamuu beradaptasiii, kamuu berkembangg, terimakasihh udah bertahann selamaa inii, terimaa kasihh selalu menjadii pribadii yangg tangguh, baik untuk keluargaa, sahabatt,dann pacarmuu. tidakk hanya ituu, di umurr 18 menujuu 19, kamuu kenal akuu, tanpaa adaa rencanaa sedikitpunn kitaa punn akhirnya dekatt, dan jadiann di harii selasaa tanggal 30 junii 2026, terimaa kasihh sudahh mau jadii pacarkuu, sehatt selaluu yahh sayangg, panjangg umurr, semogaa selaluu diberkahi, berkelimpahann, selaluu di kelilingii kebaikann, orang2 yangg selaluu supportt dengann smn, i lovee uu bbyy🤍💕 –pacarmuu palingg ganteng alexx bhizer`;

async function startTyping(){
  const out=document.getElementById("typedLetter"), cursor=document.getElementById("typingCursor"), btn=document.getElementById("revealBtn");
  out.textContent="";
  // Word-by-word with a soft, readable rhythm.
  const words=letter.split(" ");
  for(let i=0;i<words.length;i++){
    out.textContent += (i?" ":"")+words[i];
    await new Promise(r=>setTimeout(r,320 + Math.random()*260));
  }
  cursor.classList.add("hidden"); btn.classList.remove("hidden"); burstHearts(16);
}
function celebrate(){
  burstHearts(45);
  confetti();
  document.querySelector("#page5 h2").textContent="HAPPY BIRTHDAYY SAYANGKUU 🥹💞";
  document.querySelector("#revealBtn").textContent="I LOVE U BBBYY 🤍💕";
}
function burstHearts(count=12){
  const box=document.getElementById("hearts");
  const symbols=["💗","💖","💞","💕","🤍","✨","🫶🏻"];
  for(let i=0;i<count;i++){
    const e=document.createElement("span"); e.className="floating-heart";
    e.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    e.style.left=Math.random()*100+"vw";
    e.style.animationDuration=(3+Math.random()*4)+"s";
    e.style.fontSize=(14+Math.random()*22)+"px";
    box.appendChild(e); setTimeout(()=>e.remove(),8000);
  }
}
setInterval(()=>burstHearts(1),1600);

function confetti(){
  const c=document.getElementById("confetti"), ctx=c.getContext("2d");
  c.width=innerWidth; c.height=innerHeight;
  const pieces=Array.from({length:130},()=>({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*12,vy:-Math.random()*12-3,g:0.3,r:Math.random()*6+3,a:1,rot:Math.random()*6}));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.rot+=.15;p.a-=.006;
      ctx.save();ctx.globalAlpha=Math.max(0,p.a);ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.fillStyle=["#ff8dcc","#ffd3ef","#b69cff","#fff","#ff6fba"][frame%5];ctx.fillRect(-p.r/2,-p.r/2,p.r*2,p.r);
      ctx.restore();
    });
    if(frame++<180) requestAnimationFrame(draw); else ctx.clearRect(0,0,c.width,c.height);
  } draw();
}

function toggleMusic(){
  const audio=document.getElementById("bgMusic");
  if(musicOn){audio.pause();musicOn=false;return;}
  audio.play().then(()=>musicOn=true).catch(()=>{
    alert("Musiknya belum bisa diputar. Pastikan file musik-untuk-intan.mp3 sudah ada di folder utama website yaa 💗");
  });
}
window.addEventListener("resize",()=>{const c=document.getElementById("confetti");c.width=innerWidth;c.height=innerHeight});
