const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

// تحميل الصور
const dinoImg = new Image();
dinoImg.src = "dino.png";

const cactusImg = new Image();
cactusImg.src = "cactus.png";

// متغيرات الديناصور
let dino = { x: 50, y: 220, width: 50, height: 50, velocityY: 0, jumping: false };

// متغيرات الصبار
let cactus = { x: 800, y: 220, width: 40, height: 50 };

// الجاذبية
const gravity = 1.5;

// عداد النقاط
let score = 0;
let gameOver = false;

// زر إعادة التشغيل
const restartButton = document.getElementById("restartButton");

// وظيفة القفز عند الضغط على المسافة أو لمس الشاشة
function jump() {
    if (!dino.jumping) {
        dino.velocityY = -20;
        dino.jumping = true;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

document.addEventListener("touchstart", function () {
    jump();
});

// تحديث اللعبة
function updateGame() {
    if (gameOver) return;

    // تطبيق الجاذبية
    dino.y += dino.velocityY;
    dino.velocityY += gravity;

    // منع الديناصور من السقوط خارج الأرض
    if (dino.y >= 220) {
        dino.y = 220;
        dino.jumping = false;
    }

    // تحريك الصبار
    cactus.x -= 8;
    if (cactus.x + cactus.width < 0) {
        cactus.x = canvas.width;
        score++; // زيادة النقاط
        document.getElementById("score").innerText = score;
    }

    // التحقق من الاصطدام
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        gameOver = true;
        restartButton.style.display = "block"; // إظهار زر إعادة التشغيل
    }

    drawGame();
}

// رسم اللعبة
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم الديناصور
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    // رسم الصبار
    ctx.drawImage(cactusImg, cactus.x, cactus.y, cactus.width, cactus.height);
}

// إعادة تشغيل اللعبة
function resetGame() {
    dino.y = 220;
    dino.velocityY = 0;
    cactus.x = 800;
    score = 0;
    document.getElementById("score").innerText = score;
    gameOver = false;
    restartButton.style.display = "none"; // إخفاء زر إعادة التشغيل
    requestAnimationFrame(gameLoop);
}

// حلقة اللعبة
function gameLoop() {
    updateGame();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// بدء اللعبة
gameLoop();
