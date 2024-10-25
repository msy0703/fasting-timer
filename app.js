let timer;
let countdownDisplay = document.getElementById('countdown');
let startButton = document.getElementById('start-timer');
let timerInput = document.getElementById('timer-input'); // ユーザー入力フィールド

// 新たに追加する要素
let startTimeDisplay = document.getElementById('start-time');
let endTimeDisplay = document.getElementById('end-time');

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

    // 現在の時刻を取得（タイマーの開始時間）
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + inputMinutes * 60 * 1000); // 終了時間を計算

    // 開始時間と終了予定時間を画面に表示
    startTimeDisplay.textContent = `タイマー開始時間: ${formatTime(startTime)}`;
    endTimeDisplay.textContent = `タイマー終了予定時間: ${formatTime(endTime)}`;

    // タイマーの終了時刻までカウントダウン
    timer = setInterval(() => {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timer);
            countdownDisplay.textContent = "断食終了！";
            sendNotification(); // 通知を送信
        } else {
            countdownDisplay.textContent = `残り時間: ${Math.ceil(remainingTime / 1000 / 60)} 分`;
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
