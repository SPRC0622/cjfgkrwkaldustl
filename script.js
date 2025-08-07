// 철학적 동반자 - 미연시 버전
// 기본 게임 상태 관리

// 게임 상태
let gameState = {
    currentDay: parseInt(localStorage.getItem('currentDay') || '0'),
    currentScreen: 'mainMenu',
    playerName: localStorage.getItem('playerName') || '',
    gameStarted: localStorage.getItem('gameStarted') === 'true'
};

// 캐릭터 데이터
const characters = {
    stone: {
        name: "스톤",
        emoji: "🗿", 
        type: "현실의 친구",
        location: "1층 정보데스크",
        job: "학생 알바",
        personality: "침착하고 현실적",
        intimacy: parseInt(localStorage.getItem('intimacy_stone') || '0'),
        metToday: localStorage.getItem('met_stone_today') === 'true'
    },
    flame: {
        name: "플레임",
        emoji: "🔥",
        type: "열정의 친구", 
        location: "1층 북카페",
        job: "츤데레 바리스타",
        personality: "열정적이지만 차가운 척",
        intimacy: parseInt(localStorage.getItem('intimacy_flame') || '0'),
        metToday: localStorage.getItem('met_flame_today') === 'true'
    },
    quest: {
        name: "퀘스트",
        emoji: "🔍",
        type: "탐구의 친구",
        location: "1층 어린이코너", 
        job: "다독왕 어린이",
        personality: "순수하고 호기심 많음",
        intimacy: parseInt(localStorage.getItem('intimacy_quest') || '0'),
        metToday: localStorage.getItem('met_quest_today') === 'true'
    },
    bada: {
        name: "바다",
        emoji: "🪷",
        type: "마음의 친구",
        location: "2층 힐링라운지",
        job: "자원봉사자", 
        personality: "따뜻하고 포용적",
        intimacy: parseInt(localStorage.getItem('intimacy_bada') || '0'),
        metToday: localStorage.getItem('met_bada_today') === 'true'
    },
    zero: {
        name: "제로",
        emoji: "🌊",
        type: "자연의 친구",
        location: "별관 호수 관리소",
        job: "자유로운 관리인",
        personality: "자연스럽고 편안함",
        intimacy: parseInt(localStorage.getItem('intimacy_zero') || '0'),
        metToday: localStorage.getItem('met_zero_today') === 'true'
    }
};

// 화면 전환 함수들
function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function showMainMenu() {
    showScreen('mainMenu');
    checkGameProgress();
}

function startOrContinueGame() {
    if (gameState.currentDay === 0) {
        // 첫 게임 시작
        startGame();
    } else if (gameState.currentDay >= 6) {
        // Day 6 이후에는 심화 관계로
        selectDeepConnection();
    } else {
        // Day 1-5: 순차적 첫 만남 계속
        const dayCharacterMap = {
            1: 'stone',
            2: 'flame', 
            3: 'quest',
            4: 'bada',
            5: 'zero'
        };
        
        const characterId = dayCharacterMap[gameState.currentDay];
        if (characterId) {
            meetCharacter(characterId, 'first_meeting');
        } else {
            // 예외 상황 - 랜덤 만남
            const availableCharacters = Object.keys(characters);
            const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
            meetCharacter(randomCharacter, 'random_meeting');
        }
    }
}

function showRandomCompanion() {
    showScreen('randomCompanion');
}

function showCompanionHistory() {
    showScreen('companionHistory');
    loadCompanionHistory();
}

function showIndividualMeeting() {
    showScreen('individualMeeting');
}

// 게임 진행 체크
function checkGameProgress() {
    const concernedSection = document.getElementById('concernedFriends');
    
    if (gameState.currentDay > 0) {
        // 게임이 시작된 상태
        updateConcernedFriends();
    } else {
        // 게임 시작 전
        concernedSection.style.display = 'none';
    }
}

function updateConcernedFriends() {
    // 구현 예정: 오랫동안 안 만난 캐릭터들 표시
}

// 랜덤 동반자 만나기 (구버전 호환)
function meetRandomCompanion(situation) {
    startOrContinueGame();
}

function startGame() {
    gameState.currentDay = 1;
    gameState.gameStarted = true;
    localStorage.setItem('currentDay', '1');
    localStorage.setItem('gameStarted', 'true');
    
    // 프롤로그 시작
    showPrologue();
}

function showPrologue() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>🌙 늦은 밤, 특별한 발견</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                또 잠이 안 와서 밖에 나왔다...<br><br>
                요즘 자꾸 이런 일이 생겨. 뭔가 답답하고 막막해서.<br><br>
                평소 지나다니던 길인데, 오늘은 뭔가 다르다.<br>
                도서관에서 따뜻한 불빛이 새어나오고 있다.
            </p>
            <p style="text-align: center; font-weight: bold; color: #667eea; margin: 30px 0;">
                "어? 이 시간에도 열려있나?"
            </p>
            <button class="action-button" onclick="enterLibrary()" style="width: 100%;">
                📚 도서관에 들어가기
            </button>
        </div>
    `;
}

function enterLibrary() {
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>📚 24시간 복합 도서관</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                문을 열고 들어서니 생각보다 사람들이 몇 명 있다.<br>
                모두 각자만의 조용한 시간을 보내고 있다.<br><br>
                따뜻하고 안전한 분위기. 은은한 조명과 편안한 배경음악.<br><br>
                "와... 이런 곳이 있었구나"
            </p>
            <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="margin-bottom: 15px; color: #4a5568;">🏗️ 도서관 구조</h3>
                <ul style="line-height: 1.8; color: #718096;">
                    <li><strong>1층:</strong> 정보데스크, 북카페, 어린이코너</li>
                    <li><strong>2층:</strong> 힐링라운지, 열람실, 스터디룸</li>
                    <li><strong>별관:</strong> 호수 산책로와 관리사무실</li>
                </ul>
            </div>
            <button class="action-button" onclick="startDay1()" style="width: 100%;">
                🗿 정보데스크로 가기 (Day 1 시작)
            </button>
        </div>
    `;
}

// Day 1 시작 - 스톤과의 첫 만남
function startDay1() {
    meetCharacter('stone', 'first_meeting');
}

// 캐릭터와 만나기
function meetCharacter(characterId, situation = 'normal') {
    const character = characters[characterId];
    showScreen('companionMeeting');
    
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>${character.emoji} ${character.name}</h2>
            <p>${character.type} • ${character.location}</p>
            <div class="intimacy-display">
                ${generateHearts(character.intimacy)}
                <span style="margin-left: 10px; color: #718096;">친밀도: ${character.intimacy}</span>
            </div>
        </div>
        <div class="result-section">
            ${getCharacterDialog(characterId, situation)}
        </div>
    `;
}

// 친밀도 하트 생성
function generateHearts(intimacy) {
    let hearts = '';
    for (let i = 0; i < 20; i++) {
        if (i < intimacy) {
            hearts += '<span class="intimacy-heart">♥</span>';
        } else {
            hearts += '<span class="intimacy-heart empty">♡</span>';
        }
    }
    return hearts;
}

// 캐릭터 대화 생성
function getCharacterDialog(characterId, situation) {
    const character = characters[characterId];
    
    // Day 1 - 스톤과의 첫 만남
    if (characterId === 'stone' && situation === 'first_meeting') {
        return `
            <div class="character-response">
                <div class="name">${character.emoji} ${character.name}</div>
                <div class="response">"안녕하세요. 처음 오신 것 같은데, 도움이 필요하시면 말씀해주세요."</div>
                <div class="context">${character.personality} • ${character.job}</div>
            </div>
            <div style="margin: 20px 0;">
                <h4 style="color: #4a5568; margin-bottom: 15px;">어떻게 답하시겠어요?</h4>
                <button class="action-button" onclick="respondToCharacter('stone', 'honest', 2)" style="width: 100%; margin-bottom: 10px;">
                    "그냥 잠이 안 와서 나왔어요"
                </button>
                <button class="action-button" onclick="respondToCharacter('stone', 'polite', 1)" style="width: 100%; margin-bottom: 10px;">
                    "여기 어떤 곳들이 있나요?"
                </button>
                <button class="action-button" onclick="respondToCharacter('stone', 'distant', -1)" style="width: 100%; margin-bottom: 10px;">
                    "...개인적인 일이에요"
                </button>
                <button class="action-button" onclick="respondToCharacter('stone', 'rude', -2)" style="width: 100%; margin-bottom: 10px;">
                    "왜 그런 걸 물어보죠?"
                </button>
            </div>
        `;
    }
    
    // Day 2 - 플레임과의 첫 만남
    if (characterId === 'flame' && situation === 'first_meeting') {
        return `
            <div class="character-response">
                <div class="name">${character.emoji} ${character.name}</div>
                <div class="response">"...뭐 주문할지 모르겠으면 아메리카노 추천해요. 별로 어려운 메뉴 아니니까."</div>
                <div class="context">${character.personality} • ${character.job}</div>
            </div>
            <div style="margin: 20px 0;">
                <p style="color: #718096; font-style: italic; margin-bottom: 15px;">
                    겉으로는 차가워 보이지만, 정성스럽게 커피를 내려주는 모습이 보인다.
                </p>
                <h4 style="color: #4a5568; margin-bottom: 15px;">플레임의 츤데레식 관심에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToCharacter('flame', 'grateful', 2)" style="width: 100%; margin-bottom: 10px;">
                    "추천해주셔서 감사해요. 아메리카노로 주세요"
                </button>
                <button class="action-button" onclick="respondToCharacter('flame', 'curious', 1)" style="width: 100%; margin-bottom: 10px;">
                    "다른 메뉴는 어떤 게 있어요?"
                </button>
                <button class="action-button" onclick="respondToCharacter('flame', 'dismissive', -1)" style="width: 100%; margin-bottom: 10px;">
                    "커피만 주세요"
                </button>
                <button class="action-button" onclick="respondToCharacter('flame', 'cold', -2)" style="width: 100%; margin-bottom: 10px;">
                    "그럼 신경 쓰지 마세요"
                </button>
            </div>
        `;
    }
    
    // Day 3 - 퀘스트와의 첫 만남
    if (characterId === 'quest' && situation === 'first_meeting') {
        return `
            <div class="character-response">
                <div class="name">${character.emoji} ${character.name}</div>
                <div class="response">"어? 어른이 여기서 뭐 하세요? 혹시 재밌는 책 찾으세요? 제가 많이 알고 있어요!"</div>
                <div class="context">${character.personality} • ${character.job}</div>
            </div>
            <div style="margin: 20px 0;">
                <p style="color: #718096; font-style: italic; margin-bottom: 15px;">
                    책더미 사이에서 열심히 뭔가를 찾고 있던 어린 아이가 호기심 가득한 눈으로 다가온다.
                </p>
                <h4 style="color: #4a5568; margin-bottom: 15px;">순수한 퀘스트의 질문에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToCharacter('quest', 'encouraging', 2)" style="width: 100%; margin-bottom: 10px;">
                    "맞아요, 그림책도 좋은 이야기가 많죠"
                </button>
                <button class="action-button" onclick="respondToCharacter('quest', 'interested', 1)" style="width: 100%; margin-bottom: 10px;">
                    "가끔 읽어봐야겠네요"
                </button>
                <button class="action-button" onclick="respondToCharacter('quest', 'dismissive', -1)" style="width: 100%; margin-bottom: 10px;">
                    "어른이 되면 다른 걸 읽어야죠"
                </button>
                <button class="action-button" onclick="respondToCharacter('quest', 'hurtful', -2)" style="width: 100%; margin-bottom: 10px;">
                    "어린이 책은 너무 유치해요"
                </button>
            </div>
        `;
    }
    
    // Day 4 - 바다와의 첫 만남
    if (characterId === 'bada' && situation === 'first_meeting') {
        return `
            <div class="character-response">
                <div class="name">${character.emoji} ${character.name}</div>
                <div class="response">"많이 힘드셨나 봐요. 여기는 조용해서 쉬기 좋은 곳이에요."</div>
                <div class="context">${character.personality} • ${character.job}</div>
            </div>
            <div style="margin: 20px 0;">
                <p style="color: #718096; font-style: italic; margin-bottom: 15px;">
                    2층 힐링 라운지에서 피곤한 표정으로 앉아있는 당신을 보고 따뜻하게 다가온 사람이다.
                </p>
                <h4 style="color: #4a5568; margin-bottom: 15px;">바다의 따뜻한 배려에 어떻게 반응할까요?</h4>
                <button class="action-button" onclick="respondToCharacter('bada', 'honest', 2)" style="width: 100%; margin-bottom: 10px;">
                    "네... 요즘 마음이 많이 무거워요"
                </button>
                <button class="action-button" onclick="respondToCharacter('bada', 'grateful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "신경 써주셔서 고마워요"
                </button>
                <button class="action-button" onclick="respondToCharacter('bada', 'reserved', -1)" style="width: 100%; margin-bottom: 10px;">
                    "괜찮아요, 별거 아니에요"
                </button>
                <button class="action-button" onclick="respondToCharacter('bada', 'defensive', -2)" style="width: 100%; margin-bottom: 10px;">
                    "굳이 말할 필요 없다고 생각해요"
                </button>
            </div>
        `;
    }
    
    // Day 5 - 제로와의 첫 만남
    if (characterId === 'zero' && situation === 'first_meeting') {
        return `
            <div class="character-response">
                <div class="name">${character.emoji} ${character.name}</div>
                <div class="response">"좋죠? 전 여기서 일하는데, 처음 보는 얼굴이네요."</div>
                <div class="context">${character.personality} • ${character.job}</div>
            </div>
            <div style="margin: 20px 0;">
                <p style="color: #718096; font-style: italic; margin-bottom: 15px;">
                    답답한 마음에 밖으로 나와 호수를 바라보고 있었는데, 자연스럽게 말을 걸어온 사람이다.
                </p>
                <h4 style="color: #4a5568; margin-bottom: 15px;">제로의 편안한 말에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToCharacter('zero', 'natural', 2)" style="width: 100%; margin-bottom: 10px;">
                    "정말 평온한 곳이네요. 마음이 편해져요"
                </button>
                <button class="action-button" onclick="respondToCharacter('zero', 'curious', 1)" style="width: 100%; margin-bottom: 10px;">
                    "여기서 어떤 일을 하세요?"
                </button>
                <button class="action-button" onclick="respondToCharacter('zero', 'hurried', -1)" style="width: 100%; margin-bottom: 10px;">
                    "잠깐만 나온 거예요"
                </button>
                <button class="action-button" onclick="respondToCharacter('zero', 'uninterested', -2)" style="width: 100%; margin-bottom: 10px;">
                    "그냥 혼자 있고 싶어요"
                </button>
            </div>
        `;
    }
    
    // 기본 대화 (임시)
    return `
        <div class="character-response">
            <div class="name">${character.emoji} ${character.name}</div>
            <div class="response">"안녕하세요! 반가워요."</div>
            <div class="context">${character.personality}</div>
        </div>
        <button class="action-button" onclick="showMainMenu()">대화 마치기</button>
    `;
}

// 캐릭터 응답 처리
function respondToCharacter(characterId, responseType, intimacyChange) {
    const character = characters[characterId];
    character.intimacy += intimacyChange;
    
    // 친밀도 범위 제한 (0-20)
    character.intimacy = Math.max(0, Math.min(20, character.intimacy));
    
    // LocalStorage 저장
    localStorage.setItem(`intimacy_${characterId}`, character.intimacy.toString());
    
    // 응답에 따른 반응 표시
    const content = document.getElementById('companionContent');
    let reaction = getCharacterReaction(characterId, responseType, intimacyChange);
    
    content.innerHTML = `
        <div class="header">
            <h2>${character.emoji} ${character.name}</h2>
            <p>${character.type} • ${character.location}</p>
            <div class="intimacy-display">
                ${generateHearts(character.intimacy)}
                <span style="margin-left: 10px; color: #718096;">친밀도: ${character.intimacy}</span>
            </div>
        </div>
        <div class="result-section">
            ${reaction}
        </div>
    `;
}

// 캐릭터별 반응 생성
function getCharacterReaction(characterId, responseType, intimacyChange) {
    const character = characters[characterId];
    const changeText = intimacyChange > 0 ? `+${intimacyChange}` : intimacyChange;
    const changeColor = intimacyChange > 0 ? '#48bb78' : intimacyChange < 0 ? '#e53e3e' : '#718096';
    
    // Day 1 - 스톤 반응들
    if (characterId === 'stone') {
        switch (responseType) {
            case 'honest':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"그렇군요. 솔직하게 말씀해주셔서 고마워요. 여기는 24시간 열려있어서 편안하게 이용하실 수 있어요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (솔직함을 높이 평가)</div>
                    </div>
                    <div style="margin: 20px 0; line-height: 1.8;">
                        <p>스톤이 친근한 미소를 지으며 도서관 곳곳을 안내해준다.</p>
                        <p>"1층에는 카페와 어린이 코너가 있고, 2층은 조용한 열람실과 힐링 라운지가 있어요. 호수 쪽 산책로도 개방되어 있고요."</p>
                    </div>
                    <button class="action-button" onclick="continueToDay2()" style="width: 100%;">
                        다음날로 (Day 2)
                    </button>
                `;
            case 'polite':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"도서관 안내를 원하시는군요. 1층에는 카페와 어린이 코너, 2층에는 힐링 라운지와 열람실이 있어요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (정중한 질문)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay2()" style="width: 100%;">
                        다음날로 (Day 2)
                    </button>
                `;
            case 'distant':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"아... 그렇군요. 편안히 둘러보세요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (거리감 느껴짐)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay2()" style="width: 100%;">
                        다음날로 (Day 2)
                    </button>
                `;
            case 'rude':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"죄송합니다. 그냥... 편안히 이용하세요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (상처받은 모습)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay2()" style="width: 100%;">
                        다음날로 (Day 2)
                    </button>
                `;
        }
    }
    
    // Day 2 - 플레임 반응들
    if (characterId === 'flame') {
        switch (responseType) {
            case 'grateful':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"하... 뭐 당연한 거죠. 맛있게 드세요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (츤데레 만족)</div>
                    </div>
                    <div style="margin: 20px 0; line-height: 1.8;">
                        <p>플레임이 겉으로는 시큰둥하지만, 정성스럽게 커피를 내려준다.</p>
                        <p>은근히 기뻐하는 표정이 스쳐 지나간다.</p>
                    </div>
                    <button class="action-button" onclick="continueToDay3()" style="width: 100%;">
                        다음날로 (Day 3)
                    </button>
                `;
            case 'curious':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"뭐... 라떼, 카푸치노 정도? 근데 처음 오신 분한테는 아메리카노가 무난해요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (관심 표현)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay3()" style="width: 100%;">
                        다음날로 (Day 3)
                    </button>
                `;
            case 'dismissive':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"네... 알겠습니다."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (차가운 반응)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay3()" style="width: 100%;">
                        다음날로 (Day 3)
                    </button>
                `;
            case 'cold':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"...네, 알겠습니다."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (상처받고 차가워짐)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay3()" style="width: 100%;">
                        다음날로 (Day 3)
                    </button>
                `;
        }
    }
    
    // Day 3 - 퀘스트 반응들
    if (characterId === 'quest') {
        switch (responseType) {
            case 'encouraging':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"우와! 정말요? 그럼 제가 추천해드릴게요! 이 책은 겉보기엔 어린이 책 같지만 정말 깊은 이야기예요!"</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (순수함 인정)</div>
                    </div>
                    <div style="margin: 20px 0; line-height: 1.8;">
                        <p>퀘스트가 눈을 반짝이며 여러 권의 책을 보여준다.</p>
                        <p>어른답지 않은 순수한 마음에 기뻐하는 모습이다.</p>
                    </div>
                    <button class="action-button" onclick="continueToDay4()" style="width: 100%;">
                        다음날로 (Day 4)
                    </button>
                `;
            case 'interested':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"그럼 이 책부터 읽어보세요! 얇아서 금방 읽을 수 있어요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (긍정적 관심)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay4()" style="width: 100%;">
                        다음날로 (Day 4)
                    </button>
                `;
            case 'dismissive':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"아... 그렇군요. 그럼 이쪽 어른 책들도 있어요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (고정관념)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay4()" style="width: 100%;">
                        다음날로 (Day 4)
                    </button>
                `;
            case 'hurtful':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"아... 유치하다고 생각하시는군요..."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (상처받음)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay4()" style="width: 100%;">
                        다음날로 (Day 4)
                    </button>
                `;
        }
    }
    
    // Day 4 - 바다 반응들  
    if (characterId === 'bada') {
        switch (responseType) {
            case 'honest':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"마음을 털어놓아 주셔서 고마워요. 혼자 끙끙 앓고 계셨군요... 정말 힘드셨을 거예요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (솔직한 고백)</div>
                    </div>
                    <div style="margin: 20px 0; line-height: 1.8;">
                        <p>바다가 따뜻한 눈으로 바라보며 차를 한 잔 건네준다.</p>
                        <p>"이렇게 용기 내서 말씀해주셔서 고마워요. 혼자가 아니에요."</p>
                    </div>
                    <button class="action-button" onclick="continueToDay5()" style="width: 100%;">
                        다음날로 (Day 5)
                    </button>
                `;
            case 'grateful':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"별거 아니에요. 서로 돌보는 건 자연스러운 일이죠."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (감사 표현)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay5()" style="width: 100%;">
                        다음날로 (Day 5)
                    </button>
                `;
            case 'reserved':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"그렇다면... 편안히 쉬어가세요."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (거리감)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay5()" style="width: 100%;">
                        다음날로 (Day 5)
                    </button>
                `;
            case 'defensive':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"아... 죄송해요. 제가 나서서..."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (소통 거부)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay5()" style="width: 100%;">
                        다음날로 (Day 5)
                    </button>
                `;
        }
    }
    
    // Day 5 - 제로 반응들
    if (characterId === 'zero') {
        switch (responseType) {
            case 'natural':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"그렇지? 물 흐르는 소리도 좋고, 바람도 시원하고. 자연스럽게 마음이 편해지는 곳이야."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (자연스러움 수용)</div>
                    </div>
                    <div style="margin: 20px 0; line-height: 1.8;">
                        <p>제로가 호수를 바라보며 편안한 미소를 짓는다.</p>
                        <p>"억지로 뭔가 하려고 하지 말고, 흘러가는 대로 두는 것도 방법이야."</p>
                    </div>
                    <button class="action-button" onclick="continueToDay6()" style="width: 100%;">
                        다음 주로 (Day 6)
                    </button>
                `;
            case 'curious':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"호수 관리하고, 식물들 돌보고... 그냥 자연스럽게 흘러가는 대로 일하고 있어."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (호기심)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay6()" style="width: 100%;">
                        다음 주로 (Day 6)
                    </button>
                `;
            case 'hurried':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"그래? 그럼 천천히 돌아가. 서두를 필요 없어."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (급함 선호)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay6()" style="width: 100%;">
                        다음 주로 (Day 6)
                    </button>
                `;
            case 'uninterested':
                return `
                    <div class="character-response">
                        <div class="name">${character.emoji} ${character.name}</div>
                        <div class="response">"아... 그렇구나. 그럼 혼자 있고 싶을 때 와도 돼. 여긴 항상 조용해."</div>
                        <div class="context" style="color: ${changeColor};">친밀도 ${changeText} (거부감)</div>
                    </div>
                    <button class="action-button" onclick="continueToDay6()" style="width: 100%;">
                        다음 주로 (Day 6)
                    </button>
                `;
        }
    }
    
    // 기본 반응
    return `
        <div class="character-response">
            <div class="name">${character.emoji} ${character.name}</div>
            <div class="response">"그렇군요."</div>
            <div class="context" style="color: ${changeColor};">친밀도 ${changeText}</div>
        </div>
        <button class="action-button" onclick="showMainMenu()">대화 마치기</button>
    `;
}

// Day 2로 진행
function continueToDay2() {
    gameState.currentDay = 2;
    localStorage.setItem('currentDay', '2');
    
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>☕ Day 2 - 북카페에서</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                어제 스톤이 말해준 카페가 궁금해서 1층 카페로 향했다.<br>
                메뉴판 앞에서 뭘 주문할지 고민하고 있는데...
            </p>
            <button class="action-button" onclick="meetCharacter('flame', 'first_meeting')" style="width: 100%;">
                🔥 플레임과 만나기
            </button>
        </div>
    `;
}

// Day 3으로 진행
function continueToDay3() {
    gameState.currentDay = 3;
    localStorage.setItem('currentDay', '3');
    
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>📚 Day 3 - 어린이 코너에서</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                1층을 둘러보다가 어린이 코너를 지나게 되었다.<br>
                책더미 사이에서 뭔가 열심히 찾고 있는 어린 아이가 보인다.
            </p>
            <button class="action-button" onclick="meetCharacter('quest', 'first_meeting')" style="width: 100%;">
                🔍 퀘스트와 만나기
            </button>
        </div>
    `;
}

// Day 4로 진행
function continueToDay4() {
    gameState.currentDay = 4;
    localStorage.setItem('currentDay', '4');
    
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>🪷 Day 4 - 힐링 라운지에서</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                며칠째 밤늦게 도서관에 오다 보니 좀 피곤하다.<br>
                2층 힐링 라운지에 올라가서 소파에 앉아 한숨을 쉬었다.<br>
                그때 누군가 따뜻하게 말을 걸어온다.
            </p>
            <button class="action-button" onclick="meetCharacter('bada', 'first_meeting')" style="width: 100%;">
                🪷 바다와 만나기
            </button>
        </div>
    `;
}

// Day 5로 진행
function continueToDay5() {
    gameState.currentDay = 5;
    localStorage.setItem('currentDay', '5');
    
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>🌊 Day 5 - 호수 산책로에서</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                답답한 마음에 밖으로 나왔더니 도서관 옆에 작은 호수가 있다.<br>
                벤치에 앉아서 물을 바라보며 마음을 정리하고 있는데...
            </p>
            <div style="text-align: center; margin: 20px 0; color: #4a5568; font-style: italic;">
                "와... 이런 곳이 있었네"
            </div>
            <button class="action-button" onclick="meetCharacter('zero', 'first_meeting')" style="width: 100%;">
                🌊 제로와 만나기
            </button>
        </div>
    `;
}

// 동반자 기록 로드
function loadCompanionHistory() {
    const specialFriendsList = document.getElementById('specialFriendsList');
    const allCharactersList = document.getElementById('allCharactersList');
    
    // 소중한 친구들 (친밀도 10 이상)
    let specialFriends = '';
    let hasSpecialFriends = false;
    
    // 모든 캐릭터 현황
    let allCharacters = '';
    
    Object.keys(characters).forEach(charId => {
        const character = characters[charId];
        
        // 소중한 친구들 확인
        if (character.intimacy >= 10) {
            hasSpecialFriends = true;
            specialFriends += `
                <div class="special-friend-item">
                    <div>
                        <span style="font-size: 1.5rem; margin-right: 10px;">${character.emoji}</span>
                        <strong>${character.name}</strong>
                        <span style="color: #718096; margin-left: 10px;">${character.type}</span>
                        <div style="margin-top: 5px;">
                            ${generateHearts(character.intimacy)}
                            <span style="margin-left: 10px; color: #e53e3e; font-weight: bold;">♥ ${character.intimacy}</span>
                        </div>
                    </div>
                    <button class="action-button" onclick="meetCharacter('${charId}')">
                        다시 만나기
                    </button>
                </div>
            `;
        }
        
        // 전체 캐릭터 목록
        const statusText = character.intimacy === 0 ? '아직 만나지 못함' : 
                          character.intimacy < 5 ? '알게 된 사이' :
                          character.intimacy < 10 ? '친한 사이' : 
                          character.intimacy < 15 ? '소중한 친구' : '진정한 동반자';
        
        allCharacters += `
            <div class="pattern-item">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <span style="font-size: 1.5rem; margin-right: 10px;">${character.emoji}</span>
                        <strong>${character.name}</strong>
                        <span style="color: #718096; margin-left: 10px;">${character.location}</span>
                        <div style="margin-top: 5px;">
                            ${generateHearts(character.intimacy)}
                            <span style="margin-left: 10px; color: #4a5568;">${statusText}</span>
                        </div>
                    </div>
                    ${character.intimacy >= 10 ? `
                        <button class="action-button" onclick="meetCharacter('${charId}')">
                            만나기
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    // 소중한 친구들 섹션
    if (hasSpecialFriends) {
        specialFriendsList.innerHTML = `
            <div class="special-friends">
                ${specialFriends}
            </div>
        `;
        document.getElementById('specialFriendsSection').style.display = 'block';
    } else {
        document.getElementById('specialFriendsSection').style.display = 'none';
    }
    
    // 전체 캐릭터 목록
    allCharactersList.innerHTML = `
        <div class="pattern-list">
            ${allCharacters}
            <div class="game-progress">
                <div class="progress-text">게임 진행도</div>
                <div class="progress-day">Day ${gameState.currentDay} / 10</div>
            </div>
        </div>
    `;
}

// Day 6-10 심화 시나리오 구현
function continueToDay6() {
    gameState.currentDay = 6;
    localStorage.setItem('currentDay', '6');
    
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    content.innerHTML = `
        <div class="header">
            <h2>🌅 Day 6 - 새로운 한 주의 시작</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                첫 번째 주가 지나갔다. 이 도서관이 익숙해졌고, 
                새로운 사람들과도 인사를 나누게 되었다.<br><br>
                오늘은 누구와 더 깊은 이야기를 나누고 싶을까?
            </p>
            <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="margin-bottom: 15px; color: #4a5568;">💭 지금까지의 만남들</h3>
                <p style="line-height: 1.8; color: #718096;">
                    스톤과는 정보데스크에서, 플레임과는 카페에서,<br>
                    퀘스트와는 어린이코너에서, 바다와는 힐링라운지에서,<br>
                    제로와는 호수 옆에서 만났었다.
                </p>
            </div>
            <button class="action-button" onclick="selectDeepConnection()" style="width: 100%;">
                🎯 더 깊은 관계로
            </button>
        </div>
    `;
}

function selectDeepConnection() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    // Day별 다른 스토리 제공
    if (gameState.currentDay === 6) {
        showDay6Selection();
    } else if (gameState.currentDay === 7) {
        showDay7Story();
    } else if (gameState.currentDay === 8) {
        showDay8Story();
    } else {
        // Day 9+ 기본 선택
        showDefaultDeepConnection();
    }
}

function showDay6Selection() {
    const content = document.getElementById('companionContent');
    
    // 친밀도 높은 순으로 정렬
    const sortedCharacters = Object.keys(characters).sort((a, b) => 
        characters[b].intimacy - characters[a].intimacy
    );
    
    let characterButtons = '';
    sortedCharacters.forEach(charId => {
        const char = characters[charId];
        if (char.intimacy > 0) {
            characterButtons += `
                <button class="situation-button" onclick="deepMeeting('${charId}')" style="margin-bottom: 10px;">
                    <span class="situation-emoji">${char.emoji}</span>
                    <div>
                        <div class="situation-text">${char.name}와 더 이야기하기</div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">${char.location} • 친밀도 ${char.intimacy}</div>
                    </div>
                </button>
            `;
        }
    });
    
    content.innerHTML = `
        <div class="header">
            <h2>💝 Day 6 - 누구와 더 깊은 시간을?</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                일주일 동안 만난 사람들 중에서 누군가와 더 특별한 시간을 보내고 싶다.
            </p>
            ${characterButtons}
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%; margin-top: 20px; background: linear-gradient(135deg, #667eea, #764ba2);">
                ⏭️ 스킵하고 다음 날로 (Day ${gameState.currentDay + 1})
            </button>
            <button class="back-button" onclick="showMainMenu()">나중에 생각해보기</button>
        </div>
    `;
}

function showDay7Story() {
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>🌙 Day 7 - 더 깊어진 밤</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                벌써 일주일째 이 도서관에 다니고 있다.<br><br>
                처음엔 그냥 시간 때우기였는데, 이제는 여기 오는 게 하루의 유일한 기대가 되었다.<br><br>
                오늘은 평소보다 늦은 시간이라 그런지, 도서관이 더 조용하고 신비로워 보인다.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="font-size: 1.2rem; color: #667eea; margin-bottom: 15px;">💫 특별한 순간이 다가오고 있다</div>
            </div>
            <button class="action-button" onclick="exploreDay7()" style="width: 100%; margin-bottom: 15px;">
                📚 조용한 도서관을 둘러보기
            </button>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%; margin-top: 10px; background: linear-gradient(135deg, #667eea, #764ba2);">
                ⏭️ 다음 날로 (Day 8)
            </button>
        </div>
    `;
}

function showDay8Story() {
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>✨ Day 8 - 마법 같은 저녁</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                오늘따라 도서관의 분위기가 특별하다.<br><br>
                따뜻한 조명 아래에서 책을 읽는 사람들, 조용히 대화를 나누는 이들...<br><br>
                문득 이곳에서 만난 사람들이 얼마나 소중한지 깨닫게 된다.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="font-size: 1.2rem; color: #667eea; margin-bottom: 15px;">🌟 진정한 인연을 느끼는 순간</div>
            </div>
            <button class="action-button" onclick="reflectOnJourney()" style="width: 100%; margin-bottom: 15px;">
                💭 지금까지의 여정을 돌아보기
            </button>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%; margin-top: 10px; background: linear-gradient(135deg, #667eea, #764ba2);">
                ⏭️ 다음 날로 (Day 9 - 클라이맥스)
            </button>
        </div>
    `;
}

function showDefaultDeepConnection() {
    const content = document.getElementById('companionContent');
    
    // Day 9+ 기본 로직 (기존 코드 유지)
    const sortedCharacters = Object.keys(characters).sort((a, b) => 
        characters[b].intimacy - characters[a].intimacy
    );
    
    let characterButtons = '';
    sortedCharacters.forEach(charId => {
        const char = characters[charId];
        if (char.intimacy > 0) {
            characterButtons += `
                <button class="situation-button" onclick="deepMeeting('${charId}')" style="margin-bottom: 10px;">
                    <span class="situation-emoji">${char.emoji}</span>
                    <div>
                        <div class="situation-text">${char.name}와 마지막 대화</div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">${char.location} • 친밀도 ${char.intimacy}</div>
                    </div>
                </button>
            `;
        }
    });
    
    content.innerHTML = `
        <div class="header">
            <h2>🌙 마지막 밤, 누구와 함께?</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                도서관에서의 마지막 밤... 누구와 함께 보내고 싶은가?
            </p>
            ${characterButtons}
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%; margin-top: 20px; background: linear-gradient(135deg, #667eea, #764ba2);">
                ⏭️ 혼자서 마지막 밤 보내기
            </button>
        </div>
    `;
}

function exploreDay7() {
    const content = document.getElementById('companionContent');
    
    // 친밀도 가장 높은 캐릭터 찾기
    const sortedCharacters = Object.keys(characters).sort((a, b) => 
        characters[b].intimacy - characters[a].intimacy
    );
    const favoriteChar = characters[sortedCharacters[0]];
    
    content.innerHTML = `
        <div class="header">
            <h2>📚 Day 7 - 조용한 발견</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                도서관을 조용히 둘러보다가 ${favoriteChar.emoji} ${favoriteChar.name}이(가) 있는 ${favoriteChar.location}을 지나게 되었다.<br><br>
                ${favoriteChar.name}은(는) 평소보다 더 집중해서 무언가에 몰두하고 있다.<br><br>
                살짝 다가가서 보니, 당신과의 만남들을 일기장에 적고 있는 것 같다.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="font-size: 0.95rem; color: #718096; font-style: italic;">
                    "${favoriteChar.name}도 우리의 만남을 소중히 여기고 있구나..."
                </div>
            </div>
            <button class="action-button" onclick="approachQuietly()" style="width: 100%; margin-bottom: 10px;">
                조용히 다가가서 인사하기
            </button>
            <button class="action-button" onclick="watchFromDistance()" style="width: 100%; margin-bottom: 10px;">
                멀리서 조용히 지켜보기
            </button>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%; margin-top: 10px; background: linear-gradient(135deg, #667eea, #764ba2);">
                ⏭️ 다음 날로 (Day 8)
            </button>
        </div>
    `;
}

function reflectOnJourney() {
    const content = document.getElementById('companionContent');
    
    // 친밀도 통계 계산
    const totalIntimacy = Object.values(characters).reduce((sum, char) => sum + char.intimacy, 0);
    const avgIntimacy = Math.round(totalIntimacy / 5);
    const bestFriends = Object.values(characters).filter(char => char.intimacy >= 10);
    
    content.innerHTML = `
        <div class="header">
            <h2>💭 Day 8 - 여정의 돌아봄</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                이 도서관에서 보낸 8일간을 돌아본다...<br><br>
                ${bestFriends.length > 0 ? 
                    `${bestFriends.map(char => char.emoji + ' ' + char.name).join(', ')}와(과) 특별한 인연을 맺었고,` :
                    '여러 사람들과 만나며 조금씩 마음을 열었고,'
                }<br><br>
                처음 이곳에 왔을 때의 막막함은 이제 따뜻한 기대감으로 바뀌어 있다.
            </p>
            <div style="background: linear-gradient(135deg, #e8f4f8, #f7f1e8); padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h4 style="color: #4a5568; margin: 0 0 15px 0; text-align: center;">🌟 나의 성장 통계</h4>
                <div style="text-align: center;">
                    <div style="margin: 10px 0;">평균 친밀도: <strong>${avgIntimacy}/20</strong></div>
                    <div style="margin: 10px 0;">특별한 친구: <strong>${bestFriends.length}명</strong></div>
                    <div style="margin: 10px 0;">총 만남 횟수: <strong>8일</strong></div>
                </div>
            </div>
            <button class="action-button" onclick="feelGrateful()" style="width: 100%; margin-bottom: 10px;">
                🙏 감사한 마음 느끼기
            </button>
            <button class="action-button" onclick="lookToFuture()" style="width: 100%; margin-bottom: 10px;">
                🌅 앞으로의 기대하기
            </button>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%; margin-top: 10px; background: linear-gradient(135deg, #667eea, #764ba2);">
                ⏭️ 다음 날로 (Day 9 - 클라이맥스)
            </button>
        </div>
    `;
}

function approachQuietly() {
    const content = document.getElementById('companionContent');
    const sortedCharacters = Object.keys(characters).sort((a, b) => 
        characters[b].intimacy - characters[a].intimacy
    );
    const favoriteChar = characters[sortedCharacters[0]];
    
    // 친밀도 +1 증가
    favoriteChar.intimacy = Math.min(20, favoriteChar.intimacy + 1);
    localStorage.setItem(`intimacy_${sortedCharacters[0]}`, favoriteChar.intimacy.toString());
    
    content.innerHTML = `
        <div class="header">
            <h2>😊 Day 7 - 따뜻한 순간</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                조용히 다가가자 ${favoriteChar.name}이(가) 고개를 들어 미소 짓는다.<br><br>
                "아, 왔네요. 저 지금... 음, 그냥 일기 같은 거 써요. 요즘 좋은 일들이 많아서."<br><br>
                ${favoriteChar.name}의 얼굴이 살짝 붉어지며 일기장을 덮는다.
            </p>
            <div style="text-align: center; margin: 30px 0; color: #e53e3e;">
                💝 ${favoriteChar.name}와의 친밀도가 올랐습니다! (${favoriteChar.intimacy}/20)
            </div>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%;">
                ⏭️ 다음 날로 (Day 8)
            </button>
        </div>
    `;
}

function watchFromDistance() {
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>👀 Day 7 - 조용한 관찰</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                멀리서 조용히 지켜본다.<br><br>
                사람들이 각자의 공간에서 평화롭게 시간을 보내는 모습이 아름답다.<br><br>
                가끔 이렇게 거리를 두고 바라보는 것도 좋은 것 같다.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="font-size: 0.95rem; color: #718096; font-style: italic;">
                    "때로는 지켜보는 것만으로도 충분하다"
                </div>
            </div>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%;">
                ⏭️ 다음 날로 (Day 8)
            </button>
        </div>
    `;
}

function feelGrateful() {
    const content = document.getElementById('companionContent');
    
    // 모든 캐릭터 친밀도 +1
    Object.keys(characters).forEach(charId => {
        characters[charId].intimacy = Math.min(20, characters[charId].intimacy + 1);
        localStorage.setItem(`intimacy_${charId}`, characters[charId].intimacy.toString());
    });
    
    content.innerHTML = `
        <div class="header">
            <h2>🙏 Day 8 - 감사의 마음</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                이 모든 만남이 얼마나 소중한지 새삼 깨닫는다.<br><br>
                혼자였다면 절대 느낄 수 없었을 따뜻함들...<br><br>
                마음속 깊이 감사의 기도를 올린다.
            </p>
            <div style="text-align: center; margin: 30px 0; color: #e53e3e;">
                💝 모든 친구들과의 친밀도가 올랐습니다!
            </div>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%;">
                ⏭️ 다음 날로 (Day 9 - 클라이맥스)
            </button>
        </div>
    `;
}

function lookToFuture() {
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>🌅 Day 8 - 미래에 대한 기대</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                앞으로도 이런 따뜻한 만남들이 계속되길 바란다.<br><br>
                도서관을 나서더라도, 이곳에서 배운 것들을 가지고 살아갈 수 있을 것 같다.<br><br>
                새로운 시작에 대한 설렘이 마음을 가득 채운다.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="font-size: 0.95rem; color: #718096; font-style: italic;">
                    "끝이 아니라 새로운 시작"
                </div>
            </div>
            <button class="action-button" onclick="continueToNextDay()" style="width: 100%;">
                ⏭️ 다음 날로 (Day 9 - 클라이맥스)
            </button>
        </div>
    `;
}

function deepMeeting(characterId) {
    const character = characters[characterId];
    
    // 친밀도에 따른 대화 내용 결정
    if (character.intimacy >= 15) {
        showTrueCompanionScene(characterId);
    } else if (character.intimacy >= 10) {
        showSpecialFriendScene(characterId);
    } else if (character.intimacy >= 5) {
        showDeepeningScene(characterId);
    } else {
        showGettingCloserScene(characterId);
    }
}

// 친밀도 10-14: 특별한 친구 시나리오
function showSpecialFriendScene(characterId) {
    const character = characters[characterId];
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    let sceneContent = '';
    
    switch(characterId) {
        case 'stone':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"이제 여기가 많이 익숙해지셨겠네요. 제가 처음 봤을 때보다 표정이 많이 편해 보여요."</div>
                    <div class="context">진심으로 걱정해주는 스톤</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">스톤의 따뜻한 관찰에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('stone', 'thankful', 2)" style="width: 100%; margin-bottom: 10px;">
                    "당신 같은 사람이 있어서 그런 것 같아요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'growth', 1)" style="width: 100%; margin-bottom: 10px;">
                    "조금씩 나아지고 있는 것 같아요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'uncertain', 0)" style="width: 100%; margin-bottom: 10px;">
                    "아직 잘 모르겠어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'denial', -1)" style="width: 100%; margin-bottom: 10px;">
                    "별로 달라진 건 없어요"
                </button>
            `;
            break;
            
        case 'flame':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"하... 또 왔네요. 이제 단골이니까 특별 메뉴 추천해드릴게요. 아니, 별로 특별한 건 아니지만..."</div>
                    <div class="context">츤데레하지만 배려하는 플레임</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">플레임의 츤데레식 특별 대우에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('flame', 'touching', 2)" style="width: 100%; margin-bottom: 10px;">
                    "이렇게 신경써주시는 마음이 고마워요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'happy', 1)" style="width: 100%; margin-bottom: 10px;">
                    "특별 메뉴라니, 기대돼요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'normal', 0)" style="width: 100%; margin-bottom: 10px;">
                    "평소처럼 주세요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'indifferent', -1)" style="width: 100%; margin-bottom: 10px;">
                    "뭐든 상관없어요"
                </button>
            `;
            break;
            
        case 'quest':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"이제 정말 친구 같아요! 어른들 중에서 이렇게 자주 와주는 사람은 처음이에요!"</div>
                    <div class="context">순수하게 기뻐하는 퀘스트</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">퀘스트의 순수한 기쁨에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('quest', 'precious', 2)" style="width: 100%; margin-bottom: 10px;">
                    "저도 당신 같은 친구가 있어서 기뻐요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'mutual', 1)" style="width: 100%; margin-bottom: 10px;">
                    "저도 그렇게 생각해요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'modest', 0)" style="width: 100%; margin-bottom: 10px;">
                    "그냥 시간이 있어서요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'adult', -1)" style="width: 100%; margin-bottom: 10px;">
                    "어른과 아이는 다르죠"
                </button>
            `;
            break;
            
        case 'bada':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"이제 정말 많이 편해 보여요. 처음 봤을 때와는 완전히 다른 사람 같아요."</div>
                    <div class="context">변화를 따뜻하게 지켜본 바다</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">바다의 따뜻한 인정에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('bada', 'emotional', 2)" style="width: 100%; margin-bottom: 10px;">
                    "당신이 지켜봐 주셔서 그런 것 같아요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'grateful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "정말 고마워요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'humble', 0)" style="width: 100%; margin-bottom: 10px;">
                    "조금씩이라도 나아지고 있다면..."
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'doubtful', -1)" style="width: 100%; margin-bottom: 10px;">
                    "아직도 잘 모르겠어요"
                </button>
            `;
            break;
            
        case 'zero':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"자주 와서 이제 호수도 당신을 기억하는 것 같아. 자연스럽게 어울리고 있어."</div>
                    <div class="context">자연스럽게 받아들이는 제로</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">제로의 자연스러운 인정에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('zero', 'harmonious', 2)" style="width: 100%; margin-bottom: 10px;">
                    "정말 그런 것 같아요. 모든 게 자연스러워졌어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'peaceful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "여기서 마음이 편해져요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'simple', 0)" style="width: 100%; margin-bottom: 10px;">
                    "좋은 곳이에요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'restless', -1)" style="width: 100%; margin-bottom: 10px;">
                    "아직도 불안해요"
                </button>
            `;
            break;
    }
    
    content.innerHTML = `
        <div class="header">
            <h2>${character.emoji} ${character.name}와의 특별한 시간</h2>
            <p>${character.location}</p>
            <div class="intimacy-display">
                ${generateHearts(character.intimacy)}
                <span style="margin-left: 10px; color: #718096;">친밀도: ${character.intimacy}</span>
            </div>
        </div>
        <div class="result-section">
            ${sceneContent}
        </div>
    `;
}

// 친밀도 15+: 진정한 동반자 시나리오
function showTrueCompanionScene(characterId) {
    const character = characters[characterId];
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    let sceneContent = '';
    
    switch(characterId) {
        case 'stone':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"정말 변하셨네요. 처음 만났을 때의 답답해하시던 모습과는 완전히 달라졌어요. 이제 진짜 친구가 된 것 같아요."</div>
                    <div class="context">진심으로 인정하는 스톤</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">스톤의 진심어린 인정에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('stone', 'soulmate', 3)" style="width: 100%; margin-bottom: 10px;">
                    "저도 당신을 진정한 친구라고 생각해요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'deep', 2)" style="width: 100%; margin-bottom: 10px;">
                    "당신 덕분에 많이 배웠어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'growth', 1)" style="width: 100%; margin-bottom: 10px;">
                    "조금씩 나아지고 있어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'uncertain', 0)" style="width: 100%; margin-bottom: 10px;">
                    "아직도 확신이 안 서요"
                </button>
            `;
            break;
            
        case 'flame':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"...진짜 자주 와서 이제 눈에 익네요. 솔직히... 당신이 안 오면 좀 심심할 것 같아요."</div>
                    <div class="context">솔직해진 플레임</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">플레임의 솔직한 고백에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('flame', 'special', 3)" style="width: 100%; margin-bottom: 10px;">
                    "저도 당신이 있어서 이곳이 특별해졌어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'mutual', 2)" style="width: 100%; margin-bottom: 10px;">
                    "저도 마찬가지예요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'happy', 1)" style="width: 100%; margin-bottom: 10px;">
                    "그렇게 말씀해주시니 기뻐요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'casual', 0)" style="width: 100%; margin-bottom: 10px;">
                    "그냥 습관이 된 것 같아요"
                </button>
            `;
            break;
            
        case 'quest':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"이제 정말 가족 같아요! 어른인데도 순수한 마음을 잃지 않으셨어요. 정말 존경해요!"</div>
                    <div class="context">순수한 마음으로 존경하는 퀘스트</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">퀘스트의 순수한 존경에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('quest', 'treasure', 3)" style="width: 100%; margin-bottom: 10px;">
                    "당신 같은 친구야말로 정말 소중해요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'learn', 2)" style="width: 100%; margin-bottom: 10px;">
                    "오히려 당신에게서 배우고 있어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'thankful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "그렇게 말해줘서 고마워요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'distant', 0)" style="width: 100%; margin-bottom: 10px;">
                    "어른이 되면 달라지는 거예요"
                </button>
            `;
            break;
            
        case 'bada':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"이제 정말 마음이 평안해 보여요. 당신을 보고 있으면 저도 기뻐져요. 이렇게 변화하시는 모습이 정말 아름다워요."</div>
                    <div class="context">진심으로 축복하는 바다</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">바다의 축복에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('bada', 'blessed', 3)" style="width: 100%; margin-bottom: 10px;">
                    "당신이 있어서 가능했어요. 정말 고마워요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'peaceful', 2)" style="width: 100%; margin-bottom: 10px;">
                    "정말 마음이 편해졌어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'grateful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "따뜻하게 지켜봐 주셔서 감사해요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'humble', 0)" style="width: 100%; margin-bottom: 10px;">
                    "아직 부족한 점이 많아요"
                </button>
            `;
            break;
            
        case 'zero':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"이제 정말 자연스러워졌어. 억지로 뭔가 하려고 하지 않고, 흘러가는 대로 두는 법을 배웠구나. 그게 진짜 성장이야."</div>
                    <div class="context">인정하는 제로</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">제로의 깊은 인정에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('zero', 'enlightened', 3)" style="width: 100%; margin-bottom: 10px;">
                    "당신이 가르쳐준 자연스러움을 배웠어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'wise', 2)" style="width: 100%; margin-bottom: 10px;">
                    "정말 많이 배웠어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'calm', 1)" style="width: 100%; margin-bottom: 10px;">
                    "마음이 편해졌어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'confused', 0)" style="width: 100%; margin-bottom: 10px;">
                    "아직도 어려워요"
                </button>
            `;
            break;
    }
    
    content.innerHTML = `
        <div class="header">
            <h2>${character.emoji} ${character.name}와의 진정한 시간</h2>
            <p>${character.location}</p>
            <div class="intimacy-display">
                ${generateHearts(character.intimacy)}
                <span style="margin-left: 10px; color: #e53e3e; font-weight: bold;">진정한 동반자 (친밀도: ${character.intimacy})</span>
            </div>
        </div>
        <div class="result-section">
            ${sceneContent}
        </div>
    `;
}

// 친밀도 1-4: 가까워지는 시나리오  
function showGettingCloserScene(characterId) {
    const character = characters[characterId];
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>${character.emoji} ${character.name}와 조금 더 가까워지기</h2>
            <p>${character.location}</p>
            <div class="intimacy-display">
                ${generateHearts(character.intimacy)}
                <span style="margin-left: 10px; color: #718096;">친밀도: ${character.intimacy}</span>
            </div>
        </div>
        <div class="result-section">
            <div class="character-response">
                <div class="name">${character.emoji} ${character.name}</div>
                <div class="response">"또 오셨네요. 조금씩 익숙해지고 있어요."</div>
                <div class="context">서로 알아가는 중</div>
            </div>
            <button class="action-button" onclick="respondToDeepening('${characterId}', 'friendly', 1)" style="width: 100%; margin-bottom: 10px;">
                "저도 여기가 좋아져요"
            </button>
            <button class="action-button" onclick="respondToDeepening('${characterId}', 'casual', 0)" style="width: 100%; margin-bottom: 10px;">
                "그냥 가끔 와요"
            </button>
        </div>
    `;
}

// 관계 심화 시나리오들
function showDeepeningScene(characterId) {
    const character = characters[characterId];
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    let sceneContent = '';
    
    switch(characterId) {
        case 'stone':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"요즘 자주 뵙네요. 여기가 편하신가 봐요?"</div>
                    <div class="context">더 관심을 보이는 스톤</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">스톤의 관심에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('stone', 'honest', 2)" style="width: 100%; margin-bottom: 10px;">
                    "네, 여기 오면 마음이 안정돼요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'grateful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "도움을 많이 받았어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'casual', 0)" style="width: 100%; margin-bottom: 10px;">
                    "그냥 가끔 와요"
                </button>
                <button class="action-button" onclick="respondToDeepening('stone', 'distant', -1)" style="width: 100%; margin-bottom: 10px;">
                    "특별한 이유는 없어요"
                </button>
            `;
            break;
            
        case 'flame':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"...또 왔네요. 이번엔 뭐 드실래요? 아니면... 그냥 앉아있을 거예요?"</div>
                    <div class="context">츤데레지만 관심 있는 플레임</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">플레임의 어색한 관심에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('flame', 'sincere', 2)" style="width: 100%; margin-bottom: 10px;">
                    "당신 덕분에 이곳이 더 좋아졌어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'playful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "추천해주시는 대로 할게요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'simple', 0)" style="width: 100%; margin-bottom: 10px;">
                    "아메리카노 하나만요"
                </button>
                <button class="action-button" onclick="respondToDeepening('flame', 'cold', -1)" style="width: 100%; margin-bottom: 10px;">
                    "뭐든 상관없어요"
                </button>
            `;
            break;
            
        case 'quest':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"또 왔어요! 어른인데 여기 자주 와서 신기해요. 혹시 진짜 책 좋아하세요?"</div>
                    <div class="context">호기심 가득한 퀘스트</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">퀘스트의 순수한 궁금증에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('quest', 'encouraging', 2)" style="width: 100%; margin-bottom: 10px;">
                    "당신처럼 순수한 마음을 배우고 싶어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'honest', 1)" style="width: 100%; margin-bottom: 10px;">
                    "책보다는 여기 분위기가 좋아요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'evasive', 0)" style="width: 100%; margin-bottom: 10px;">
                    "그냥... 시간 보내러 와요"
                </button>
                <button class="action-button" onclick="respondToDeepening('quest', 'dismissive', -1)" style="width: 100%; margin-bottom: 10px;">
                    "어른 일은 복잡해요"
                </button>
            `;
            break;
            
        case 'bada':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"또 뵙네요. 표정이 좀 나아 보여요. 이곳이 도움이 되나 봐요?"</div>
                    <div class="context">따뜻하게 지켜보는 바다</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">바다의 따뜻한 관찰에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('bada', 'grateful', 2)" style="width: 100%; margin-bottom: 10px;">
                    "당신 같은 사람이 있어서 그런 것 같아요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'honest', 1)" style="width: 100%; margin-bottom: 10px;">
                    "조금은... 마음이 편해졌어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'modest', 0)" style="width: 100%; margin-bottom: 10px;">
                    "아직 잘 모르겠어요"
                </button>
                <button class="action-button" onclick="respondToDeepening('bada', 'closed', -1)" style="width: 100%; margin-bottom: 10px;">
                    "별로 달라진 건 없어요"
                </button>
            `;
            break;
            
        case 'zero':
            sceneContent = `
                <div class="character-response">
                    <div class="name">${character.emoji} ${character.name}</div>
                    <div class="response">"또 호수 보러 왔구나. 물 흐르는 소리가 좋지? 마음도 흘러가는 것 같고."</div>
                    <div class="context">자연스럽게 함께 있는 제로</div>
                </div>
                <h4 style="color: #4a5568; margin: 20px 0 15px 0;">제로의 자연스러운 말에 어떻게 답할까요?</h4>
                <button class="action-button" onclick="respondToDeepening('zero', 'philosophical', 2)" style="width: 100%; margin-bottom: 10px;">
                    "정말 그런 것 같아요. 억지로 하지 않는 게 좋은 건지..."
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'peaceful', 1)" style="width: 100%; margin-bottom: 10px;">
                    "여기 있으면 편안해져요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'simple', 0)" style="width: 100%; margin-bottom: 10px;">
                    "소리가 좋네요"
                </button>
                <button class="action-button" onclick="respondToDeepening('zero', 'restless', -1)" style="width: 100%; margin-bottom: 10px;">
                    "계속 같은 자리에 있기 답답해요"
                </button>
            `;
            break;
    }
    
    content.innerHTML = `
        <div class="header">
            <h2>${character.emoji} ${character.name}와의 더 깊은 시간</h2>
            <p>${character.location}</p>
            <div class="intimacy-display">
                ${generateHearts(character.intimacy)}
                <span style="margin-left: 10px; color: #718096;">친밀도: ${character.intimacy}</span>
            </div>
        </div>
        <div class="result-section">
            ${sceneContent}
        </div>
    `;
}

function respondToDeepening(characterId, responseType, intimacyChange) {
    const character = characters[characterId];
    character.intimacy += intimacyChange;
    character.intimacy = Math.max(0, Math.min(20, character.intimacy));
    localStorage.setItem(`intimacy_${characterId}`, character.intimacy.toString());
    
    // 다음 날로 진행하거나 엔딩으로
    if (gameState.currentDay >= 8) {
        checkForEnding();
    } else {
        continueToNextDay();
    }
}

function continueToNextDay() {
    gameState.currentDay++;
    localStorage.setItem('currentDay', gameState.currentDay.toString());
    
    if (gameState.currentDay <= 8) {
        selectDeepConnection(); // 6-8일 반복적으로 심화 관계
    } else {
        prepareEnding();
    }
}

function prepareEnding() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>🌙 Day 9 - 특별한 밤</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                어느새 열흘 가까이 이 도서관에 다녔다.<br>
                처음엔 답답해서 나왔던 밤이었는데...<br><br>
                이제는 여기 사람들이 소중하게 느껴진다.<br>
                내일이면 일주일째, 뭔가 특별한 일이 일어날 것 같다.
            </p>
            <button class="action-button" onclick="checkForEnding()" style="width: 100%;">
                Day 10으로 (엔딩 확인)
            </button>
        </div>
    `;
}

function checkForEnding() {
    gameState.currentDay = 10;
    localStorage.setItem('currentDay', '10');
    
    // 친밀도 계산
    const intimacyScores = Object.keys(characters).map(id => characters[id].intimacy);
    const maxIntimacy = Math.max(...intimacyScores);
    const averageIntimacy = intimacyScores.reduce((a, b) => a + b, 0) / intimacyScores.length;
    const highIntimacyCount = intimacyScores.filter(score => score >= 15).length;
    
    // 엔딩 결정
    if (maxIntimacy >= 20) {
        showTrueCompanionEnding();
    } else if (highIntimacyCount >= 3) {
        showPerfectEnding();
    } else if (averageIntimacy >= 10) {
        showGrowthEnding();
    } else {
        showRegularEnding();
    }
}

function showTrueCompanionEnding() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    // 최고 친밀도 캐릭터 찾기
    const topCharacter = Object.keys(characters).reduce((a, b) => 
        characters[a].intimacy > characters[b].intimacy ? a : b
    );
    const char = characters[topCharacter];
    
    content.innerHTML = `
        <div class="header">
            <h2>✨ 진정한 동반자 엔딩</h2>
        </div>
        <div class="result-section">
            <div class="character-response">
                <div class="name">${char.emoji} ${char.name}</div>
                <div class="response">"정말 소중한 시간이었어요. 당신과 함께한 이 시간들을 잊지 않을게요."</div>
                <div class="context">특별한 약속을 하는 ${char.name}</div>
            </div>
            <div style="margin: 20px 0; line-height: 1.8; background: #fff3cd; padding: 20px; border-radius: 10px;">
                <h3 style="color: #856404; margin-bottom: 15px;">🎁 특별한 선물</h3>
                <p style="color: #856404;">
                    ${char.name}이 작은 선물을 건네줍니다.<br>
                    "${getSpecialGift(topCharacter)}"
                </p>
            </div>
            <button class="action-button" onclick="showFinalScene()" style="width: 100%;">
                눈을 뜨다
            </button>
        </div>
    `;
}

function getSpecialGift(characterId) {
    const gifts = {
        stone: "작은 돌멩이 하나. '현실을 잊지 마세요'라는 쪽지와 함께",
        flame: "카페 쿠폰. '언제든 좋은 커피 한 잔 드릴게요'라고 적혀있다",
        quest: "작은 책갈피. '어른이 되어도 순수함을 잃지 마세요'라는 글이",
        bada: "작은 연꽃 브로치. '마음의 평안을 기억하세요'라는 의미",
        zero: "작은 조약돌. '자연스럽게 흘러가세요'라는 메시지와 함께"
    };
    return gifts[characterId];
}

function showPerfectEnding() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>🌟 완벽한 동반자들 엔딩</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                모든 사람들과 깊은 인연을 맺었습니다.<br>
                이제 이곳은 당신에게 진정한 안식처가 되었습니다.
            </p>
            <div style="background: #d4edda; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #155724; margin-bottom: 15px;">💝 모든 친구들의 메시지</h3>
                <p style="color: #155724; line-height: 1.6;">
                    "당신이 있어서 이곳이 더 따뜻해졌어요"<br>
                    "언제든 돌아와 주세요"<br>
                    "우리는 여기서 기다리고 있을게요"
                </p>
            </div>
            <button class="action-button" onclick="showFinalScene()" style="width: 100%;">
                눈을 뜨다
            </button>
        </div>
    `;
}

function showGrowthEnding() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>🌱 새로운 시작 엔딩</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                이곳에서 보낸 시간들이 당신에게 변화를 가져왔습니다.<br>
                이제 새로운 하루를 시작할 용기가 생겼습니다.
            </p>
            <div style="background: #cce5ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #004085; margin-bottom: 15px;">💭 깨달음</h3>
                <p style="color: #004085; line-height: 1.6;">
                    "혼자가 아니라는 걸 알게 되었어"<br>
                    "작은 변화도 소중한 시작이야"<br>
                    "누군가 함께 있어준다는 것만으로도..."
                </p>
            </div>
            <button class="action-button" onclick="showFinalScene()" style="width: 100%;">
                눈을 뜨다
            </button>
        </div>
    `;
}

function showRegularEnding() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>🌙 조용한 밤의 끝</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                특별할 것 없는 평범한 열흘이었지만,<br>
                그래도 나쁘지 않은 시간이었습니다.<br><br>
                언젠가 다시 이런 밤이 온다면...
            </p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #6c757d; margin-bottom: 15px;">💭 작은 위로</h3>
                <p style="color: #6c757d; line-height: 1.6;">
                    "가끔은 이런 시간도 필요해"<br>
                    "혼자만이 아니구나"<br>
                    "또 올 수 있겠지?"
                </p>
            </div>
            <button class="action-button" onclick="showFinalScene()" style="width: 100%;">
                눈을 뜨다
            </button>
        </div>
    `;
}

function showFinalScene() {
    showScreen('companionMeeting');
    const content = document.getElementById('companionContent');
    
    content.innerHTML = `
        <div class="header">
            <h2>☀️ 현실로 돌아오다</h2>
        </div>
        <div class="result-section">
            <p style="line-height: 1.8; margin-bottom: 20px;">
                눈을 떠보니 아침이다.<br>
                침대에서 일어나 주변을 둘러보니...<br><br>
                ${checkRealityEvidence()}
            </p>
            <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #e65100; margin-bottom: 15px;">❓ 꿈이었을까, 현실이었을까?</h3>
                <p style="color: #e65100; line-height: 1.6; font-style: italic;">
                    "어떻게 생각하든 당신의 자유입니다.<br>
                    중요한 건, 그 시간들이 당신에게 무엇을 남겼는가죠."
                </p>
            </div>
            <button class="action-button" onclick="resetGame()" style="width: 100%; margin-bottom: 10px;">
                🔄 다시 시작하기
            </button>
            <button class="action-button" onclick="showMainMenu()" style="width: 100%;">
                🏠 메인으로
            </button>
        </div>
    `;
}

function checkRealityEvidence() {
    const maxIntimacy = Math.max(...Object.keys(characters).map(id => characters[id].intimacy));
    
    if (maxIntimacy >= 20) {
        const topChar = Object.keys(characters).find(id => characters[id].intimacy >= 20);
        return `책상 위에 ${getSpecialGift(topChar)}가 놓여있다. 꿈에서 받은 그것이...`;
    } else if (maxIntimacy >= 15) {
        return "주머니에서 도서관 이용 카드가 나온다. 언제 만들었던가?";
    } else if (maxIntimacy >= 10) {
        return "폰에 모르는 번호로 온 메시지가 있다. '잘 지내고 있죠?'";
    } else {
        return "특별한 건 없다. 그냥 평범한 아침이다. 정말 꿈이었나?";
    }
}

function resetGame() {
    // 게임 데이터 초기화
    localStorage.clear();
    gameState.currentDay = 0;
    gameState.gameStarted = false;
    
    Object.keys(characters).forEach(charId => {
        characters[charId].intimacy = 0;
        characters[charId].metToday = false;
    });
    
    showMainMenu();
}

// 페이지 로드 시 초기화
window.addEventListener('load', function() {
    showMainMenu();
    
    // 게임 상태 복원
    if (gameState.gameStarted) {
        console.log(`게임 진행 중: Day ${gameState.currentDay}`);
    }
});