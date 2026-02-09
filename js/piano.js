// Piano keyboard rendering and Web Audio playback for Chordie 初弦

let audioCtx = null;

// iOS Safari requires both an <audio> element play and AudioContext.resume()
// inside a user gesture to enable Web Audio output. The <audio> element also
// switches the audio session so sound plays even when the mute switch is on.
const _silentDataURI = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYoRBRIAAAAAAD/+1DEAAAHAAGf9AAAIiWJa/PJEBBAEAwDBmTAABh4PkDgfUBAMOD6gIBj5/+XB9QEAx8H1AQDDg+oCAfKAgQ+D6g4Hw+oCABZBwfNAQAAAAUdBx0AAAD/TgEA04cH0IODBANP/5cHygIBhwfUBAP/+XB8oCAfKAEGH1A4P/Lg+oCAYcH//KAgGHB9QEA//5cHygIB8oCAYf/8uD5QEA+UBAMP/+sA+oCAYcH1AQD//lwfUBAPlACD/6wD6gIB8oCAYf/8uD5QEAw4PqAgH/Lg+UBAPl//7UMQfAAADSAAAAAAAAANIAAAAACAYf/8uD5QEA+UBAMP/+XB9QEAw4PqAgH//KAgGHB9QEA//5QEAw//1gH1A4Hw4PqAgH//lwfKAgHygIBh//y4PlAQD5QEAw//1gH1AQD5QEAw//5cHygIB8oCAYf/8uD5QEA+UBAMP/+sA+oCAfKAgGH//Lg+UBAP/+1DEGwAAA0gAAAAAAAAADSAAAAAAKAgGH//Lg+UBAPl';
const _silentAudio = document.createElement('audio');
_silentAudio.controls = false;
_silentAudio.preload = 'auto';
_silentAudio.loop = false;
_silentAudio.src = _silentDataURI;

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

function _unlockAudio() {
  _debugLog('gesture detected, event: ' + (event ? event.type : 'unknown'));
  // Play the HTML audio element to switch iOS audio session
  _silentAudio.play().then(() => _debugLog('audio el: played')).catch(e => _debugLog('audio el err: ' + e.message));
  // Create and resume AudioContext
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    _debugLog('ctx created, state: ' + audioCtx.state);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => _debugLog('resume resolved, state: ' + audioCtx.state)).catch(e => _debugLog('resume err: ' + e.message));
  }
  _debugLog('ctx state: ' + audioCtx.state + ', sampleRate: ' + audioCtx.sampleRate);
  // Play a silent buffer through Web Audio as well
  try {
    const buf = audioCtx.createBuffer(1, 1, 22050);
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    src.connect(audioCtx.destination);
    src.start(0);
    _debugLog('silent buffer played');
  } catch (e) { _debugLog('buffer err: ' + e.message); }
  // Check if unlocked
  if (audioCtx.state === 'running') {
    _debugLog('UNLOCKED');
    document.removeEventListener('touchstart', _unlockAudio, true);
    document.removeEventListener('touchend', _unlockAudio, true);
    document.removeEventListener('click', _unlockAudio, true);
  }
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
 * Play a single note with a realistic piano-like tone using additive synthesis + ADSR envelope
 * @param {string} noteName - e.g. 'C4'
 * @param {number} duration - in seconds
 * @param {number} startDelay - delay before note starts (seconds)
 */
function playNote(noteName, duration = 1.2, startDelay = 0) {
  const ctx = getAudioContext();
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
    // Slight detuning for warmth on higher harmonics
    if (h.ratio > 1) {
      osc.detune.setValueAtTime(Math.random() * 4 - 2, now);
    }
    osc.connect(hGain);
    hGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  });
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
