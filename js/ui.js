// UI rendering for Chordie 初弦 — flashcard, song snippets, navigation

/**
 * Render the chord list grid (home view)
 * @param {function} onChordSelect - callback(chordIndex)
 */
function renderChordList(onChordSelect) {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const completedCount = getCompletedCount();

  // Header
  const header = document.createElement('header');
  header.className = 'home-header';
  header.innerHTML = `
    <img src="img/logo.png" alt="Chordie 初弦" class="app-logo">
    <h1 class="app-title">Chordie <span class="app-subtitle">初弦</span></h1>
    <p class="app-tagline">每天一个和弦，串起青春</p>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${(completedCount / 30 * 100).toFixed(1)}%"></div>
      <span class="progress-text">${completedCount} / 30</span>
    </div>
  `;
  app.appendChild(header);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'chord-grid';

  CHORDS.forEach((chord, index) => {
    const card = document.createElement('div');
    const unlocked = isUnlocked(index);
    const completed = isCompleted(index);
    let cls = 'chord-card';
    if (completed) cls += ' completed';
    else if (unlocked) cls += ' unlocked';
    else cls += ' locked';
    card.className = cls;
    card.innerHTML = `
      <div class="chord-day">${completed ? '&#127852;' : 'Day ' + chord.day}</div>
      <div class="chord-name">${unlocked ? chord.name : '?'}</div>
      <div class="chord-type">${unlocked ? chord.type : '未解锁'}</div>
    `;
    if (unlocked) {
      card.addEventListener('click', () => onChordSelect(index));
    }
    grid.appendChild(card);
  });

  app.appendChild(grid);
}

/**
 * Render the chord detail view (flashcard + piano + songs)
 * @param {object} chord - chord data object
 * @param {function} onBack - callback to go back to list
 * @param {function} onComplete - callback when user marks as learned
 */
function renderChordDetail(chord, onBack, onComplete) {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const index = chord.day - 1;
  const alreadyDone = isCompleted(index);

  // Top bar with back button
  const topBar = document.createElement('div');
  topBar.className = 'detail-topbar';
  topBar.innerHTML = `
    <button class="back-btn" aria-label="Back to chord list">&larr; 返回</button>
    <span class="detail-day">Day ${chord.day}</span>
  `;
  topBar.querySelector('.back-btn').addEventListener('click', onBack);
  app.appendChild(topBar);

  // Flashcard
  const flashcard = document.createElement('div');
  flashcard.className = 'flashcard';
  flashcard.innerHTML = `
    <div class="flashcard-header">
      <h2 class="flashcard-name">${chord.name}</h2>
      <span class="flashcard-type">${chord.type}</span>
    </div>
    <div class="flashcard-notes">
      ${chord.notes.map(n => `<span class="note-badge">${n} ${noteToJianpu(n)}</span>`).join('')}
    </div>
    <p class="flashcard-desc">${chord.description}</p>
  `;
  app.appendChild(flashcard);

  // Play buttons
  const controls = document.createElement('div');
  controls.className = 'play-controls';
  controls.innerHTML = `
    <button class="play-btn play-chord-btn">&#9654; 弹奏和弦</button>
    <button class="play-btn play-arpeggio-btn">&#9835; 琶音</button>
  `;
  controls.querySelector('.play-chord-btn').addEventListener('click', () => {
    playChord(chord.notes);
    animateButton(controls.querySelector('.play-chord-btn'));
  });
  controls.querySelector('.play-arpeggio-btn').addEventListener('click', () => {
    playArpeggio(chord.notes);
    animateButton(controls.querySelector('.play-arpeggio-btn'));
  });
  app.appendChild(controls);

  // Piano
  const pianoContainer = document.createElement('div');
  pianoContainer.id = 'piano';
  app.appendChild(pianoContainer);
  renderPiano(pianoContainer, chord.notes);

  // Mark as learned button
  const learnSection = document.createElement('div');
  learnSection.className = 'learn-section';
  if (alreadyDone) {
    learnSection.innerHTML = `<div class="learned-badge">&#127852; 已学会</div>`;
  } else {
    learnSection.innerHTML = `<button class="learn-btn">&#127852; 我学会了！</button>`;
    learnSection.querySelector('.learn-btn').addEventListener('click', () => {
      onComplete();
      // Replace button with badge
      learnSection.innerHTML = `<div class="learned-badge pop">&#127852; 已学会</div>`;
      // Launch candy rain
      spawnCandyRain();
    });
  }
  app.appendChild(learnSection);

  // Songs section
  const songsSection = document.createElement('div');
  songsSection.className = 'songs-section';
  songsSection.innerHTML = `<h3 class="songs-title">&#127925; 出现在这些华语歌曲中</h3>`;

  chord.songs.forEach(song => {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';

    const infoRow = document.createElement('div');
    infoRow.className = 'song-info';
    infoRow.innerHTML = `
      <span class="song-title">${song.title}</span>
      <span class="song-artist">${song.artist}</span>
    `;
    songCard.appendChild(infoRow);

    if (song.lyric) {
      const lyricEl = document.createElement('p');
      lyricEl.className = 'song-lyric';
      lyricEl.textContent = song.lyric;
      songCard.appendChild(lyricEl);
    }

    const progRow = document.createElement('div');
    progRow.className = 'chord-progression';
    song.chordProgression.forEach((c, ci) => {
      if (ci > 0) {
        const arrow = document.createElement('span');
        arrow.className = 'prog-arrow';
        arrow.textContent = '\u2192';
        progRow.appendChild(arrow);
      }
      const chip = document.createElement('span');
      chip.className = 'prog-chord' + (c === chord.name ? ' current' : '');
      chip.textContent = c;
      chip.dataset.chord = c;
      progRow.appendChild(chip);
    });
    songCard.appendChild(progRow);

    // Play progression button
    const playBtn = document.createElement('button');
    playBtn.className = 'prog-play-btn';
    playBtn.innerHTML = '&#9654; 试听和弦进行';
    let playing = false;

    playBtn.addEventListener('click', () => {
      if (playing) {
        stopProgression();
        playing = false;
        playBtn.innerHTML = '&#9654; 试听和弦进行';
        playBtn.classList.remove('active');
        progRow.querySelectorAll('.prog-chord').forEach(el => el.classList.remove('now-playing'));
        return;
      }
      playing = true;
      playBtn.innerHTML = '&#9632; 停止';
      playBtn.classList.add('active');

      playProgression(song.chordProgression, {
        beat: 750,
        loops: 2,
        onChord(name, i) {
          progRow.querySelectorAll('.prog-chord').forEach(el => el.classList.remove('now-playing'));
          const idx = i % song.chordProgression.length;
          const chips = progRow.querySelectorAll('.prog-chord');
          if (chips[idx]) chips[idx].classList.add('now-playing');
        },
        onDone() {
          playing = false;
          playBtn.innerHTML = '&#9654; 试听和弦进行';
          playBtn.classList.remove('active');
          progRow.querySelectorAll('.prog-chord').forEach(el => el.classList.remove('now-playing'));
        }
      });
    });
    songCard.appendChild(playBtn);

    songsSection.appendChild(songCard);
  });

  app.appendChild(songsSection);

  // Scroll to top
  window.scrollTo(0, 0);
}

function animateButton(btn) {
  btn.classList.add('playing');
  setTimeout(() => btn.classList.remove('playing'), 300);
}

/**
 * Spawn candy rain celebration
 */
function spawnCandyRain() {
  const candies = ['&#127852;', '&#127853;', '&#127856;', '&#127851;', '&#11088;', '&#127881;'];
  const container = document.createElement('div');
  container.className = 'candy-rain';
  document.body.appendChild(container);

  for (let i = 0; i < 30; i++) {
    const candy = document.createElement('div');
    candy.className = 'candy';
    candy.innerHTML = candies[Math.floor(Math.random() * candies.length)];
    candy.style.left = Math.random() * 100 + '%';
    candy.style.animationDelay = Math.random() * 0.6 + 's';
    candy.style.animationDuration = (1.2 + Math.random() * 1) + 's';
    candy.style.fontSize = (18 + Math.random() * 16) + 'px';
    container.appendChild(candy);
  }

  setTimeout(() => container.remove(), 2500);
}
