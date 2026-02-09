// Piano keyboard rendering and Web Audio playback for Chordie 初弦

let audioCtx = null;
let _audioReady = false;

// Debug overlay for diagnosing iOS audio issues (temporary)
let _debugEl = null;
function _debugLog(msg) {
  if (!_debugEl) {
    _debugEl = document.createElement('div');
    _debugEl.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,0.85);color:#0f0;font:12px monospace;padding:8px;max-height:30vh;overflow:auto;z-index:99999;';
    document.body.appendChild(_debugEl);
  }
  _debugEl.innerHTML += msg + '<br>';
  _debugEl.scrollTop = _debugEl.scrollHeight;
}

// iOS Safari silently mutes an AudioContext that was created outside a user
// gesture, even after resume() reports 'running'. The only reliable fix is
// to create a *new* AudioContext synchronously inside a user gesture and
// immediately produce output on it.
function _unlockAudio() {
  _debugLog('gesture: ' + (event ? event.type : '?'));

  // If we already have a working context, we're done
  if (_audioReady) return;

  // Close any existing (silently muted) context
  if (audioCtx) {
    try { audioCtx.close(); } catch (e) {}
    audioCtx = null;
    _debugLog('closed old ctx');
  }

  // Create a fresh context inside this gesture
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  _debugLog('new ctx, state: ' + audioCtx.state);

  // On iOS the new context may still start suspended — resume it
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Play a short audible test tone (very brief, low volume) to force iOS
  // to actually route audio output
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.05);
    _debugLog('test tone scheduled');
  } catch (e) { _debugLog('test tone err: ' + e.message); }

  // Check state after a short delay (resume is async on iOS)
  setTimeout(() => {
    _debugLog('after delay, state: ' + (audioCtx ? audioCtx.state : 'null'));
    if (audioCtx && audioCtx.state === 'running') {
      _audioReady = true;
      _debugLog('AUDIO READY');
      document.removeEventListener('touchstart', _unlockAudio, true);
      document.removeEventListener('touchend', _unlockAudio, true);
      document.removeEventListener('click', _unlockAudio, true);
    }
  }, 100);
}
document.addEventListener('touchstart', _unlockAudio, true);
document.addEventListener('touchend', _unlockAudio, true);
document.addEventListener('click', _unlockAudio, true);

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Internal: schedule oscillators on a running context
 */
function _scheduleNote(ctx, noteName, duration, startDelay) {
  const freq = NOTE_FREQUENCIES[noteName];
  if (!freq) return;

  const now = ctx.currentTime + startDelay;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);

  // ADSR envelope
  const attack = 0.005;
  const decay = 0.15;
  const sustainLevel = 0.3;
  const release = duration * 0.6;

  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.4, now + attack);
  masterGain.gain.linearRampToValueAtTime(sustainLevel, now + attack + decay);
  masterGain.gain.setValueAtTime(sustainLevel, now + duration - release);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  masterGain.gain.setValueAtTime(0, now + duration + 0.01);

  // Harmonics for richer tone
  const harmonics = [
    { ratio: 1, gain: 1.0 },
    { ratio: 2, gain: 0.5 },
    { ratio: 3, gain: 0.15 },
    { ratio: 4, gain: 0.05 },
  ];

  harmonics.forEach(h => {
    const osc = ctx.createOscillator();
    const hGain = ctx.createGain();
    hGain.gain.setValueAtTime(h.gain * 0.15, now);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * h.ratio, now);
    if (h.ratio > 1) {
      osc.detune.setValueAtTime(Math.random() * 4 - 2, now);
    }
    osc.connect(hGain);
    hGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  });
  _debugLog('note ' + noteName + ' scheduled, ctx.state=' + ctx.state + ', time=' + now.toFixed(2));
}

/**
 * Play a single note — waits for AudioContext to be running before scheduling
 * @param {string} noteName - e.g. 'C4'
 * @param {number} duration - in seconds
 * @param {number} startDelay - delay before note starts (seconds)
 */
function playNote(noteName, duration = 1.2, startDelay = 0) {
  const ctx = getAudioContext();
  _debugLog('playNote(' + noteName + ') ctx.state=' + ctx.state);

  if (ctx.state === 'running') {
    _scheduleNote(ctx, noteName, duration, startDelay);
  } else {
    // Context not ready yet — wait for it, then play
    ctx.resume().then(() => {
      _debugLog('playNote resume resolved, state=' + ctx.state);
      _scheduleNote(ctx, noteName, duration, startDelay);
    });
  }
}

/**
 * Play all notes of a chord simultaneously
 * @param {string[]} notes - array of note names
 */
function playChord(notes) {
  notes.forEach(note => playNote(note, 1.8, 0));
}

/**
 * Play chord notes as an arpeggio (one after another)
 * @param {string[]} notes
 */
function playArpeggio(notes) {
  notes.forEach((note, i) => playNote(note, 1.2, i * 0.12));
}

/** Currently running progression timer IDs */
let _progTimers = [];

/**
 * Stop any currently playing progression
 */
function stopProgression() {
  _progTimers.forEach(id => clearTimeout(id));
  _progTimers = [];
}

/**
 * Play a chord progression sequence using the synth.
 * Each chord plays for `beat` ms, looping `loops` times.
 * @param {string[]} chordNames - e.g. ['C', 'G', 'Am', 'F']
 * @param {object} opts
 * @param {number} opts.beat - ms per chord (default 700)
 * @param {number} opts.loops - how many times to loop (default 2)
 * @param {function} opts.onChord - callback(chordName, index) when each chord plays
 * @param {function} opts.onDone - callback when finished
 */
function playProgression(chordNames, opts = {}) {
  stopProgression();
  const beat = opts.beat || 700;
  const loops = opts.loops || 2;
  const onChord = opts.onChord || (() => {});
  const onDone = opts.onDone || (() => {});

  const sequence = [];
  for (let l = 0; l < loops; l++) {
    chordNames.forEach(name => sequence.push(name));
  }

  sequence.forEach((name, i) => {
    const tid = setTimeout(() => {
      const notes = CHORD_NOTES[name];
      if (notes) {
        notes.forEach(n => playNote(n, beat / 1000 * 0.9, 0));
      }
      onChord(name, i);
    }, i * beat);
    _progTimers.push(tid);
  });

  // Done callback
  const doneId = setTimeout(() => {
    onDone();
    _progTimers = [];
  }, sequence.length * beat);
  _progTimers.push(doneId);
}

/**
 * Render the 2-octave piano keyboard into a container element
 * @param {HTMLElement} container
 * @param {string[]} highlightNotes - notes to highlight
 * @returns {{ setHighlight: function }}
 */
function renderPiano(container, highlightNotes = []) {
  container.innerHTML = '';
  container.classList.add('piano-container');

  const keyboard = document.createElement('div');
  keyboard.className = 'piano-keyboard';

  // Normalize highlight notes (handle enharmonic equivalents)
  const normalizedHighlight = normalizeNotes(highlightNotes);

  // Count white keys for sizing
  const whiteKeys = PIANO_KEYS.filter(k => k.type === 'white');
  const whiteKeyCount = whiteKeys.length;

  // Build white keys first, then overlay black keys
  const whiteKeyElements = [];
  const blackKeyElements = [];

  let whiteIndex = 0;

  PIANO_KEYS.forEach((keyData, i) => {
    const key = document.createElement('div');
    const isHighlighted = normalizedHighlight.includes(normalizeNoteName(keyData.note));

    if (keyData.type === 'white') {
      key.className = 'piano-key white-key' + (isHighlighted ? ' highlighted' : '');
      key.dataset.note = keyData.note;
      key.style.left = (whiteIndex / whiteKeyCount * 100) + '%';
      key.style.width = (1 / whiteKeyCount * 100) + '%';

      // Note label with jianpu
      const label = document.createElement('span');
      label.className = 'key-label';
      label.innerHTML = '<span class="key-note-name">' + keyData.note + '</span><span class="key-jianpu">' + noteToJianpuText(keyData.note) + '</span>';
      key.appendChild(label);

      whiteKeyElements.push(key);
      whiteIndex++;
    } else {
      key.className = 'piano-key black-key' + (isHighlighted ? ' highlighted' : '');
      key.dataset.note = keyData.note;
      // Position black key between previous and next white key
      const bkWidth = (1 / whiteKeyCount * 100) * 0.58;
      key.style.left = ((whiteIndex - 1) / whiteKeyCount * 100 + (1 / whiteKeyCount * 100) - bkWidth / 2) + '%';
      key.style.width = bkWidth + '%';

      blackKeyElements.push(key);
    }

    // Touch and click handler — use touchstart/touchend for iOS compatibility,
    // with pointerdown/pointerup fallback for desktop
    let _touched = false;
    const startNote = (e) => {
      e.preventDefault();
      key.classList.add('active');
      playNote(keyData.note, 0.8);
    };
    const endNote = (e) => {
      e.preventDefault();
      key.classList.remove('active');
    };

    key.addEventListener('touchstart', (e) => { _touched = true; startNote(e); }, { passive: false });
    key.addEventListener('touchend', (e) => { endNote(e); setTimeout(() => { _touched = false; }, 50); }, { passive: false });
    key.addEventListener('pointerdown', (e) => { if (!_touched) startNote(e); });
    key.addEventListener('pointerup', (e) => { if (!_touched) endNote(e); });
    key.addEventListener('pointerleave', endNote);
  });

  // Append white keys first, then black keys on top
  whiteKeyElements.forEach(k => keyboard.appendChild(k));
  blackKeyElements.forEach(k => keyboard.appendChild(k));

  container.appendChild(keyboard);

  return {
    setHighlight(notes) {
      const norm = normalizeNotes(notes);
      keyboard.querySelectorAll('.piano-key').forEach(el => {
        const isHL = norm.includes(normalizeNoteName(el.dataset.note));
        el.classList.toggle('highlighted', isHL);
      });
    }
  };
}

/**
 * Normalize a note name to handle enharmonic equivalents
 * Maps flats to sharps internally for comparison
 */
function normalizeNoteName(note) {
  // Return as-is, but also handle Db→C#, Eb→D#, etc.
  const flatToSharp = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  };
  for (const [flat, sharp] of Object.entries(flatToSharp)) {
    if (note.startsWith(flat)) {
      return sharp + note.slice(flat.length);
    }
  }
  return note;
}

function normalizeNotes(notes) {
  return notes.map(normalizeNoteName);
}
