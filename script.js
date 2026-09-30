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

function targetDate(){
  // 7 October 2026, local time. If the date has passed, the counter targets the next 7 October.
  const now=new Date();
  let year=now.getFullYear();
  let target=new Date(year,9,7,0,0,0);
  if(now>target) target=new Date(year+1,9,7,0,0,0);
  return target;
}
function updateCountdown(){
  const now=new Date(), d=Math.max(0,targetDate()-now);
  const s=Math.floor(d/1000), days=Math.floor(s/86400), hrs=Math.floor(s%86400/3600), mins=Math.floor(s%3600/60), secs=s%60;
  document.getElementById("countdown").textContent =
    `${String(days).padStart(2,"0")} : ${String(hrs).padStart(2,"0")} : ${String(mins).padStart(2,"0")} : ${String(secs).padStart(2,"0")}`;
}
setInterval(updateCountdown,1000); updateCountdown();

const PASSWORD_HASH="3371b0abb59656c658b91fbb2ff0159d905d73fc74a2a44282dde96ea978eba2";
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

const letter=`sayangkuuu selamattt ulangg tahunn, 19 tahunn sudahhh kamuu hidupp, banyakk hal sudahh terjadii, kamuu belajarr, kamuu beradaptasiii, kamuu berkembangg, terimakasihh udahh bertahann selamaa inii, terimaa kasihh selalu menjadii pribadii yangg tangguh, baik untuk keluargaa, sahabatt,dann pacarmuu tidakk hanya ituu, di umurr 18 menujuu 19, kamuu kenal akuu, tanpaa adaa rencanaa sedikitpunn kitaa punn akhirnya dekatt, dan jadiann di harii selasaa tanggal 30 junii 2026, terimaa kasihh sudahh mau jadii pacarkuu, sehatt selaluu yahh sayangg, panjangg umurr, semogaa selaluu diberkahi, berkelimpahann, selaluu di kelilingii kebaikann, orang2 yangg selaluu supportt dengann smn, i lovee uu bbyy🤍💕 –pacarmuu palingg ganteng alexx bhizer`;

async function startTyping(){
  const out=document.getElementById("typedLetter"), cursor=document.getElementById("typingCursor"), btn=document.getElementById("revealBtn");
  out.textContent="";
  // Word-by-word with a soft, readable rhythm.
  const words=letter.split(" ");
  for(let i=0;i<words.length;i++){
    out.textContent += (i?" ":"")+words[i];
    await new Promise(r=>setTimeout(r,65 + Math.random()*65));
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
    alert("Tambahkan file 'shape-of-my-heart.mp3' ke folder music website ini, lalu tekan tombol musik lagi yaa 💗");
  });
}
window.addEventListener("resize",()=>{const c=document.getElementById("confetti");c.width=innerWidth;c.height=innerHeight});
