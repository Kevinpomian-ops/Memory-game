type PlayerColor = 'Blue' | 'Orange';
type PlayerCount = 1 | 2;
type BoardSize = '4x4' | '4x6' | '6x6';
type ThemeName = 'Coding Vibes' | 'Food' | 'DA Projects';

type GameCard = {
  id: string;
  value: string;
  image: string;
  matched: boolean;
};

type GameState = {
  playerColor: PlayerColor;
  playerCount: PlayerCount;
  boardSize: BoardSize;
  theme: ThemeName;
  currentPlayer: PlayerColor;
  scores: Record<PlayerColor, number>;
  board: GameCard[];
  flipped: number[];
  locked: boolean;
  matchedPairs: number;
  isGameOver: boolean;
};

const app = document.querySelector('#app');

if (!app) {
  throw new Error('App root not found');
}

const themeAssets: Record<ThemeName, string[]> = {
  'Coding Vibes': [
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-1.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-2.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-3.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-4.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-5.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-6.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-7.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-8.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-9.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-10.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-11.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-12.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-13.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-14.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-15.svg',
    '/assets/code_vibe_theme/cards/Property%201=Component%2022-16.svg'
  ],
  Food: [
    '/assets/food_theme/card/Property%201=Component%203-1.svg',
    '/assets/food_theme/card/Property%201=Component%203-2.svg',
    '/assets/food_theme/card/Property%201=Component%203-3.svg',
    '/assets/food_theme/card/Property%201=Component%203-4.svg',
    '/assets/food_theme/card/Property%201=Component%203-5.svg',
    '/assets/food_theme/card/Property%201=Component%203-6.svg',
    '/assets/food_theme/card/Property%201=Component%203-7.svg',
    '/assets/food_theme/card/Property%201=Component%203-8.svg',
    '/assets/food_theme/card/Property%201=Component%203-9.svg',
    '/assets/food_theme/card/Property%201=Component%203-10.svg',
    '/assets/food_theme/card/Property%201=Component%203-11.svg',
    '/assets/food_theme/card/Property%201=Component%203-12.svg',
    '/assets/food_theme/card/Property%201=Component%203-13.svg',
    '/assets/food_theme/card/Property%201=Component%203-14.svg',
    '/assets/food_theme/card/Property%201=Component%203-15.svg',
    '/assets/food_theme/card/Property%201=Component%203-16.svg'
  ],
  'DA Projects': [
    '/assets/da_projects_theme/card/Property%201=Component%202-1.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-2.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-3.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-4.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-5.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-6.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-7.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-8.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-9.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-10.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-11.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-12.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-13.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-14.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-15.svg',
    '/assets/da_projects_theme/card/Property%201=Component%202-16.svg'
  ]
};

const themePalette: Record<ThemeName, Record<string, string>> = {
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
    '--card-glow': 'rgba(76, 148, 255, 0.25)'
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
    '--card-glow': 'rgba(255, 183, 76, 0.25)'
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
    '--card-glow': 'rgba(99, 217, 255, 0.22)'
  }
};

const defaultSettings = {
  playerColor: 'Blue' as PlayerColor,
  playerCount: 2 as PlayerCount,
  boardSize: '4x6' as BoardSize,
  theme: 'Coding Vibes' as ThemeName
};

const getBoardDimensions = (boardSize: BoardSize) => {
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

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const readSelectedOption = (groupName: string) => {
  const group = document.querySelector<HTMLDivElement>(`[data-group="${groupName}"]`);
  const selected = group?.querySelector<HTMLButtonElement>('.choice--active');

  return (selected?.dataset.value ?? undefined) as string | undefined;
};

const applyTheme = (theme: ThemeName) => {
  const root = document.documentElement;
  const palette = themePalette[theme];

  Object.entries(palette).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

const createGameMarkup = () => `
  <div class="page home-page is-visible" data-screen="home">
    <header class="topbar">
      <div class="brand-mark" aria-label="Memory game brand">
        <span class="brand-mark__dot"></span>
        <span class="brand-mark__dot"></span>
        <span class="brand-mark__dot"></span>
      </div>
    </header>

    <main class="home-screen">
      <div class="home-screen__content">
        <div class="controller-card">
          <img src="/assets/stadia_controller.svg" alt="Controller" class="controller-card__image" />
        </div>

        <div class="home-screen__copy">
          <p class="eyebrow">MEMORY</p>
          <h1>Developer <span>Academy</span></h1>
          <button class="play-button" type="button" data-action="start-game">
            Start / Play
          </button>
        </div>
      </div>
    </main>
  </div>

  <div class="page settings-page" data-screen="settings" aria-hidden="true">
    <main class="settings-screen">
      <div class="settings-panel">
        <h2>Settings</h2>

        <div class="settings-group">
          <label>Players</label>
          <div class="option-row" data-group="players">
            <button class="choice" type="button" data-value="1">1 Player</button>
            <button class="choice choice--active" type="button" data-value="2">2 Players</button>
          </div>
        </div>

        <div class="settings-group">
          <label>Player 1 Color</label>
          <div class="option-row" data-group="color">
            <button class="choice choice--active" type="button" data-value="Blue">Blue</button>
            <button class="choice" type="button" data-value="Orange">Orange</button>
          </div>
        </div>

        <div class="settings-group">
          <label>Board Size</label>
          <div class="option-row" data-group="board-size">
            <button class="choice" type="button" data-value="4x4">4x4</button>
            <button class="choice choice--active" type="button" data-value="4x6">4x6</button>
            <button class="choice" type="button" data-value="6x6">6x6</button>
          </div>
        </div>

        <div class="settings-group">
          <label>Theme</label>
          <div class="option-row" data-group="theme">
            <button class="choice choice--active" type="button" data-value="Coding Vibes">Coding Vibes</button>
            <button class="choice" type="button" data-value="Food">Food</button>
            <button class="choice" type="button" data-value="DA Projects">DA Projects</button>
          </div>
        </div>

        <button class="primary-button" type="button" data-action="begin-game">
          Start Game
        </button>
      </div>
    </main>
  </div>

  <div class="page game-page" data-screen="game" aria-hidden="true">
    <header class="game-header">
      <button class="exit-button" type="button" data-action="exit-game">Exit Game</button>

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
    </header>

    <main class="game-shell">
      <div class="game-board-wrapper">
        <div class="game-board" data-board aria-label="Memory playing field"></div>
      </div>
    </main>
  </div>
`;

app.innerHTML = createGameMarkup();

const screens = document.querySelectorAll<HTMLElement>('.page');
const homeStartButton = document.querySelector<HTMLButtonElement>('[data-action="start-game"]');
const beginGameButton = document.querySelector<HTMLButtonElement>('[data-action="begin-game"]');
const exitGameButton = document.querySelector<HTMLButtonElement>('[data-action="exit-game"]');
const boardElement = document.querySelector<HTMLElement>('[data-board]');
const currentPlayerLabel = document.querySelector<HTMLElement>('[data-current-player]');
const scoreValues = document.querySelectorAll<HTMLElement>('[data-score-value]');

const setScreen = (screenName: 'home' | 'settings' | 'game') => {
  screens.forEach((screen) => {
    const isVisible = screen.dataset.screen === screenName;
    screen.classList.toggle('is-visible', isVisible);
    screen.setAttribute('aria-hidden', String(!isVisible));
  });
};

const state: GameState = {
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

    scoreValue.textContent = String(state.scores[playerName as PlayerColor]);
  });

  document.querySelectorAll<HTMLElement>('[data-score]').forEach((score) => {
    const playerName = score.dataset.score as PlayerColor;
    const shouldShow = state.playerCount === 2 || playerName === 'Blue';
    score.classList.toggle('is-hidden', !shouldShow);
    score.classList.toggle('score-pill--active', state.playerCount === 2 && playerName === state.currentPlayer);
  });

  const playerIndicator = document.querySelector<HTMLElement>('[data-score="Blue"]');
  if (state.playerCount === 1) {
    if (playerIndicator) {
      playerIndicator.classList.add('score-pill--active');
    }
    if (currentPlayerLabel) {
      currentPlayerLabel.textContent = 'Player 1';
    }
  }
};

const buildDeck = (theme: ThemeName, boardSize: BoardSize) => {
  const { rows, cols } = getBoardDimensions(boardSize);
  const pairsNeeded = (rows * cols) / 2;
  const assetPool = themeAssets[theme];
  const pairValues: string[] = [];

  for (let index = 0; index < pairsNeeded; index += 1) {
    const asset = assetPool[index % assetPool.length];
    pairValues.push(asset);
  }

  const deck: GameCard[] = [];

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
        <span class="memory-card__face memory-card__back"></span>
        <span class="memory-card__face memory-card__front">
          <img src="${card.image}" alt="Memory card illustration" class="memory-card__image" />
        </span>
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
              const winner = Object.entries(state.scores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA)[0][0];
              const overlay = document.createElement('div');
              overlay.className = 'game-over-modal';
              const gameOverLabel = state.playerCount === 1 ? 'Player 1' : winner;
              const scoreMarkup = state.playerCount === 1
                ? `<span>Player 1: ${state.scores.Blue}</span>`
                : `<span>Blue: ${state.scores.Blue}</span><span>Orange: ${state.scores.Orange}</span>`;

              overlay.innerHTML = `
                <div class="game-over-card">
                  <p class="game-over-label">Game Over</p>
                  <h3>Winner: ${gameOverLabel}</h3>
                  <div class="game-over-scores">
                    ${scoreMarkup}
                  </div>
                  <button class="primary-button" type="button" data-action="restart-game">Play Again</button>
                </div>
              `;

              overlay.querySelector<HTMLButtonElement>('[data-action="restart-game"]')?.addEventListener('click', () => {
                startNewGame();
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
  const playerColor = (readSelectedOption('color') as PlayerColor | undefined) ?? defaultSettings.playerColor;
  const playerCountRaw = Number(readSelectedOption('players') ?? String(defaultSettings.playerCount));
  const boardSize = (readSelectedOption('board-size') as BoardSize | undefined) ?? defaultSettings.boardSize;
  const theme = (readSelectedOption('theme') as ThemeName | undefined) ?? defaultSettings.theme;
  const playerCount = (playerCountRaw === 1 ? 1 : 2) as PlayerCount;

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
  const selectedTheme = (readSelectedOption('theme') as ThemeName | undefined) ?? defaultSettings.theme;
  applyTheme(selectedTheme);
  startNewGame();
});

exitGameButton?.addEventListener('click', () => {
  setScreen('home');
});

document.querySelectorAll<HTMLButtonElement>('.choice').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.closest('.option-row') as HTMLElement | null;
    if (!group) {
      return;
    }

    group.querySelectorAll<HTMLButtonElement>('.choice').forEach((choice) => {
      choice.classList.toggle('choice--active', choice === button);
    });

    if (group.dataset.group === 'theme') {
      const selectedTheme = (button.dataset.value as ThemeName | undefined) ?? defaultSettings.theme;
      applyTheme(selectedTheme);
    }
  });
});

applyTheme(defaultSettings.theme);
updateCurrentPlayerDisplay();
