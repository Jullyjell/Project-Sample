const heartSymbols = ["♡", "♥", "💗", "💕", "💖"];

const atmosphere = document.getElementById("dreamyAtmosphere");

function createHeart() {
    if (!atmosphere) return;

    const heart = document.createElement("span");

    heart.classList.add("dream-particle");

    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.setProperty(
        "--particle-size",
        Math.random() * 12 + 12 + "px"
    );

    heart.style.setProperty(
        "--particle-duration",
        Math.random() * 5 + 6 + "s"
    );

    atmosphere.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 11000);
}

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (!reducedMotion.matches) {
    setInterval(createHeart, 650);
}


const memories = [
    {
        type: "image",
        src: "Memories/Memory1.jpg",
        title: "Our First Little Memory ♡",
        message: "Tulis cerita kenangan pertama di sini."
    },
    {
        type: "video",
        src: "Memories/Memory2.mp4",
        title: "That One Day 💗",
        message: "Tulis cerita kenangan kedua di sini."
    },
    {
        type: "image",
        src: "Memories/Memory3.jpg",
        title: "A Random Moment",
        message: "Tulis cerita kenangan ketiga di sini."
    },
    {
        type: "image",
        src: "Memories/Memory4.jpg",
        title: "My Favorite Person",
        message: "Tulis cerita kenangan keempat di sini."
    },
    {
        type: "video",
        src: "Memories/Memory5.mp4",
        title: "A Little Moment on Replay 🎥",
        message: "Ada momen yang rasanya pengen diputar berulang kali."
    },
    {
        type: "image",
        src: "Memories/Memory6.jpg",
        title: "Little Things Matter",
        message: "Tulis cerita kenangan kelima di sini."
    },
    {
        type: "image",
        src: "Memories/Memory7.jpg",
        title: "You Make Me Smile",
        message: "Tulis cerita kenangan keenam di sini."
    },
    {
        type: "image",
        src: "Memories/Memory8.jpg",
        title: "More Memories to Come ♡",
        message: "Semoga masih banyak cerita yang bisa kita buat."
    },
    {
        type: "image",
        src: "Memories/Memory9.jpg",
        title: "Another Beautiful Day",
        message: "Tulis cerita kenangan kedelapan di sini."
    },
    {
        type: "video",
        src: "Memories/Memory10.mp4",
        title: "Our Last Little Memory 💗",
        message: "Semoga ini bukan jadi kenangan terakhir kita."
    }
];

const scrapbookOverlay = document.getElementById("scrapbookOverlay");
const openScrapbook = document.getElementById("openScrapbook");
const closeScrapbook = document.getElementById("closeScrapbook");

const scrapbookImage = document.getElementById("scrapbookImage");
const scrapbookVideo = document.getElementById("scrapbookVideo");
const playMemoryVideo = document.getElementById("playMemoryVideo");
const scrapbookTitle = document.getElementById("scrapbookTitle");
const scrapbookMessage = document.getElementById("scrapbookMessage");
const scrapbookCounter = document.getElementById("scrapbookCounter");
const nextScrapbook = document.getElementById("nextScrapbook");
const prevScrapbook = document.getElementById("prevScrapbook");
const scrapbookCard = document.querySelector(".scrapbook-card");

let currentMemory = 0;



function showMemory(index) {
    const memory = memories[index];

    scrapbookCard.classList.remove("changing");
    void scrapbookCard.offsetWidth;
    scrapbookCard.classList.add("changing");

    // Hentikan video sebelumnya
    scrapbookVideo.pause();
    scrapbookVideo.currentTime = 0;

    if (memory.type === "video") {
        scrapbookImage.style.display = "none";

        scrapbookVideo.style.display = "block";
        scrapbookVideo.querySelector("source").src = memory.src;
        scrapbookVideo.load();

        playMemoryVideo.style.display = "flex";

    } else {
        scrapbookVideo.style.display = "none";

        scrapbookImage.style.display = "block";
        scrapbookImage.src = memory.src;

        playMemoryVideo.style.display = "none";
    }

    scrapbookTitle.textContent = memory.title;
    scrapbookMessage.textContent = memory.message;

    scrapbookCounter.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;

    prevScrapbook.disabled = index === 0;

    if (index === memories.length - 1) {
        nextScrapbook.textContent = "OUR ENDING →";
    } else {
        nextScrapbook.textContent = "NEXT →";
    }
}

// MEMBUKA SCRAPBOOK
openScrapbook.addEventListener("click", () => {
    currentMemory = 0;
    showMemory(currentMemory);
    scrapbookOverlay.classList.add("show");
});

// MENUTUP SCRAPBOOK
function closeMemoryPopup() {
    scrapbookOverlay.classList.remove("show");

    // Hentikan dan reset video saat scrapbook ditutup
    scrapbookVideo.pause();
    scrapbookVideo.currentTime = 0;

    // Kembalikan tombol Play untuk pemutaran berikutnya
    playMemoryVideo.style.display = "flex";
}

// Klik tombol X
closeScrapbook.addEventListener("click", closeMemoryPopup);

// Klik area luar kartu
scrapbookOverlay.addEventListener("click", (event) => {
    if (event.target === scrapbookOverlay) {
        closeMemoryPopup();
    }
});

// Tekan ESC
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        scrapbookOverlay.classList.contains("show")
    ) {
        closeMemoryPopup();
    }
});


// TOMBOL BACK
prevScrapbook.addEventListener("click", () => {
    if (currentMemory > 0) {
        currentMemory--;
        showMemory(currentMemory);
    }
});

// TOMBOL NEXT
nextScrapbook.addEventListener("click", () => {
    if (currentMemory < memories.length - 1) {
        currentMemory++;
        showMemory(currentMemory);
    } else {
        window.location.href = "ending.html?from=yes";
    }
});

// PLAY VIDEO MEMORY
playMemoryVideo.addEventListener("click", () => {
    scrapbookVideo.play();
    playMemoryVideo.style.display = "none";
});

// TAMPILKAN TOMBOL PLAY LAGI KALAU VIDEO SELESAI
scrapbookVideo.addEventListener("ended", () => {
    playMemoryVideo.style.display = "flex";
});