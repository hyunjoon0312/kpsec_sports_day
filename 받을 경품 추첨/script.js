// 1. 초기 경품 데이터 설정
// 사용자는 이 배열의 데이터를 실제 이미지 경로와 이름으로 수정하면 됩니다.
// 이미지 파일은 images 폴더 안에 넣어두세요.
let initialPrizes = [
    { id: 1, name: '스타벅스 SS 시그니처 탱크 텀블러', image: './images/ 스타벅스 SS 시그니처 탱크 텀블러1.png' },
    { id: 2, name: '스타벅스 SS 시그니처 탱크 텀블러', image: './images/ 스타벅스 SS 시그니처 탱크 텀블러2.png' },
    { id: 3, name: '로지텍 MX KEYS MINI 키보드', image: './images/로지텍 MX KEYS MINI 키보드1.png' },
    { id: 4, name: '루메나 휴대용 무선 냉각선풍기', image: './images/루메나 휴대용 무선 냉각선풍기1.png' },
    { id: 5, name: '루메나 휴대용 무선 냉각선풍기', image: './images/루메나 휴대용 무선 냉각선풍기2.png' },
    { id: 6, name: '벨킨 2in1 Qi2 무선 충전기', image: './images/벨킨 2in1 Qi2 무선 충전기1.png' },
    { id: 7, name: '벨킨 2in1 Qi2 무선 충전기', image: './images/벨킨 2in1 Qi2 무선 충전기2.png' },
    { id: 8, name: '보바 그립 미니 보조배터리', image: './images/보바 그립 미니 보조배터리1.png' },
    { id: 9, name: '보바 그립 미니 보조배터리', image: './images/보바 그립 미니 보조배터리2.png' },
    { id: 10, name: '보바 그립 미니 보조배터리', image: './images/보바 그립 미니 보조배터리3.png' },
    { id: 11, name: '보코 큐브 멀티탭', image: './images/보코 큐브 멀티탭1.png' },
    { id: 12, name: '보코 큐브 멀티탭', image: './images/보코 큐브 멀티탭2.png' },
    { id: 13, name: '스탠리 퀜처 H2.0 플로우스테이트 텀블러', image: './images/스탠리 퀜처 H2.0 플로우스테이트 텀블러1.png' },
    { id: 14, name: '스탠리 퀜처 H2.0 플로우스테이트 텀블러', image: './images/스탠리 퀜처 H2.0 플로우스테이트 텀블러2.png' },
    { id: 15, name: '스탠리 퀜처 H2.0 플로우스테이트 텀블러', image: './images/스탠리 퀜처 H2.0 플로우스테이트 텀블러3.png' },
    { id: 16, name: '아트뮤 USB PD 100W 충전기', image: './images/아트뮤 USB PD 100W 충전기1.png' },
    { id: 17, name: '아트뮤 USB PD 100W 충전기', image: './images/아트뮤 USB PD 100W 충전기2.png' },
    { id: 18, name: '아트뮤 USB PD 100W 충전기', image: './images/아트뮤 USB PD 100W 충전기3.png' },
    { id: 19, name: '엘라고 마그네틱 데스크매트', image: './images/엘라고 마그네틱 데스크매트1.png' },
    { id: 20, name: '엘라고 마그네틱 데스크매트', image: './images/엘라고 마그네틱 데스크매트2.png' },
    { id: 21, name: '엘라고 마그네틱 데스크매트', image: './images/엘라고 마그네틱 데스크매트3.png' },
    { id: 22, name: '이미스 TONE ON TONE 모자', image: './images/이미스 TONE ON TONE 모자1.png' },
    { id: 23, name: '이미스 TONE ON TONE 모자', image: './images/이미스 TONE ON TONE 모자2.png' },
    { id: 24, name: '이미스 TONE ON TONE 모자', image: './images/이미스 TONE ON TONE 모자3.png' },
    { id: 25, name: '일룸 모니터받침대', image: './images/일룸 모니터받침대1.png' },
    { id: 26, name: '일룸 모니터받침대', image: './images/일룸 모니터받침대2.png' },
    { id: 27, name: '일룸 모니터받침대', image: './images/일룸 모니터받침대3.png' },
    { id: 28, name: '일리안 모니터받침대', image: './images/일리안 모니터받침대1.png' },
    { id: 29, name: '일리안 모니터받침대', image: './images/일리안 모니터받침대2.png' },
    { id: 30, name: '코닥 필름 카메라 Ultra F9 다크그린', image: './images/코닥 필름 카메라 Ultra F9 다크그린.png' },
    { id: 31, name: '코닥 필름 카메라 Ultra F9 옐로우', image: './images/코닥 필름 카메라 Ultra F9 옐로우.png' }
];

// 상태 관리
let availablePrizes = [...initialPrizes];
let winners = [];
let isSpinning = false;

// DOM 요소
const reelEl = document.getElementById('reel');
const spinBtn = document.getElementById('spin-button');


const winnerDisplayEl = document.getElementById('winner-display');
const winnerImageEl = document.getElementById('winner-image');
const winnerNameEl = document.getElementById('winner-name');

// 아이템 높이 (css --item-height와 동일해야 함)
const itemHeight = 300;

// 초기화 함수
function init() {
    updateUI();
    renderReel(availablePrizes);
}

// 사이드바 UI 업데이트
function updateUI() {



    // 남은 경품이 없으면 버튼 비활성화
    if (availablePrizes.length === 0) {
        spinBtn.disabled = true;
        spinBtn.textContent = '모든 추첨 완료';
    }
}

// 슬롯머신 릴(Reel) DOM 구성
// 매끄러운 롤링을 위해 아이템들을 여러 번 반복해서 이어 붙입니다.
function renderReel(prizesToRender) {
    reelEl.innerHTML = '';
    reelEl.style.transition = 'none';
    reelEl.style.transform = 'translateY(0)';

    if (prizesToRender.length === 0) return;

    // 시각적 효과를 위해 릴을 여러 바퀴(예: 3세트 + 타겟 세트) 돌릴 수 있게 복제
    // 마지막 세트의 특정 인덱스가 당첨 인덱스가 됩니다.
    // 여기서는 기본적으로 1세트만 렌더링하고, 스핀 시에 동적으로 릴을 채웁니다.
    prizesToRender.forEach(prize => {
        const div = document.createElement('div');
        div.className = 'reel-item';
        div.innerHTML = `<img src="${prize.image}" alt="${prize.name}">`;
        reelEl.appendChild(div);
    });
}

// 추첨 버튼 클릭 이벤트
spinBtn.addEventListener('click', spin);

function spin() {
    if (isSpinning || availablePrizes.length === 0) return;

    isSpinning = true;
    spinBtn.disabled = true;
    winnerDisplayEl.style.display = 'none'; // 이전 당첨화면 숨기기

    // 1. 당첨 인덱스 결정 (무작위)
    const winningIndex = Math.floor(Math.random() * availablePrizes.length);
    const winningPrize = availablePrizes[winningIndex];

    // 2. 스핀 애니메이션을 위한 릴 재구성
    // 긴장감을 위해 무작위 아이템들을 30개 정도 앞에 깔고, 마지막에 당첨 아이템 배치
    const spinItems = [];
    const spinCount = 30; // 굴러갈 아이템 수

    // 셔플 함수 (Fisher-Yates)
    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // 셔플된 경품을 순환 배치하여 같은 이미지가 연속으로 나오지 않도록 함
    let shuffled = shuffle(availablePrizes);
    for (let i = 0; i < spinCount; i++) {
        if (i > 0 && i % availablePrizes.length === 0) {
            // 한 세트가 끝나면 다시 셔플 (이전 세트 마지막과 다음 세트 첫 번째가 같지 않도록)
            let newShuffled = shuffle(availablePrizes);
            while (newShuffled[0].id === shuffled[shuffled.length - 1].id && availablePrizes.length > 1) {
                newShuffled = shuffle(availablePrizes);
            }
            shuffled = newShuffled;
        }
        spinItems.push(shuffled[i % availablePrizes.length]);
    }
    // 마지막 아이템(도착점)은 무조건 당첨 아이템
    spinItems.push(winningPrize);

    // 릴 DOM 업데이트
    reelEl.innerHTML = '';
    spinItems.forEach(prize => {
        const div = document.createElement('div');
        div.className = 'reel-item';
        div.innerHTML = `<img src="${prize.image}" alt="${prize.name}">`;
        reelEl.appendChild(div);
    });

    // 3. 애니메이션 시작
    // 초기 위치
    reelEl.style.transition = 'none';
    reelEl.style.transform = `translateY(0)`;

    // 강제 리플로우
    reelEl.offsetHeight;

    // 최종 위치 계산
    // 배열의 마지막 아이템(인덱스: spinCount)으로 스크롤
    // translateY = -(목표 인덱스 * 아이템 높이)
    const targetY = -(spinCount * itemHeight);

    // 애니메이션 설정 (점점 느려지는 ease-out)
    const spinDuration = 8; // 8초
    reelEl.style.transition = `transform ${spinDuration}s cubic-bezier(0.1, 0.9, 0.2, 1)`;
    reelEl.style.transform = `translateY(${targetY}px)`;

    // 4. 애니메이션 종료 후 처리
    setTimeout(() => {
        // 당첨 처리
        showWinner(winningPrize);

        // 데이터 업데이트 (비복원: available에서 제거 후 winners에 추가)
        availablePrizes.splice(winningIndex, 1);
        winners.push(winningPrize);

        // UI 업데이트
        updateUI();

        isSpinning = false;
        if (availablePrizes.length > 0) {
            spinBtn.disabled = false;
        }
    }, spinDuration * 1000 + 500); // 애니메이션 시간 + 약간의 딜레이
}

// 당첨 화면 및 폭죽 표시
function showWinner(prize) {
    winnerImageEl.src = prize.image;
    winnerNameEl.textContent = prize.name;
    winnerDisplayEl.style.display = 'flex';

    fireConfetti();
}

// 폭죽 이펙트 (canvas-confetti 라이브러리)
function fireConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
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

// ===== 당첨 히스토리 모달 =====
const historyBtn = document.getElementById('history-button');
const historyModal = document.getElementById('history-modal');
const modalCloseBtn = document.getElementById('modal-close');
const historyTable = document.getElementById('history-table');
const historyTbody = document.getElementById('history-tbody');
const historyEmpty = document.getElementById('history-empty');

// 수령자 정보 저장 (prizeId -> 수령자 이름)
let recipients = {};

// 모달 열기
historyBtn.addEventListener('click', () => {
    renderHistory();
    historyModal.style.display = 'flex';
});

// 모달 닫기
modalCloseBtn.addEventListener('click', () => {
    historyModal.style.display = 'none';
});

// 오버레이 클릭 시 닫기
historyModal.addEventListener('click', (e) => {
    if (e.target === historyModal) {
        historyModal.style.display = 'none';
    }
});

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && historyModal.style.display === 'flex') {
        historyModal.style.display = 'none';
    }
});

// 히스토리 테이블 렌더링
function renderHistory() {
    if (winners.length === 0) {
        historyEmpty.style.display = 'block';
        historyTable.style.display = 'none';
        return;
    }

    historyEmpty.style.display = 'none';
    historyTable.style.display = 'table';
    historyTbody.innerHTML = '';

    winners.forEach((prize, index) => {
        const tr = document.createElement('tr');
        const savedRecipient = recipients[prize.id] || '';
        tr.innerHTML = `
            <td class="order-num">${index + 1}</td>
            <td><img src="${prize.image}" alt="${prize.name}"></td>
            <td class="prize-name">${prize.name}</td>
            <td>
                <input type="text" class="recipient-input" 
                    data-prize-id="${prize.id}" 
                    value="${savedRecipient}" 
                    placeholder="이름 입력">
            </td>
        `;
        historyTbody.appendChild(tr);
    });

    // 수령자 입력 이벤트 바인딩
    historyTbody.querySelectorAll('.recipient-input').forEach(input => {
        input.addEventListener('input', (e) => {
            recipients[e.target.dataset.prizeId] = e.target.value;
        });
    });
}

// 초기화 실행
init();