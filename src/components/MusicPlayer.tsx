// src/components/MusicPlayer.tsx
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react'
import portfolioData from '../data/portfolioData'

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const playlist = portfolioData.music.playlist

  // ===== ALL HOOKS FIRST (no early returns above this line) =====
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentSong = playlist[currentIndex]

  // Load new song when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return
    setError(null)
    setIsLoading(true)
    audio.src = currentSong.src
    audio.load()
  }, [currentIndex, currentSong])

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => {
        setError('Could not play audio. Check the file path.')
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // ===== EARLY RETURN IS OK NOW (after all hooks) =====
  if (!portfolioData.music.enabled) return null

  // If no songs, show a placeholder
  if (playlist.length === 0) {
    return (
      <section id="music" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Music size={48} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No music added yet.</p>
        </div>
      </section>
    )
  }

  const togglePlay = () => setIsPlaying((p) => !p)

  const playNext = () => {
    setCurrentIndex((i) => (i + 1) % playlist.length)
    setIsPlaying(true)
  }

  const playPrev = () => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length)
    setIsPlaying(true)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const newTime = Number(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (!audio) return
    setDuration(audio.duration)
    setIsLoading(false)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  const handleEnded = () => {
    if (playlist.length > 1) {
      playNext()
    } else {
      setIsPlaying(false)
    }
  }

  return (
    <section id="music" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Now <span style={{ color: 'var(--accent)' }}>Playing</span>
        </motion.h2>
        <p className="text-center mb-12 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Music I enjoy while coding
        </p>

        <div
          className="p-6 md:p-8 rounded-2xl border shadow-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Album art */}
            <motion.img
              src={currentSong.cover}
              alt={`${currentSong.title} album cover`}
              className="w-48 h-48 rounded-xl object-cover shadow-lg"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              loading="lazy"
            />

            {/* Player info */}
            <div className="flex-1 w-full">
              <h3 className="text-xl font-bold mb-1">{currentSong.title}</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                {currentSong.artist}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--accent)' }}
                  aria-label="Seek"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={playPrev}
                  disabled={playlist.length <= 1}
                  className="p-2 rounded-lg hover:opacity-70 disabled:opacity-30"
                  aria-label="Previous song"
                >
                  <SkipBack size={20} />
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="p-4 rounded-full text-white disabled:opacity-50"
                  style={{ backgroundColor: 'var(--accent)' }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>
                <button
                  onClick={playNext}
                  disabled={playlist.length <= 1}
                  className="p-2 rounded-lg hover:opacity-70 disabled:opacity-30"
                  aria-label="Next song"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value))
                    setIsMuted(false)
                  }}
                  className="flex-1 h-1 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--accent)' }}
                  aria-label="Volume"
                />
              </div>

              {/* Error state */}
              {error && (
                <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
              )}

              {/* Loading state */}
              {isLoading && !error && (
                <p className="mt-4 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
                  Loading...
                </p>
              )}
            </div>
          </div>

          {/* Playlist */}
          {playlist.length > 1 && (
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <h4 className="font-semibold mb-3 text-sm">Playlist</h4>
              <ul className="space-y-2">
                {playlist.map((song, i) => (
                  <li key={song.title}>
                    <button
                      onClick={() => {
                        setCurrentIndex(i)
                        setIsPlaying(true)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: i === currentIndex ? 'var(--bg-secondary)' : 'transparent',
                        color: i === currentIndex ? 'var(--accent)' : 'var(--text-primary)',
                      }}
                    >
                      <span className="font-medium">{song.title}</span>
                      <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>
                        — {song.artist}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={() => {
              setError('Could not load audio file.')
              setIsLoading(false)
            }}
            preload="metadata"
          />
        </div>
      </div>
    </section>
  )
}