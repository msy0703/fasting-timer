let isFasting = false;
let startTime;
let elapsedTimeDisplay = document.getElementById('elapsed-time');
let fastingHoursDisplay = document.getElementById('fasting-hours');
let circle = document.querySelector('circle');
let circleRadius = circle.r.baseVal.value;
let circleCircumference = 2 * Math.PI * circleRadius;

circle.style.strokeDasharray = `${circleCircumference}`;
circle.style.strokeDashoffset = `${circleCircumference}`;

document.getElementById('start-fasting').addEventListener('click', function () {
    if (!isFasting) {
        isFasting = true;
        startTime = new Date();
        startFastingTimer();
    }
});

function startFastingTimer() {
    const totalFastingSeconds = parseInt(fastingHoursDisplay.textContent) * 3600;

    const timer = setInterval(() => {
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