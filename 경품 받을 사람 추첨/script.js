// =========================================================
// 1. 데이터 설정
// =========================================================

// 추첨할 경품 목록 (순서대로 추첨됩니다)
const prizes = [
    '폴리오 종아리 마사지기',
    '폴리오 목어깨 마사지기',
    '엘가토 스트림덱 네오',
    '엘가토 스트림덱 네오',
    '로지텍 MX Master4',
    '로지텍 MX Master4',
    '갤럭시 버즈4 프로',
    '에어팟3 프로',
];
let currentPrizeIndex = 0;

// 참가자 명단
let participants = [
    '레오', '씨케이', '에이미', '레나', '마크', '비솃', '블레어', '클레어',
    '듀', '도리', '헤밀리', '스팀', '닉스', '젠', '지드', '헤일로',
    '휴고', '이안', '로건', '파이', '레이', '리안', '스티브', '우노',
    '엘리스', '에빈', '조이', '리나', '루미', '세라', '시에나', '유카',
];

// =========================================================
// 2. 상태 관리
// =========================================================
let availableParticipants = [...participants];
let winners = [];
let isSpinning = false;
let currentAngle = 0; // 현재 룰렛 각도

// =========================================================
// 3. DOM & Canvas
// =========================================================
const canvas = document.getElementById('roulette-canvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-button');
const winnerDisplayEl = document.getElementById('winner-display');
const winnerNameEl = document.getElementById('winner-name');
const winnerPrizeInfoEl = document.getElementById('winner-prize-info');
const winnerCloseBtn = document.getElementById('winner-close');
const prizeNameEl = document.getElementById('prize-name');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 10;

// 교대 색상 팔레트
const colors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#2980b9',
    '#27ae60', '#d35400', '#8e44ad', '#16a085',
    '#c0392b', '#2c3e50', '#f1c40f', '#7f8c8d',
];

// =========================================================
// 4. 룰렛 그리기
// =========================================================
function drawWheel() {
    const people = availableParticipants;
    const count = people.length;
    if (count === 0) return;

    const arc = (2 * Math.PI) / count;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentAngle);

    for (let i = 0; i < count; i++) {
        const startAngle = i * arc;
        const endAngle = startAngle + arc;

        // 섹터
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        // 구분선
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 텍스트
        ctx.save();
        ctx.rotate(startAngle + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${count > 20 ? 11 : 14}px 'Noto Sans KR', sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(people[i], radius - 14, 4);
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    // 중심 원
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#f1c40f';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
}

// =========================================================
// 5. 초기화
// =========================================================
function init() {
    updatePrizeDisplay();
    drawWheel();
}

function updatePrizeDisplay() {
    if (currentPrizeIndex < prizes.length) {
        prizeNameEl.textContent = prizes[currentPrizeIndex];
    } else {
        prizeNameEl.textContent = '모든 경품 추첨 완료!';
    }
}

function updateUI() {
    if (currentPrizeIndex >= prizes.length || availableParticipants.length === 0) {
        spinBtn.disabled = true;
        spinBtn.textContent = '추첨 완료';
    }
}

// =========================================================
// 6. 스핀 애니메이션 (반전 이벤트 포함)
// =========================================================
spinBtn.addEventListener('click', spin);

const twistEventEl = document.getElementById('twist-event');
const twistTextEl = document.getElementById('twist-text');
const rouletteWrapper = document.querySelector('.roulette-wrapper');

// 반전 이벤트 목록
const twistEvents = [
    { emoji: '🌪️', text: '돌풍이 분다!' },
    { emoji: '🐦', text: '새가 치고 갔다!' },
    { emoji: '🌊', text: '지진 발생!' },
    { emoji: '🛸', text: 'UFO 출현!' },
    { emoji: '🐱', text: '고양이가 건드렸다!' },
    { emoji: '⚡', text: '번개가 쳤다!' },
    { emoji: '👻', text: '유령의 장난!' },
    { emoji: '🦖', text: '공룡이 밟았다!' },
];

function customEase(p) {
    // 5제곱 감속 (전체 시간이 10초로 길어지면서 꼬리 구간이 시각적으로 아주 천천히 움직이게 됨)
    // 마지막 3~4초 동안 한 두 칸을 힘겹게 넘어갑니다.
    return 1 - Math.pow(1 - p, 5);
}

function spin() {
    if (isSpinning || availableParticipants.length === 0 || currentPrizeIndex >= prizes.length) return;

    isSpinning = true;
    spinBtn.disabled = true;
    twistEventEl.style.display = 'none';

    // 각도 정규화 (누적 방지, 시계방향 양수 유지)
    currentAngle = currentAngle % (2 * Math.PI);
    if (currentAngle < 0) currentAngle += 2 * Math.PI;

    const count = availableParticipants.length;
    const arc = (2 * Math.PI) / count;

    // 실제 최종 당첨자
    let realIndex = Math.floor(Math.random() * count);

    // 반전 확률: 40% (참여자가 2명 이상일 때만)
    const hasTwist = (count > 1 && Math.random() < 0.4);

    if (!hasTwist) {
        // === [케이스 1] 무사 통과 (변수 없음) ===
        const realSectorAngle = realIndex * arc + arc / 2;
        const realDestination = -Math.PI / 2 - realSectorAngle;
        
        let rot = realDestination - currentAngle;
        while (rot < 0) rot += 2 * Math.PI;
        rot += (15 + Math.floor(Math.random() * 5)) * 2 * Math.PI; // 15~20바퀴
        
        const startAngle = currentAngle;
        const duration = 10000; // 10초로 증가 (후반 긴장감 확보)
        const startTime = performance.now();

        function animateNormal(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 80% 고속 구간, 20% 최종 감속
            currentAngle = startAngle + rot * customEase(progress);
            drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animateNormal);
            } else {
                currentAngle = startAngle + rot;
                drawWheel();
                finishSpin(realIndex);
            }
        }
        requestAnimationFrame(animateNormal);

    } else {
        // === [케이스 2] 반전 이벤트 발생 ===
        let fakeIndex = Math.floor(Math.random() * count);
        while (fakeIndex === realIndex) {
            fakeIndex = Math.floor(Math.random() * count);
        }

        const fakeSectorAngle = fakeIndex * arc + arc / 2;
        const fakeDestination = -Math.PI / 2 - fakeSectorAngle;
        
        let rot1 = fakeDestination - currentAngle;
        while (rot1 < 0) rot1 += 2 * Math.PI;
        rot1 += (12 + Math.floor(Math.random() * 4)) * 2 * Math.PI; // 페이크 목적지
        
        // 반전 이벤트가 등장하기까지의 1차 회전 (일반 스핀과 동일한 10초 커브 적용)
        const phase1Duration = 10000;
        const startAngle1 = currentAngle;
        const startTime1 = performance.now();

        function animatePhase1(now) {
            const elapsed = now - startTime1;
            const progress = Math.min(elapsed / phase1Duration, 1);
            
            // 일반 스핀처럼 보이기 위해 customEase 적용
            currentAngle = startAngle1 + rot1 * customEase(progress);
            drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animatePhase1);
            } else {
                currentAngle = startAngle1 + rot1;
                drawWheel();
                triggerTwist(); // 정지 후 변수 등장
            }
        }

        requestAnimationFrame(animatePhase1);

        function triggerTwist() {
            const event = twistEvents[Math.floor(Math.random() * twistEvents.length)];
            twistTextEl.textContent = `${event.emoji} ${event.text}`;
            twistEventEl.style.display = 'block';
            twistEventEl.style.animation = 'none';
            twistEventEl.offsetHeight;
            twistEventEl.style.animation = '';

            rouletteWrapper.classList.add('shaking');
            setTimeout(() => rouletteWrapper.classList.remove('shaking'), 600);

            // 약동 후 2단계 돌입
            setTimeout(() => {
                twistEventEl.style.display = 'none';
                startPhase2();
            }, 1200);
        }

        function startPhase2() {
            const realSectorAngle = realIndex * arc + arc / 2;
            const realDestination = -Math.PI / 2 - realSectorAngle;

            currentAngle = currentAngle % (2 * Math.PI);
            if (currentAngle < 0) currentAngle += 2 * Math.PI;

            let rot2 = realDestination - currentAngle;
            while (rot2 < 0) rot2 += 2 * Math.PI;
            rot2 += (2 + Math.floor(Math.random() * 2)) * 2 * Math.PI; // 추가 회전

            const startAngle2 = currentAngle;
            const phase2Duration = 2500;
            const startTime2 = performance.now();

            function animatePhase2(now) {
                const elapsed = now - startTime2;
                const progress = Math.min(elapsed / phase2Duration, 1);
                
                // 짧은 마무리 회전이므로 고전적인 감속(easeOut) 사용
                const eased = 1 - Math.pow(1 - progress, 2);
                currentAngle = startAngle2 + rot2 * eased;
                drawWheel();

                if (progress < 1) {
                    requestAnimationFrame(animatePhase2);
                } else {
                    currentAngle = startAngle2 + rot2;
                    drawWheel();
                    finishSpin(realIndex);
                }
            }
            requestAnimationFrame(animatePhase2);
        }
    }

    function finishSpin(winnerIndex) {
        const winnerName = availableParticipants[winnerIndex];
        showWinner(winnerName);

        availableParticipants.splice(winnerIndex, 1);
        winners.push({ name: winnerName, prize: prizes[currentPrizeIndex] });

        currentPrizeIndex++;
        updatePrizeDisplay();
        updateUI();

        isSpinning = false;
        if (currentPrizeIndex < prizes.length && availableParticipants.length > 0) {
            spinBtn.disabled = false;
        }

        drawWheel();
    }
}

// =========================================================
// 7. 당첨 표시 + 폭죽
// =========================================================
function showWinner(name) {
    winnerNameEl.textContent = name;
    winnerPrizeInfoEl.textContent = `🎁 ${prizes[currentPrizeIndex]} 당첨!`;
    winnerDisplayEl.style.display = 'flex';
    fireConfetti();
}

winnerCloseBtn.addEventListener('click', () => {
    winnerDisplayEl.style.display = 'none';
});

function fireConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

// =========================================================
// 실행
// =========================================================
init();
