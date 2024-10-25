let isFasting = false;
let isPaused = false;
let timer;
let startTime;
let elapsedTimeDisplay = document.getElementById('elapsed-time');
let fastingButton = document.getElementById('start-fasting');
let resetButton = document.getElementById('reset-timer'); // リセットボタン
let circle = document.querySelector('circle');
let circleRadius = circle.r.baseVal.value;
let circleCircumference = 2 * Math.PI * circleRadius;

circle.style.strokeDasharray = `${circleCircumference}`;
circle.style.strokeDashoffset = `${circleCircumference}`;

fastingButton.addEventListener('click', function () {
    if (!isFasting) {
        // 断食開始
        isFasting = true;
        startFasting();
        fastingButton.textContent = "断食を停止"; // ボタンのテキストを「停止」に変更
        fastingButton.classList.add('stop'); // ボタンの色を変更
    } else {
        // 断食停止
        isFasting = false;
        stopFasting();
        fastingButton.textContent = "断食をスタート"; // ボタンのテキストを「スタート」に戻す
        fastingButton.classList.remove('stop'); // ボタンの色を戻す
    }
});

resetButton.addEventListener('click', function () {
    resetTimer(); // リセットボタンが押された際にタイマーをリセット
});

function startFasting() {
    if (!isPaused) {
        startTime = new Date(); // 初めてスタートする際に開始時間を設定
    }

    const totalFastingSeconds = 16 * 3600; // 16時間を秒に変換

    timer = setInterval(() => {
        let currentTime = new Date();
        let elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

        if (elapsedSeconds >= totalFastingSeconds) {
            clearInterval(timer);
            elapsedSeconds = totalFastingSeconds;
        }

        updateElapsedTime(elapsedSeconds);
        updateProgressCircle(elapsedSeconds, totalFastingSeconds);
    }, 1000);
}

function stopFasting() {
    clearInterval(timer); // タイマーを停止
    isPaused = true; // 途中で停止したことを記録
}

function resetTimer() {
    clearInterval(timer); // タイマーをクリアして停止
    isFasting = false;
    isPaused = false;
    fastingButton.textContent = "断食をスタート"; // ボタンのテキストを「スタート」に戻す
    fastingButton.classList.remove('stop'); // ボタンの色を戻す

    // 経過時間とプログレスバーをリセット
    elapsedTimeDisplay.textContent = "00:00:00";
    circle.style.strokeDashoffset = `${circleCircumference}`;
}

function updateElapsedTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    elapsedTimeDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateProgressCircle(elapsedSeconds, totalSeconds) {
    const progress = elapsedSeconds / totalSeconds;
    const offset = circleCircumference - (progress * circleCircumference);
    circle.style.strokeDashoffset = offset;
}