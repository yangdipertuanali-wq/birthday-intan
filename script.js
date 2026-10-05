const PASSWORD_HASH="117aa5c540f10f30459f8f21c8b68e1ba3e71bccd3f98ffda7c00237907eef2d";

const letterText=`sayangkuuu selamattt ulangg tahunn, 19 tahunn sudahhh kamuu berjuang dann belajar, banyakk hal sudahhh terjadii, pelan-pelan dari kamuu remaja menuju dewasa, kamuu beradaptasiii, kamuu berkembangg, terimakasihh udah bertahann selamaa inii, terimaa kasihh selalu menjadii pribadii yangg tangguh, baik untuk keluargaa, sahabatt,dann pacarmuu. tidakk hanya ituu, di umurr 18 menujuu 19, kamuu kenal akuu, tanpaa adaa rencanaa sedikitpunn kitaa punn akhirnya dekatt, dan jadiann di harii selasaa tanggal 30 junii 2026, terimaa kasihh sudahh mau jadii pacarkuu, sehatt selaluu yahh sayangg, panjangg umurr, semogaa selaluu diberkahi, berkelimpahann, selaluu di kelilingii kebaikann, orang2 yangg selaluu supportt dengann smn, i lovee uu bbyy🤍💕 –pacarmuu palingg ganteng alexx bhizer`;

function go(n){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

async function hash(text){
  const data=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text));
  return [...new Uint8Array(data)].map(x=>x.toString(16).padStart(2,"0")).join("");
}

async function unlockFirst(){
  const input=document.getElementById("firstPw");
  const msg=document.getElementById("firstMsg");
  if(await hash(input.value.trim())===PASSWORD_HASH){
    document.getElementById("firstLock").classList.add("hidden");
    document.getElementById("birthdayContent").classList.remove("hidden");
    msg.textContent="";
    createFallingFlowers();
  }else{
    msg.textContent="passwordnya belum tepat, coba lagi yaa 🌷";
    input.value="";
    input.focus();
  }
}

async function unlock(){
  const input=document.getElementById("pw");
  const msg=document.getElementById("msg");
  if(await hash(input.value.trim())===PASSWORD_HASH){
    msg.textContent="";
    go(5);
    typeLetter();
  }else{
    msg.textContent="passwordnya salahh 🥺💗";
    input.value="";
    input.focus();
  }
}

document.getElementById("firstPw").addEventListener("keydown",e=>{if(e.key==="Enter")unlockFirst()});
document.getElementById("pw").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});

const music=document.getElementById("music");
function toggleMusic(){
  if(music.paused) music.play().catch(()=>{});
  else music.pause();
}

function updateCountdown(){
  const now=new Date();
  let target=new Date(now.getFullYear(),9,7,0,0,0);
  if(now>=target) target=new Date(now.getFullYear()+1,9,7,0,0,0);
  const diff=target-now;
  const d=Math.max(0,Math.floor(diff/86400000));
  const h=Math.max(0,Math.floor(diff/3600000)%24);
  const m=Math.max(0,Math.floor(diff/60000)%60);
  const s=Math.max(0,Math.floor(diff/1000)%60);
  document.getElementById("count").textContent=[d,h,m,s].map(v=>String(v).padStart(2,"0")).join(" : ");
  if(diff<=0){
    document.getElementById("giftText").textContent="✨ waktunya tiba! hadiah terbuka untukmu 💗";
  }
}
updateCountdown();
setInterval(updateCountdown,1000);

function typeLetter(){
  const el=document.getElementById("typed");
  el.textContent="";
  const words=letterText.split(" ");
  let i=0;
  function next(){
    if(i>=words.length)return;
    el.textContent+=(i?" ":"")+words[i++];
    setTimeout(next,145);
  }
  next();
}

/* Realistic-looking falling flower SVGs: petals, shading and centers instead of emoji. */
function flowerSVG(type){
  const defs=`<defs>
    <radialGradient id="pPink"><stop stop-color="#fff2f8"/><stop offset=".45" stop-color="#f59abc"/><stop offset="1" stop-color="#b93470"/></radialGradient>
    <radialGradient id="pRed"><stop stop-color="#ffd6de"/><stop offset=".4" stop-color="#ed708c"/><stop offset="1" stop-color="#8f2548"/></radialGradient>
    <radialGradient id="pYellow"><stop stop-color="#fff7bf"/><stop offset=".5" stop-color="#f5ca55"/><stop offset="1" stop-color="#bd721b"/></radialGradient>
    <radialGradient id="pPurple"><stop stop-color="#f4ddff"/><stop offset=".45" stop-color="#ba80e5"/><stop offset="1" stop-color="#663b9d"/></radialGradient>
  </defs>`;
  if(type===0)return `<svg viewBox="0 0 100 100">${defs}<g fill="url(#pPink)" stroke="#a92e68" stroke-width=".7"><ellipse cx="50" cy="22" rx="12" ry="27"/><ellipse cx="50" cy="78" rx="12" ry="27"/><ellipse cx="22" cy="50" rx="27" ry="12"/><ellipse cx="78" cy="50" rx="27" ry="12"/><ellipse cx="31" cy="31" rx="11" ry="25" transform="rotate(-45 31 31)"/><ellipse cx="69" cy="31" rx="11" ry="25" transform="rotate(45 69 31)"/><ellipse cx="31" cy="69" rx="11" ry="25" transform="rotate(45 31 69)"/><ellipse cx="69" cy="69" rx="11" ry="25" transform="rotate(-45 69 69)"/></g><circle cx="50" cy="50" r="12" fill="#e5a02e"/><circle cx="46" cy="46" r="2" fill="#fff1a5"/><circle cx="56" cy="52" r="2" fill="#fff1a5"/></svg>`;
  if(type===1)return `<svg viewBox="0 0 100 100">${defs}<g fill="url(#pRed)" stroke="#81233f" stroke-width=".7"><ellipse cx="50" cy="25" rx="16" ry="31"/><ellipse cx="73" cy="38" rx="19" ry="29" transform="rotate(38 73 38)"/><ellipse cx="77" cy="65" rx="20" ry="27" transform="rotate(70 77 65)"/><ellipse cx="51" cy="77" rx="19" ry="29" transform="rotate(8 51 77)"/><ellipse cx="28" cy="61" rx="20" ry="28" transform="rotate(-55 28 61)"/><ellipse cx="25" cy="35" rx="18" ry="27" transform="rotate(-25 25 35)"/></g><circle cx="51" cy="53" r="10" fill="#8d5522"/></svg>`;
  if(type===2)return `<svg viewBox="0 0 100 100">${defs}<g fill="url(#pYellow)" stroke="#b56f18" stroke-width=".7"><ellipse cx="50" cy="19" rx="8" ry="31"/><ellipse cx="50" cy="81" rx="8" ry="31"/><ellipse cx="19" cy="50" rx="31" ry="8"/><ellipse cx="81" cy="50" rx="31" ry="8"/><ellipse cx="29" cy="29" rx="8" ry="28" transform="rotate(-45 29 29)"/><ellipse cx="71" cy="29" rx="8" ry="28" transform="rotate(45 71 29)"/><ellipse cx="29" cy="71" rx="8" ry="28" transform="rotate(45 29 71)"/><ellipse cx="71" cy="71" rx="8" ry="28" transform="rotate(-45 71 71)"/></g><circle cx="50" cy="50" r="14" fill="#75421b"/><circle cx="45" cy="46" r="2" fill="#f8d86c"/><circle cx="56" cy="54" r="2" fill="#f8d86c"/></svg>`;
  return `<svg viewBox="0 0 100 100">${defs}<g fill="url(#pPurple)" stroke="#60388d" stroke-width=".7"><ellipse cx="50" cy="22" rx="15" ry="30"/><ellipse cx="78" cy="50" rx="30" ry="15"/><ellipse cx="50" cy="78" rx="15" ry="30"/><ellipse cx="22" cy="50" rx="30" ry="15"/><ellipse cx="30" cy="30" rx="14" ry="27" transform="rotate(-45 30 30)"/><ellipse cx="70" cy="30" rx="14" ry="27" transform="rotate(45 70 30)"/><ellipse cx="30" cy="70" rx="14" ry="27" transform="rotate(45 30 70)"/><ellipse cx="70" cy="70" rx="14" ry="27" transform="rotate(-45 70 70)"/></g><circle cx="50" cy="50" r="11" fill="#e6ad45"/></svg>`;
}

function createFallingFlowers(){
  const layer=document.getElementById("fallingFlowers");
  if(layer.dataset.ready==="1")return;
  layer.dataset.ready="1";
  for(let i=0;i<24;i++){
    const f=document.createElement("span");
    f.className="falling-flower";
    f.innerHTML=flowerSVG(i%4);
    f.style.setProperty("--left",(Math.random()*100)+"%");
    f.style.setProperty("--size",(25+Math.random()*42)+"px");
    f.style.setProperty("--duration",(8+Math.random()*9)+"s");
    f.style.setProperty("--delay",(-Math.random()*15)+"s");
    f.style.setProperty("--drift",(-100+Math.random()*200)+"px");
    layer.appendChild(f);
  }
}
