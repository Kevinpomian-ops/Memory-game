"use strict";
const app = document.querySelector('#app');
if (!app) {
    throw new Error('App root not found');
}
const themeAssets = {
    'Coding Vibes': [
        ...Array.from({ length: 18 }, (_, index) => `./assets/Code vibes card ${index + 1}.png`)
    ],
    Food: [
        ...Array.from({ length: 18 }, (_, index) => `./assets/food card ${String(index + 1).padStart(2, '0')}.png`)
    ],
    'DA Projects': [
        './assets/DA Projects card 01.png',
        ...Array.from({ length: 17 }, (_, index) => `./assets/DA Projects card ${index + 2}.png`)
    ],
    Gaming: [
        ...Array.from({ length: 18 }, (_, index) => `./assets/Game card ${index + 1}.png`)
    ]
};
const themePalette = {
    'Coding Vibes': {
        '--page-bg-top': '#09131d',
        '--page-bg-bottom': '#0d1826',
        '--page-glow': 'rgba(99, 124, 255, 0.28)',
        '--text-primary': '#eaf5ff',
        '--text-muted': '#aac5de',
        '--panel-bg': 'rgba(11, 21, 35, 0.72)',
        '--panel-border': 'rgba(158, 201, 255, 0.18)',
        '--button-gradient-start': '#4e8dff',
        '--button-gradient-end': '#7ecbff',
        '--button-text': '#031927',
        '--choice-bg': 'rgba(255, 255, 255, 0.02)',
        '--choice-border': 'rgba(154, 203, 255, 0.2)',
        '--choice-active-start': 'rgba(78, 141, 255, 0.18)',
        '--choice-active-end': 'rgba(126, 203, 255, 0.12)',
        '--choice-active-border': 'rgba(126, 203, 255, 0.7)',
        '--card-shadow': 'rgba(20, 37, 56, 0.45)',
        '--card-glow': 'rgba(76, 148, 255, 0.25)',
        '--game-bg': '#202c35',
        '--board-bg': 'rgba(11, 21, 35, 0.72)',
        '--card-back-border': '#45cdbd',
        '--card-front-border': '#dceceb'
    },
    Food: {
        '--page-bg-top': '#1b120d',
        '--page-bg-bottom': '#2d2017',
        '--page-glow': 'rgba(255, 178, 76, 0.2)',
        '--text-primary': '#fff6ee',
        '--text-muted': '#f0d3a1',
        '--panel-bg': 'rgba(49, 29, 16, 0.72)',
        '--panel-border': 'rgba(255, 183, 76, 0.2)',
        '--button-gradient-start': '#ff9f43',
        '--button-gradient-end': '#ffd166',
        '--button-text': '#2d180b',
        '--choice-bg': 'rgba(255, 255, 255, 0.04)',
        '--choice-border': 'rgba(255, 176, 93, 0.28)',
        '--choice-active-start': 'rgba(255, 159, 67, 0.18)',
        '--choice-active-end': 'rgba(255, 209, 102, 0.12)',
        '--choice-active-border': 'rgba(255, 176, 93, 0.8)',
        '--card-shadow': 'rgba(79, 41, 10, 0.45)',
        '--card-glow': 'rgba(255, 183, 76, 0.25)',
        '--game-bg': '#3a2419',
        '--board-bg': 'rgba(66, 35, 18, 0.78)',
        '--card-back-border': '#f58b2b',
        '--card-front-border': '#fff0dc'
    },
    'DA Projects': {
        '--page-bg-top': '#0c1422',
        '--page-bg-bottom': '#122538',
        '--page-glow': 'rgba(99, 217, 255, 0.2)',
        '--text-primary': '#edf8ff',
        '--text-muted': '#b1d6ec',
        '--panel-bg': 'rgba(12, 25, 38, 0.72)',
        '--panel-border': 'rgba(125, 213, 255, 0.2)',
        '--button-gradient-start': '#36c3ff',
        '--button-gradient-end': '#7ce5b7',
        '--button-text': '#061821',
        '--choice-bg': 'rgba(255, 255, 255, 0.03)',
        '--choice-border': 'rgba(121, 203, 255, 0.2)',
        '--choice-active-start': 'rgba(54, 195, 255, 0.18)',
        '--choice-active-end': 'rgba(124, 229, 183, 0.12)',
        '--choice-active-border': 'rgba(124, 229, 183, 0.8)',
        '--card-shadow': 'rgba(7, 32, 49, 0.45)',
        '--card-glow': 'rgba(99, 217, 255, 0.22)',
        '--game-bg': '#163b4e',
        '--board-bg': 'rgba(12, 25, 38, 0.78)',
        '--card-back-border': '#34c9c1',
        '--card-front-border': '#e1f5f4'
    },
    Gaming: {
        '--page-bg-top': '#294f60',
        '--page-bg-bottom': '#294f60',
        '--page-glow': 'rgba(242, 16, 113, 0.18)',
        '--text-primary': '#ffffff',
        '--text-muted': '#d7e9ee',
        '--panel-bg': 'rgba(33, 58, 70, 0.78)',
        '--panel-border': 'rgba(242, 16, 113, 0.35)',
        '--button-gradient-start': '#f21071',
        '--button-gradient-end': '#f21071',
        '--button-text': '#ffffff',
        '--choice-bg': 'rgba(255, 255, 255, 0.03)',
        '--choice-border': 'rgba(255, 255, 255, 0.2)',
        '--choice-active-start': 'rgba(242, 16, 113, 0.2)',
        '--choice-active-end': 'rgba(242, 16, 113, 0.1)',
        '--choice-active-border': '#f21071',
        '--card-shadow': 'rgba(10, 24, 33, 0.5)',
        '--card-glow': 'rgba(242, 16, 113, 0.25)',
        '--game-bg': '#294f60',
        '--board-bg': 'rgba(33, 58, 70, 0.82)',
        '--card-back-border': '#f21071',
        '--card-front-border': '#f4d9e5'
    }
};
const defaultSettings = {
    playerColor: 'Blue',
    playerCount: 2,
    boardSize: '4x6',
    theme: 'Coding Vibes'
};
const getBoardDimensions = (boardSize) => {
    switch (boardSize) {
        case '4x4':
            return { rows: 4, cols: 4 };
        case '4x6':
            return { rows: 4, cols: 6 };
        case '6x6':
            return { rows: 6, cols: 6 };
        default:
            return { rows: 4, cols: 6 };
    }
};
const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
};
const readSelectedOption = (groupName) => {
    const group = document.querySelector(`[data-group="${groupName}"]`);
    const selected = group?.querySelector('.choice--active');
    return (selected?.dataset.value ?? undefined);
};
const applyTheme = (theme) => {
    const root = document.documentElement;
    const palette = themePalette[theme];
    Object.entries(palette).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    const previewAssets = themeAssets[theme] ?? themeAssets[defaultSettings.theme];
    themePreviewCards.forEach((card, index) => {
        const asset = previewAssets[index] ?? previewAssets[0];
        card.style.backgroundImage = `url("${asset}")`;
    });
};
const createGameMarkup = () => `
  <div class="page home-page is-visible" data-screen="home">
    <main class="home-screen">
      <div class="home-screen__content">
        <div class="home-screen__copy">
          <p class="eyebrow">It’s play time.</p>
          <h1>Ready to <span>play?</span></h1>
          <button class="play-button" type="button" data-action="start-game">
            <span class="play-button__icon" aria-hidden="true">🎮</span>
            <span>Play</span>
            <span class="play-button__arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <div class="controller-card" aria-hidden="true">
          <img src="./assets/stadia_controller.svg" alt="Controller" class="controller-card__image" />
        </div>
      </div>
      <button class="exit-button" type="button" data-action="exit-game">Exit Game</button>
    </main>
  </div>

  <div class="page settings-page" data-screen="settings" aria-hidden="true">
    <main class="settings-screen">
      <div class="settings-panel">
        <div class="settings-layout">
          <div class="settings-controls">
            <h2>Settings</h2>

            <div class="settings-group settings-group--themes">
              <label><span class="settings-icon settings-icon--theme" aria-hidden="true">✿</span>Game themes</label>
              <div class="option-row" data-group="theme">
                <button class="choice choice--active" type="button" data-value="Coding Vibes">Coding vibes</button>
                <button class="choice" type="button" data-value="Food">Food</button>
                <button class="choice" type="button" data-value="DA Projects">DA Projects</button>
                <button class="choice" type="button" data-value="Gaming">Gaming</button>
              </div>
            </div>

            <div class="settings-group settings-group--player">
              <label><span class="settings-icon settings-icon--player" aria-hidden="true">♙</span>Choose player</label>
              <div class="option-row" data-group="color">
                <button class="choice choice--active" type="button" data-value="Blue">Blue</button>
                <button class="choice" type="button" data-value="Orange">Orange</button>
              </div>
            </div>

            <div class="settings-group settings-group--board">
              <label><span class="settings-icon settings-icon--board" aria-hidden="true">▱</span>Board size</label>
              <div class="option-row" data-group="board-size">
                <button class="choice" type="button" data-value="4x4">16 cards</button>
                <button class="choice choice--active" type="button" data-value="4x6">24 cards</button>
                <button class="choice" type="button" data-value="6x6">36 cards</button>
              </div>
            </div>

            <div class="settings-group">
              <label>Players</label>
              <div class="option-row" data-group="players">
                <button class="choice" type="button" data-value="1">1 Player</button>
                <button class="choice choice--active" type="button" data-value="2">2 Players</button>
              </div>
            </div>
          </div>

          <div class="settings-preview">
            <div class="settings-preview__topbar">
              <span class="score-tag score-tag--blue">Blue</span>
              <span class="score-tag score-tag--orange">Orange</span>
              <span class="current-player-label">Current player:</span>
              <button class="exit-button" type="button">Exit game</button>
            </div>

            <div class="settings-preview__board" aria-label="Selected theme preview">
              <div class="mini-card mini-card--teal" data-preview-card="0"></div>
              <div class="mini-card mini-card--light" data-preview-card="1"></div>
            </div>

            <div class="settings-preview__footer">
              <span>Game theme</span>
              <span class="footer-divider" aria-hidden="true"></span>
              <span>Player</span>
              <span class="footer-divider" aria-hidden="true"></span>
              <span>Board size</span>
              <button class="preview-start" type="button" data-action="begin-game">Start</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div class="page game-page" data-screen="game" aria-hidden="true">
    <header class="game-header">
      <div class="scoreboard" aria-live="polite">
        <div class="score-pill" data-score="Blue">
          <span class="score-label">Blue</span>
          <strong data-score-value="Blue">0</strong>
        </div>
        <div class="score-pill score-pill--active" data-score="Orange">
          <span class="score-label">Orange</span>
          <strong data-score-value="Orange">0</strong>
        </div>
        <div class="score-pill score-pill--player">
          <span class="score-label">Current Player</span>
          <strong data-current-player>Blue</strong>
        </div>
      </div>
      <button class="exit-button" type="button" data-action="exit-game">Exit Game</button>
    </header>

    <main class="game-shell">
      <div class="game-board-wrapper">
        <div class="game-board" data-board aria-label="Memory playing field"></div>
      </div>
    </main>

    <div class="exit-modal" data-exit-modal aria-hidden="true">
      <div class="exit-modal__card" role="dialog" aria-modal="true" aria-labelledby="exit-modal-title">
        <h2 id="exit-modal-title">Are you sure you want to quit<br />the game?</h2>
        <div class="exit-modal__actions">
          <button class="secondary-button" type="button" data-action="close-exit-modal">Back to game</button>
          <button class="outline-button" type="button" data-action="confirm-exit">Exit game</button>
        </div>
      </div>
    </div>
  </div>
`;
app.innerHTML = createGameMarkup();
const screens = document.querySelectorAll('.page');
const homeStartButton = document.querySelector('[data-action="start-game"]');
const beginGameButton = document.querySelector('[data-action="begin-game"]');
const exitGameButton = document.querySelector('.game-page [data-action="exit-game"]');
const exitModal = document.querySelector('[data-exit-modal]');
const closeExitModalButton = document.querySelector('[data-action="close-exit-modal"]');
const confirmExitButton = document.querySelector('[data-action="confirm-exit"]');
const boardElement = document.querySelector('[data-board]');
const currentPlayerLabel = document.querySelector('[data-current-player]');
const scoreValues = document.querySelectorAll('[data-score-value]');
const themePreviewCards = document.querySelectorAll('[data-preview-card]');
const setScreen = (screenName) => {
    screens.forEach((screen) => {
        const isVisible = screen.dataset.screen === screenName;
        screen.classList.toggle('is-visible', isVisible);
        screen.setAttribute('aria-hidden', String(!isVisible));
    });
};
const state = {
    playerColor: defaultSettings.playerColor,
    playerCount: defaultSettings.playerCount,
    boardSize: defaultSettings.boardSize,
    theme: defaultSettings.theme,
    currentPlayer: defaultSettings.playerColor,
    scores: {
        Blue: 0,
        Orange: 0
    },
    board: [],
    flipped: [],
    locked: false,
    matchedPairs: 0,
    isGameOver: false
};
const updateCurrentPlayerDisplay = () => {
    if (!currentPlayerLabel) {
        return;
    }
    currentPlayerLabel.textContent = state.playerCount === 1 ? 'Player 1' : state.currentPlayer;
    scoreValues.forEach((scoreValue) => {
        const playerName = scoreValue.dataset.scoreValue;
        if (!playerName) {
            return;
        }
        scoreValue.textContent = String(state.scores[playerName]);
    });
    document.querySelectorAll('[data-score]').forEach((score) => {
        const playerName = score.dataset.score;
        const shouldShow = state.playerCount === 2 || playerName === 'Blue';
        score.classList.toggle('is-hidden', !shouldShow);
        score.classList.toggle('score-pill--active', state.playerCount === 2 && playerName === state.currentPlayer);
    });
    const playerIndicator = document.querySelector('[data-score="Blue"]');
    if (state.playerCount === 1) {
        if (playerIndicator) {
            playerIndicator.classList.add('score-pill--active');
        }
        if (currentPlayerLabel) {
            currentPlayerLabel.textContent = 'Player 1';
        }
    }
};
const buildDeck = (theme, boardSize) => {
    const { rows, cols } = getBoardDimensions(boardSize);
    const pairsNeeded = (rows * cols) / 2;
    const assetPool = themeAssets[theme];
    const pairValues = [];
    for (let index = 0; index < pairsNeeded; index += 1) {
        const asset = assetPool[index % assetPool.length];
        pairValues.push(asset);
    }
    const deck = [];
    pairValues.forEach((asset, index) => {
        deck.push({
            id: `${asset}-${index}-a`,
            value: asset,
            image: asset,
            matched: false
        });
        deck.push({
            id: `${asset}-${index}-b`,
            value: asset,
            image: asset,
            matched: false
        });
    });
    return shuffle(deck);
};
const renderBoard = () => {
    if (!boardElement) {
        return;
    }
    const { cols } = getBoardDimensions(state.boardSize);
    boardElement.style.setProperty('--board-columns', String(cols));
    boardElement.innerHTML = '';
    state.board.forEach((card, index) => {
        const cardButton = document.createElement('button');
        const isFlipped = state.flipped.includes(index) || card.matched;
        cardButton.type = 'button';
        cardButton.className = `memory-card ${isFlipped ? 'is-flipped' : ''} ${card.matched ? 'is-matched' : ''}`;
        cardButton.dataset.index = String(index);
        cardButton.setAttribute('aria-label', `Memory card ${index + 1}`);
        cardButton.disabled = state.locked || card.matched;
        cardButton.innerHTML = `
      <span class="memory-card__inner">
        <span class="memory-card__face memory-card__back" style="background-image: url('${card.image}')"></span>
        <span class="memory-card__face memory-card__front" style="background-image: url('${card.image}')"></span>
      </span>
    `;
        cardButton.addEventListener('click', () => {
            if (state.locked || state.isGameOver || card.matched || state.flipped.includes(index)) {
                return;
            }
            state.flipped.push(index);
            renderBoard();
            if (state.flipped.length === 2) {
                state.locked = true;
                const [firstIndex, secondIndex] = state.flipped;
                const firstCard = state.board[firstIndex];
                const secondCard = state.board[secondIndex];
                if (firstCard.value === secondCard.value) {
                    state.board[firstIndex].matched = true;
                    state.board[secondIndex].matched = true;
                    state.scores[state.currentPlayer] += 1;
                    state.matchedPairs += 1;
                    state.flipped = [];
                    state.locked = false;
                    updateCurrentPlayerDisplay();
                    renderBoard();
                    if (state.matchedPairs === state.board.length / 2) {
                        state.isGameOver = true;
                        setTimeout(() => {
                            const overlay = document.createElement('div');
                            overlay.className = 'game-over-modal';
                            const isDraw = state.playerCount === 2 && state.scores.Blue === state.scores.Orange;
                            const winner = state.scores.Blue > state.scores.Orange ? 'Blue' : 'Orange';
                            const resultTitle = state.playerCount === 1
                                ? 'Game over'
                                : isDraw
                                    ? 'It’s a draw'
                                    : 'The winner is';
                            const resultName = state.playerCount === 1
                                ? 'Game over'
                                : isDraw
                                    ? ''
                                    : `${winner} player`;
                            const resultVisual = isDraw
                                ? `<svg class="result-visual result-visual--draw" viewBox="0 0 180 180" aria-hidden="true"><path d="M90 36v92M38 58h104M90 58l-22 35m22-35 22 35M52 94c0 13 10 23 23 23s23-10 23-23H52Zm53 0c0 13 10 23 23 23s23-10 23-23h-46ZM72 140h36c0 9-8 16-18 16s-18-7-18-16Zm-12 16h60" /></svg>`
                                : `<svg class="result-visual result-visual--${winner.toLowerCase()}" viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="43" r="24"/><path d="M63 78h54M72 75c-4 30-17 47-34 59v19h104v-19c-17-12-30-29-34-59"/></svg>`;
                            const scoreMarkup = state.playerCount === 1
                                ? `<span class="score-chip score-chip--blue">Player 1: ${state.scores.Blue}</span>`
                                : `<span class="score-chip score-chip--blue">Blue ${state.scores.Blue}</span><span class="score-chip score-chip--orange">Orange ${state.scores.Orange}</span>`;
                            overlay.innerHTML = `
                <div class="game-over-card">
                  <div class="confetti" aria-hidden="true"></div>
                  <p class="game-over-label">${resultTitle}</p>
                  <h3 class="${isDraw ? 'is-draw' : ''}">${resultName}</h3>
                  ${resultVisual}
                  <p class="game-over-label">Final score</p>
                  <div class="game-over-scores">
                    ${scoreMarkup}
                  </div>
                  <button class="primary-button" type="button" data-action="restart-game">Back to start</button>
                </div>
              `;
                            overlay.querySelector('[data-action="restart-game"]')?.addEventListener('click', () => {
                                setScreen('home');
                            });
                            boardElement.appendChild(overlay);
                        }, 350);
                    }
                    return;
                }
                window.setTimeout(() => {
                    state.flipped = [];
                    if (state.playerCount === 2) {
                        state.currentPlayer = state.currentPlayer === 'Blue' ? 'Orange' : 'Blue';
                    }
                    state.locked = false;
                    updateCurrentPlayerDisplay();
                    renderBoard();
                }, 700);
            }
        });
        boardElement.appendChild(cardButton);
    });
};
const startNewGame = () => {
    const playerColor = readSelectedOption('color') ?? defaultSettings.playerColor;
    const playerCountRaw = Number(readSelectedOption('players') ?? String(defaultSettings.playerCount));
    const boardSize = readSelectedOption('board-size') ?? defaultSettings.boardSize;
    const theme = readSelectedOption('theme') ?? defaultSettings.theme;
    const playerCount = (playerCountRaw === 1 ? 1 : 2);
    state.playerColor = playerColor;
    state.playerCount = playerCount;
    state.boardSize = boardSize;
    state.theme = theme;
    state.currentPlayer = playerColor;
    state.scores = { Blue: 0, Orange: 0 };
    state.board = buildDeck(theme, boardSize);
    state.flipped = [];
    state.locked = false;
    state.matchedPairs = 0;
    state.isGameOver = false;
    updateCurrentPlayerDisplay();
    renderBoard();
    setScreen('game');
};
homeStartButton?.addEventListener('click', () => {
    setScreen('settings');
});
beginGameButton?.addEventListener('click', () => {
    const selectedTheme = readSelectedOption('theme') ?? defaultSettings.theme;
    applyTheme(selectedTheme);
    startNewGame();
});
exitGameButton?.addEventListener('click', () => {
    exitModal?.classList.add('is-visible');
    exitModal?.setAttribute('aria-hidden', 'false');
});
closeExitModalButton?.addEventListener('click', () => {
    exitModal?.classList.remove('is-visible');
    exitModal?.setAttribute('aria-hidden', 'true');
});
confirmExitButton?.addEventListener('click', () => {
    exitModal?.classList.remove('is-visible');
    exitModal?.setAttribute('aria-hidden', 'true');
    setScreen('home');
});
document.querySelectorAll('.choice').forEach((button) => {
    button.addEventListener('click', () => {
        const group = button.closest('.option-row');
        if (!group) {
            return;
        }
        group.querySelectorAll('.choice').forEach((choice) => {
            choice.classList.toggle('choice--active', choice === button);
        });
        if (group.dataset.group === 'theme') {
            const selectedTheme = button.dataset.value ?? defaultSettings.theme;
            applyTheme(selectedTheme);
        }
    });
});
applyTheme(defaultSettings.theme);
updateCurrentPlayerDisplay();
