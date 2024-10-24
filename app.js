let timer;
let countdownDisplay = document.getElementById('countdown');
let startButton = document.getElementById('start-timer');

// 通知の権限をリクエスト
if ('Notification' in window) {
    Notification.requestPermission();
}

// タイマー開始のイベント
startButton.addEventListener('click', () => {
    const endTime = Date.now() + 3000; // ミリ秒で設定

    timer = setInterval(() => {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timer);
            countdownDisplay.textContent = endTime + "断食終了！";
            sendNotification();
        } else {
            countdownDisplay.textContent = `残り時間: ${Math.ceil(remainingTime / 1000)} 秒`;
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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
