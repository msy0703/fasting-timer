let timer;
let countdownDisplay = document.getElementById('countdown');
let startButton = document.getElementById('start-timer');
let timerInput = document.getElementById('timer-input'); // 入力フィールドを取得

// 通知の権限をリクエスト
if ('Notification' in window) {
    Notification.requestPermission();
}

// タイマー開始のイベント
startButton.addEventListener('click', () => {
    let inputMinutes = parseInt(timerInput.value); // ユーザーが入力した時間（分）を取得
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        countdownDisplay.textContent = "正しい時間を入力してください";
        return;
    }

    const endTime = Date.now() + inputMinutes * 60 * 1000; // 分をミリ秒に変換して終了時間を設定

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
