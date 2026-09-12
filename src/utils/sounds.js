let audioContext;

const getContext = () => {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    audioContext = new AudioContext();
  }

  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
};

const playTone = ({ frequency, endFrequency, duration, volume, wave = 'sine' }) => {
  if (!volume) return;
  const context = getContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
};

export const playBrewSound = (volume) => {
  playTone({ frequency: 310, endFrequency: 590, duration: 0.13, volume: volume * 0.22 });
};

export const playPurchaseSound = (volume) => {
  playTone({ frequency: 440, endFrequency: 830, duration: 0.19, volume: volume * 0.18, wave: 'triangle' });
};

export const playAmbientBubble = (volume) => {
  if (!audioContext || !volume) return;
  playTone({ frequency: 150, endFrequency: 85, duration: 0.24, volume: volume * 0.07 });
};
