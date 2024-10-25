let timer;
let countdownDisplay = document.getElementById('countdown');
let startButton = document.getElementById('start-timer');
let timerInput = document.getElementById('timer-input'); // ユーザー入力フィールド

// 新たに追加する要素
let startTimeDisplay = document.getElementById('start-time');
let endTimeDisplay = document.getElementById('end-time');
let progressBar = document.getElementById('timer-progress'); // プログレスバー

// 通知の権限をリクエスト
if ('Notification' in window) {
    Notification.requestPermission();
}

// タイマー開始のイベント
startButton.addEventListener('click', () => {
    let inputMinutes = parseInt(timerInput.value); // 入力時間を取得
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        countdownDisplay.textContent = "正しい時間を入力してください";
        return;
    }

    // プログレスバーの初期化
    progressBar.value = 0;

    // タイマーの開始時間と終了時間
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + inputMinutes * 60 * 1000); // 終了時間を計算
    const totalDuration = endTime - startTime; // タイマーの総時間

    // 開始時間と終了予定時間を画面に表示
    startTimeDisplay.textContent = `タイマー開始時間: ${formatTime(startTime)}`;
    endTimeDisplay.textContent = `タイマー終了予定時間: ${formatTime(endTime)}`;

    // タイマーの終了時刻までカウントダウン
    timer = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;
        
        if (remainingTime <= 0) {
            clearInterval(timer);
            countdownDisplay.textContent = "断食終了！";
            progressBar.value = 100; // タイマーが終了したらプログレスバーを100%に
            sendNotification(); // 通知を送信
        } else {
            // 残り時間をカウントダウン形式で表示
            const remainingMinutes = Math.floor(remainingTime / 1000 / 60);
            const remainingSeconds = Math.floor((remainingTime / 1000) % 60);
            countdownDisplay.textContent = `残り時間: ${remainingMinutes}分 ${remainingSeconds}秒`;

            // プログレスバーの更新
            const elapsedTime = totalDuration - remainingTime;
            const progressPercentage = (elapsedTime / totalDuration) * 100;
            progressBar.value = progressPercentage; // プログレスバーの値を更新
        }
    }, 1000);
});

// 通知を送信する関数
function sendNotification() {
    if (Notification.permission === 'granted') {
        new Notification('断食タイマー', {
            body: '断食が終了しました！',
            icon: 'path-to-icon/icon.png'
        });
    }
}

// 時間をフォーマットする関数 (時刻表示を "HH:MM:SS" の形式に)
function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
