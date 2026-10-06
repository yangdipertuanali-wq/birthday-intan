/* =========================================================
   BIRTHDAY INTAN NUR AINI 💗
   SCRIPT LENGKAP
========================================================= */

const PASSWORD_HASH =
"117aa5c540f10f30459f8f21c8b68e1ba3e71bccd3f98ffda7c00237907eef2d";


/* =========================================================
   SURAT UNTUK INTAN
========================================================= */

const letterText = `sayangkuuu selamattt ulangg tahunn, 19 tahunn sudahhh kamuu berjuang dann belajar, banyakk hal sudahhh terjadii, pelan-pelan dari kamuu remaja menuju dewasa, kamuu beradaptasiii, kamuu berkembangg, terimakasihh udah bertahann selamaa inii, terimaa kasihh selalu menjadii pribadii yangg tangguh, baik untuk keluargaa, sahabatt,dann pacarmuu. tidakk hanya ituu, di umurr 18 menujuu 19, kamuu kenal akuu, tanpaa adaa rencanaa sedikitpunn kitaa punn akhirnya dekatt, dan jadiann di harii selasaa tanggal 30 junii 2026, terimaa kasihh sudahh mau jadii pacarkuu, sehatt selaluu yahh sayangg, panjangg umurr, semogaa selaluu diberkahi, berkelimpahann, selaluu di kelilingii kebaikann, orang2 yangg selaluu supportt dengann smn, i lovee uu bbyy🤍💕 –pacarmuu palingg ganteng alexx bhizer`;


/* =========================================================
   HASH PASSWORD
========================================================= */

async function hash(text){

    const buffer =
        await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(text)
        );

    return [...new Uint8Array(buffer)]
        .map(
            x =>
                x.toString(16)
                 .padStart(2,"0")
        )
        .join("");
}


/* =========================================================
   PINDAH HALAMAN
========================================================= */

function go(number){

    document
        .querySelectorAll(".page")
        .forEach(page=>{
            page.classList.remove("active");
        });

    const page =
        document.getElementById("p" + number);

    if(page){

        page.classList.add("active");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
}


/* =========================================================
   PASSWORD HALAMAN PERTAMA
========================================================= */

async function unlockFirst(){

    const input =
        document.getElementById("firstPw");

    const message =
        document.getElementById("firstMsg");

    if(!input) return;

    const entered =
        input.value.trim();

    if(
        await hash(entered)
        === PASSWORD_HASH
    ){

        const lock =
            document.getElementById(
                "firstLock"
            );

        const content =
            document.getElementById(
                "birthdayContent"
            );

        if(lock){
            lock.classList.add("hidden");
        }

        if(content){
            content.classList.remove("hidden");
        }

    }else{

        if(message){

            message.textContent =
                "passwordnya belum tepat, coba lagi yaa 🌷";
        }

        input.value = "";
        input.focus();
    }
}


/* =========================================================
   PASSWORD HALAMAN TERAKHIR
========================================================= */

async function unlock(){

    const input =
        document.getElementById("pw");

    const message =
        document.getElementById("msg");

    if(!input) return;

    const entered =
        input.value.trim();

    if(
        await hash(entered)
        === PASSWORD_HASH
    ){

        go(5);

        typeLetter();

    }else{

        if(message){

            message.textContent =
                "passwordnya salahh 🥺💗";
        }

        input.value = "";
        input.focus();
    }
}


/* =========================================================
   ENTER PASSWORD
========================================================= */

const firstPw =
    document.getElementById("firstPw");

const finalPw =
    document.getElementById("pw");


if(firstPw){

    firstPw.addEventListener(
        "keydown",
        event=>{

            if(event.key === "Enter"){

                unlockFirst();

            }
        }
    );
}


if(finalPw){

    finalPw.addEventListener(
        "keydown",
        event=>{

            if(event.key === "Enter"){

                unlock();

            }
        }
    );
}


/* =========================================================
   MUSIK
========================================================= */

const music =
    document.getElementById("music");


function toggleMusic(){

    if(!music) return;

    if(music.paused){

        music.play().catch(()=>{});

    }else{

        music.pause();

    }
}


/* =========================================================
   COUNTDOWN
========================================================= */

let giftOpened = false;


function updateCountdown(){

    const now =
        new Date();


    const year =
        now.getFullYear();


    /*
      7 Oktober tahun ini
    */

    const birthday =
        new Date(
            year,
            9,
            7,
            0,
            0,
            0,
            0
        );


    /*
      Apakah hari ini 7 Oktober?
    */

    const isBirthday =
        now.getMonth() === 9 &&
        now.getDate() === 7;


    const count =
        document.getElementById(
            "count"
        );


    const gift =
        document.querySelector(
            ".gift"
        );


    const giftBox =
        document.querySelector(
            ".gift .box"
        );


    const giftText =
        document.getElementById(
            "giftText"
        );


    if(!count) return;


    /* =====================================================
       HARI ULANG TAHUN
    ===================================================== */

    if(isBirthday){

        /*
          PENTING:
          sepanjang tanggal 7 Oktober
          countdown tetap 00 : 00 : 00 : 00
        */

        count.textContent =
            "00 : 00 : 00 : 00";


        if(gift){

            gift.classList.add(
                "ready"
            );
        }


        /*
          Kalau kado belum dibuka
        */

        if(!giftOpened){

            if(giftText){

                giftText.textContent =
                    "buka kadonya sayangkuu 🎁💗";
            }


            if(giftBox){

                giftBox.textContent =
                    "🎁";

                giftBox.style.cursor =
                    "pointer";
            }
        }


        return;
    }


    /* =====================================================
       SEBELUM ULANG TAHUN
    ===================================================== */

    if(now < birthday){

        const remaining =
            birthday - now;


        const days =
            Math.floor(
                remaining / 86400000
            );


        const hours =
            Math.floor(
                remaining / 3600000
            ) % 24;


        const minutes =
            Math.floor(
                remaining / 60000
            ) % 60;


        const seconds =
            Math.floor(
                remaining / 1000
            ) % 60;


        count.textContent =
            [
                days,
                hours,
                minutes,
                seconds
            ]
            .map(
                number =>
                    String(number)
                    .padStart(2,"0")
            )
            .join(" : ");


        if(giftText){

            giftText.textContent =
                "tunggu sampai waktunya tiba... ✨";
        }


        if(giftBox){

            giftBox.textContent =
                "🎁";

            giftBox.style.cursor =
                "default";
        }


        if(gift){

            gift.classList.remove(
                "ready"
            );
        }


        return;
    }


    /* =====================================================
       SETELAH 7 OKTOBER
    ===================================================== */

    const nextBirthday =
        new Date(
            year + 1,
            9,
            7,
            0,
            0,
            0,
            0
        );


    const remaining =
        nextBirthday - now;


    const days =
        Math.floor(
            remaining / 86400000
        );


    const hours =
        Math.floor(
            remaining / 3600000
        ) % 24;


    const minutes =
        Math.floor(
            remaining / 60000
        ) % 60;


    const seconds =
        Math.floor(
            remaining / 1000
        ) % 60;


    count.textContent =
        [
            days,
            hours,
            minutes,
            seconds
        ]
        .map(
            number =>
                String(number)
                .padStart(2,"0")
        )
        .join(" : ");
}


/*
  Jalankan sekarang
*/

updateCountdown();


/*
  Update setiap detik
*/

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   ANIMASI KADO
========================================================= */

const giftBox =
    document.querySelector(
        ".gift .box"
    );


if(giftBox){

    giftBox.addEventListener(
        "click",
        openBirthdayGift
    );
}


function openBirthdayGift(){

    const now =
        new Date();


    /*
      Kado hanya boleh dibuka
      tanggal 7 Oktober
    */

    const isBirthday =
        now.getMonth() === 9 &&
        now.getDate() === 7;


    if(!isBirthday){

        return;
    }


    if(giftOpened){

        return;
    }


    giftOpened = true;


    /*
      ==============================================
      1. KADO BERGOYANG
      ==============================================
    */

    giftBox.style.animation =
        "giftShake 0.8s ease";


    /*
      ==============================================
      2. Setelah bergoyang
      ==============================================
    */

    setTimeout(()=>{

        giftBox.style.animation =
            "giftOpen 0.7s ease";


        /*
          ==========================================
          3. SPARKLE / BINTANG
          ==========================================
        */

        createSparkles();


        /*
          ==========================================
          4. HATI TERBANG
          ==========================================
        */

        createHearts();


    },800);


    /*
      ==============================================
      5. Setelah kado terbuka
      ==============================================
    */

    setTimeout(()=>{

        const giftText =
            document.getElementById(
                "giftText"
            );


        if(giftText){

            giftText.innerHTML = `
                <span class="birthday-message">
                    HAPPY BIRTHDAY<br>
                    SAYANGKUUU 💗
                </span>
            `;
        }


        /*
          Boneka lucu
        */

        giftBox.innerHTML = `
            <div class="birthday-doll">
                🧸
                <div class="doll-bow">
                    🎀
                </div>
            </div>
        `;


        giftBox.style.cursor =
            "default";


        giftBox.style.animation =
            "dollAppear 1s cubic-bezier(.17,.89,.32,1.49)";


        /*
          Tambahkan cahaya
        */

        giftBox.style.filter =
            "drop-shadow(0 0 25px rgba(255,120,200,.9))";


    },1500);


    /*
      ==============================================
      6. Confetti terakhir
      ==============================================
    */

    setTimeout(()=>{

        createConfetti();

    },1700);

}


/* =========================================================
   SPARKLE
========================================================= */

function createSparkles(){

    const symbols = [
        "✨",
        "💫",
        "⭐",
        "💖",
        "💕",
        "🌟"
    ];


    for(
        let i = 0;
        i < 35;
        i++
    ){

        const sparkle =
            document.createElement(
                "span"
            );


        sparkle.className =
            "birthday-sparkle";


        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        sparkle.style.left =
            (
                50 +
                Math.random()*40 -
                20
            ) + "%";


        sparkle.style.top =
            (
                55 +
                Math.random()*25 -
                12
            ) + "%";


        sparkle.style.setProperty(
            "--moveX",
            (
                Math.random()*360 -
                180
            ) + "px"
        );


        sparkle.style.setProperty(
            "--moveY",
            (
                Math.random()*-350 -
                50
            ) + "px"
        );


        sparkle.style.setProperty(
            "--rotate",
            (
                Math.random()*720 -
                360
            ) + "deg"
        );


        document.body.appendChild(
            sparkle
        );


        setTimeout(
            ()=>{
                sparkle.remove();
            },
            2200
        );
    }
}


/* =========================================================
   HATI
========================================================= */

function createHearts(){

    const hearts = [
        "💗",
        "💕",
        "💖",
        "💞",
        "💓",
        "💘"
    ];


    for(
        let i = 0;
        i < 20;
        i++
    ){

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "birthday-heart";


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            Math.random()*100 +
            "%";


        heart.style.animationDelay =
            Math.random()*1 +
            "s";


        heart.style.setProperty(
            "--side",
            (
                Math.random()*180 -
                90
            ) + "px"
        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            ()=>{
                heart.remove();
            },
            3500
        );
    }
}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(){

    const pieces = [
        "💗",
        "💕",
        "✨",
        "🎀",
        "💖",
        "⭐"
    ];


    for(
        let i = 0;
        i < 30;
        i++
    ){

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "birthday-confetti";


        piece.textContent =
            pieces[
                Math.floor(
                    Math.random() *
                    pieces.length
                )
            ];


        piece.style.left =
            Math.random()*100 +
            "%";


        piece.style.animationDelay =
            Math.random()*1.2 +
            "s";


        document.body.appendChild(
            piece
        );


        setTimeout(
            ()=>{
                piece.remove();
            },
            4000
        );
    }
}


/* =========================================================
   SURAT DIKETIK PER KATA
========================================================= */

function typeLetter(){

    const element =
        document.getElementById(
            "typed"
        );


    if(!element) return;


    element.textContent =
        "";


    const words =
        letterText.split(" ");


    let index = 0;


    function nextWord(){

        if(index >= words.length){

            return;
        }


        element.textContent +=
            (index ? " " : "") +
            words[index++];


        setTimeout(
            nextWord,
            145
        );
    }


    nextWord();
}


/* =========================================================
   BUNGA BACKGROUND
========================================================= */

const flowerSymbols = [
    "🌸",
    "🌷",
    "🌼",
    "🌺",
    "🌻",
    "💮",
    "🪻",
    "🌹"
];


const flowerLayer =
    document.querySelector(
        ".flowers"
    );


if(flowerLayer){

    for(
        let i = 0;
        i < 38;
        i++
    ){

        const flower =
            document.createElement(
                "span"
            );


        flower.className =
            "flower";


        flower.textContent =
            flowerSymbols[
                i % flowerSymbols.length
            ];


        flower.style.setProperty(
            "--left",
            Math.random()*100 +
            "%"
        );


        flower.style.setProperty(
            "--size",
            (
                0.7 +
                Math.random()*1.1
            ) + "rem"
        );


        flower.style.setProperty(
            "--dur",
            (
                7 +
                Math.random()*8
            ) + "s"
        );


        flower.style.setProperty(
            "--delay",
            -Math.random()*14 +
            "s"
        );


        flower.style.setProperty(
            "--drift",
            (
                -90 +
                Math.random()*180
            ) + "px"
        );


        flowerLayer.appendChild(
            flower
        );
    }
}


/* =========================================================
   CSS ANIMASI OTOMATIS
   Jadi TIDAK PERLU EDIT style.css
========================================================= */

const animationStyle =
document.createElement("style");


animationStyle.textContent = `

/* =========================
   KADO BERGOYANG
========================= */

@keyframes giftShake {

    0% {
        transform: scale(1) rotate(0deg);
    }

    15% {
        transform: scale(1.1) rotate(-8deg);
    }

    30% {
        transform: scale(1.15) rotate(8deg);
    }

    45% {
        transform: scale(1.2) rotate(-8deg);
    }

    60% {
        transform: scale(1.2) rotate(8deg);
    }

    75% {
        transform: scale(1.1) rotate(-4deg);
    }

    100% {
        transform: scale(1) rotate(0deg);
    }
}


/* =========================
   KADO TERBUKA
========================= */

@keyframes giftOpen {

    0% {
        transform:
            scale(1)
            rotate(0deg);
    }

    30% {
        transform:
            scale(1.35)
            rotate(-10deg);
    }

    55% {
        transform:
            scale(1.45)
            rotate(10deg);
    }

    75% {
        transform:
            scale(1.25)
            rotate(-5deg);
    }

    100% {
        transform:
            scale(1)
            rotate(0deg);
    }
}


/* =========================
   BONEKA MUNCUL
========================= */

@keyframes dollAppear {

    0% {
        opacity: 0;
        transform:
            scale(0)
            translateY(40px)
            rotate(-20deg);
    }

    50% {
        opacity: 1;
        transform:
            scale(1.3)
            translateY(-10px)
            rotate(8deg);
    }

    75% {
        transform:
            scale(.9)
            translateY(4px)
            rotate(-4deg);
    }

    100% {
        opacity: 1;
        transform:
            scale(1)
            translateY(0)
            rotate(0deg);
    }
}


.birthday-doll {

    position: relative;

    display: inline-block;

    font-size: 4.5rem;

    filter:
        drop-shadow(
            0 0 12px
            rgba(255,150,210,.7)
        );
}


.doll-bow {

    position: absolute;

    top: -10px;

    right: -15px;

    font-size: 2rem;

    animation:
        bowBounce
        1s ease-in-out infinite alternate;
}


@keyframes bowBounce {

    from {
        transform: rotate(-10deg);
    }

    to {
        transform: rotate(10deg);
    }
}


/* =========================
   UCAPAN
========================= */

.birthday-message {

    display: inline-block;

    animation:
        messageAppear
        1.2s
        ease
        forwards;

    font-weight: 800;

    letter-spacing: 1px;

    text-shadow:
        0 0 8px rgba(255,150,210,.7),
        0 0 20px rgba(255,120,190,.5);
}


@keyframes messageAppear {

    0% {
        opacity: 0;

        transform:
            translateY(25px)
            scale(.6);

        filter: blur(10px);
    }

    60% {
        opacity: 1;

        transform:
            translateY(-5px)
            scale(1.08);

        filter: blur(0);
    }

    100% {
        opacity: 1;

        transform:
            translateY(0)
            scale(1);
    }
}


/* =========================
   SPARKLE
========================= */

.birthday-sparkle {

    position: fixed;

    z-index: 99999;

    pointer-events: none;

    font-size: 1.6rem;

    animation:
        sparkleFly
        2.2s
        ease-out
        forwards;
}


@keyframes sparkleFly {

    0% {

        opacity: 0;

        transform:
            translate(-50%,-50%)
            scale(.2)
            rotate(0deg);
    }

    20% {

        opacity: 1;
    }

    100% {

        opacity: 0;

        transform:
            translate(
                var(--moveX),
                var(--moveY)
            )
            scale(1.5)
            rotate(var(--rotate));
    }
}


/* =========================
   HATI TERBANG
========================= */

.birthday-heart {

    position: fixed;

    bottom: -40px;

    z-index: 99998;

    pointer-events: none;

    font-size: 1.5rem;

    animation:
        heartFly
        3.5s
        ease-out
        forwards;
}


@keyframes heartFly {

    0% {

        opacity: 0;

        transform:
            translateY(0)
            translateX(0)
            scale(.3);
    }

    15% {

        opacity: 1;
    }

    100% {

        opacity: 0;

        transform:
            translateY(-110vh)
            translateX(var(--side))
            scale(1.5)
            rotate(30deg);
    }
}


/* =========================
   CONFETTI
========================= */

.birthday-confetti {

    position: fixed;

    top: -40px;

    z-index: 99997;

    pointer-events: none;

    font-size: 1.4rem;

    animation:
        confettiFall
        4s
        ease-in
        forwards;
}


@keyframes confettiFall {

    0% {

        opacity: 0;

        transform:
            translateY(0)
            rotate(0deg)
            scale(.5);
    }

    10% {

        opacity: 1;
    }

    100% {

        opacity: 0;

        transform:
            translateY(110vh)
            rotate(720deg)
            scale(1.2);
    }
}

`;


document.head.appendChild(
    animationStyle
);
