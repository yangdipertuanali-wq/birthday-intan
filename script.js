const PASSWORD_HASH =
"117aa5c540f10f30459f8f21c8b68e1ba3e71bccd3f98ffda7c00237907eef2d";

const letterText=`sayangkuuu selamattt ulangg tahunn, 19 tahunn sudahhh kamuu berjuang dann belajar, banyakk hal sudahhh terjadii, pelan-pelan dari kamuu remaja menuju dewasa, kamuu beradaptasiii, kamuu berkembangg, terimakasihh udah bertahann selamaa inii, terimaa kasihh selalu menjadii pribadii yangg tangguh, baik untuk keluargaa, sahabatt,dann pacarmuu. tidakk hanya ituu, di umurr 18 menujuu 19, kamuu kenal akuu, tanpaa adaa rencanaa sedikitpunn kitaa punn akhirnya dekatt, dan jadiann di harii selasaa tanggal 30 junii 2026, terimaa kasihh sudahh mau jadii pacarkuu, sehatt selaluu yahh sayangg, panjangg umurr, semogaa selaluu diberkahi, berkelimpahann, selaluu di kelilingii kebaikann, orang2 yangg selaluu supportt dengann smn, i lovee uu bbyy🤍💕 –pacarmuu palingg ganteng alexx bhizer`;


/* =========================
   PASSWORD HASH
========================= */

async function hash(text){
    const buffer = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(text)
    );

    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2,"0"))
        .join("");
}


/* =========================
   PINDAH HALAMAN
========================= */

function go(number){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    const page = document.getElementById("p" + number);

    if(page){
        page.classList.add("active");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
}


/* =========================
   PASSWORD HALAMAN PERTAMA
========================= */

async function unlockFirst(){

    const input = document.getElementById("firstPw");
    const message = document.getElementById("firstMsg");

    if(!input) return;

    const enteredPassword = input.value.trim();

    if(await hash(enteredPassword) === PASSWORD_HASH){

        const lock = document.getElementById("firstLock");
        const content = document.getElementById("birthdayContent");

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


/* =========================
   PASSWORD HALAMAN TERAKHIR
========================= */

async function unlock(){

    const input = document.getElementById("pw");
    const message = document.getElementById("msg");

    if(!input) return;

    if(await hash(input.value.trim()) === PASSWORD_HASH){

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


/* =========================
   ENTER UNTUK PASSWORD
========================= */

const firstPasswordInput =
    document.getElementById("firstPw");

const finalPasswordInput =
    document.getElementById("pw");

if(firstPasswordInput){

    firstPasswordInput.addEventListener(
        "keydown",
        event=>{
            if(event.key === "Enter"){
                unlockFirst();
            }
        }
    );
}

if(finalPasswordInput){

    finalPasswordInput.addEventListener(
        "keydown",
        event=>{
            if(event.key === "Enter"){
                unlock();
            }
        }
    );
}


/* =========================
   MUSIK
========================= */

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


/* =========================
   COUNTDOWN ULANG TAHUN
========================= */

function updateCountdown(){

    const now = new Date();

    const currentYear =
        now.getFullYear();

    /*
      7 OKTOBER JAM 00:00
    */

    const birthdayThisYear =
        new Date(
            currentYear,
            9,
            7,
            0,
            0,
            0,
            0
        );

    /*
      Apakah sekarang tanggal
      7 Oktober?
    */

    const isBirthday =
        now.getMonth() === 9 &&
        now.getDate() === 7;

    let target;

    /*
      TANGGAL 7 OKTOBER
    */

    if(isBirthday){

        target = birthdayThisYear;

    }

    /*
      SEBELUM 7 OKTOBER
    */

    else if(now < birthdayThisYear){

        target = birthdayThisYear;

    }

    /*
      SETELAH 7 OKTOBER
    */

    else{

        target =
            new Date(
                currentYear + 1,
                9,
                7,
                0,
                0,
                0,
                0
            );
    }


    const count =
        document.getElementById("count");

    const gift =
        document.querySelector(".gift");

    const giftBox =
        document.querySelector(".gift .box");

    const giftText =
        document.getElementById("giftText");


    if(!count) return;


    /* =========================
       SUDAH TANGGAL 7 OKTOBER
    ========================= */

    if(isBirthday){

        count.textContent =
            "00 : 00 : 00 : 00";


        /*
          Kado tetap tampil.
          Belum dibuka otomatis.
        */

        if(giftText){

            giftText.textContent =
                "buka kadonya sayangkuu 🎁💗";
        }


        if(gift){

            gift.classList.add("ready");

        }


        if(giftBox){

            giftBox.textContent = "🎁";

            giftBox.style.cursor =
                "pointer";
        }


        return;
    }


    /* =========================
       COUNTDOWN NORMAL
    ========================= */

    const remaining =
        Math.max(
            0,
            target - now
        );


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


    /*
      Sebelum waktunya:
      kado belum bisa dibuka.
    */

    if(giftText){

        giftText.textContent =
            "tunggu sampai waktunya tiba... ✨";
    }


    if(gift){

        gift.classList.remove("ready");

    }


    if(giftBox){

        giftBox.textContent = "🎁";

        giftBox.style.cursor =
            "default";
    }
}


/*
  Jalankan countdown
*/

updateCountdown();


/*
  Update setiap detik
*/

setInterval(
    updateCountdown,
    1000
);


/* =========================
   BUKA KADO
========================= */

let giftOpened = false;

const gift =
    document.querySelector(".gift");

const giftBox =
    document.querySelector(".gift .box");


if(giftBox){

    giftBox.addEventListener(
        "click",
        function(){

            const now =
                new Date();

            /*
              Hanya bisa dibuka
              pada 7 Oktober.
            */

            const isBirthday =
                now.getMonth() === 9 &&
                now.getDate() === 7;


            if(!isBirthday){

                return;
            }


            /*
              Kalau sudah dibuka,
              jangan buka lagi.
            */

            if(giftOpened){

                return;
            }


            giftOpened = true;


            /*
              Animasi kado
            */

            giftBox.classList.add(
                "opened"
            );


            /*
              Setelah animasi,
              tampilkan ucapan.
            */

            setTimeout(
                ()=>{

                    const giftText =
                        document.getElementById(
                            "giftText"
                        );


                    if(giftText){

                        giftText.innerHTML =
                            `
                            <strong>
                            HAPPY BIRTHDAY
                            SAYANGKUUU 💗
                            </strong>
                            `;
                    }


                    /*
                      Boneka lucu
                    */

                    giftBox.innerHTML =
                        `
                        <div class="cute-doll">
                            🧸
                            <span>🎀</span>
                        </div>
                        `;


                    giftBox.classList.add(
                        "doll-show"
                    );


                },
                700
            );

        }
    );
}


/* =========================
   SURAT ULANG TAHUN
========================= */

function typeLetter(){

    const element =
        document.getElementById("typed");

    if(!element) return;


    element.textContent = "";


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


/* =========================
   BUNGA BACKGROUND
========================= */

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
            Math.random() * 100 + "%"
        );


        flower.style.setProperty(
            "--size",
            0.7 +
            Math.random() * 1.1 +
            "rem"
        );


        flower.style.setProperty(
            "--dur",
            7 +
            Math.random() * 8 +
            "s"
        );


        flower.style.setProperty(
            "--delay",
            -Math.random() * 14 +
            "s"
        );


        flower.style.setProperty(
            "--drift",
            -90 +
            Math.random() * 180 +
            "px"
        );


        flowerLayer.appendChild(
            flower
        );
    }
      }
