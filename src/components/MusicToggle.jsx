import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const MusicToggle = ({ isPlaying, setIsPlaying }) => {
  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
    // Here you would typically control actual background music
    // For now, we'll just toggle the state
  }

  return (
    <button
      onClick={toggleMusic}
      className="glass-card glass-card-hover p-3 rounded-full group"
      aria-label="Toggle background music"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-pastel-mint group-hover:text-pastel-blue transition-colors" />
      ) : (
        <VolumeX className="w-5 h-5 text-pastel-pink group-hover:text-pastel-peach transition-colors" />
      )}
    </button>
  )
}

export default MusicToggle 