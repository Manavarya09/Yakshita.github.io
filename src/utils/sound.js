let isMuted = false

const sounds = {
  pop: new Audio('/sounds/pop.mp3'),
  chime: new Audio('/sounds/chime.mp3'),
  whoosh: new Audio('/sounds/whoosh.mp3'),
}

Object.values(sounds).forEach(audio => {
  audio.volume = 0.25
})

export function playSound(name) {
  if (isMuted) return
  const sound = sounds[name]
  if (sound) {
    // Reset and play
    sound.currentTime = 0
    sound.play()
  }
}

export function setMuted(mute) {
  isMuted = mute
}

export function getMuted() {
  return isMuted
} 