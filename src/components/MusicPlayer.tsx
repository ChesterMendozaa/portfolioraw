// src/components/MusicPlayer.tsx
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react'
import portfolioData from '../data/portfolioData'

// How long the fade lasts in milliseconds
const FADE_DURATION = 500
// How often the fade updates (smaller = smoother, more renders)
const FADE_INTERVAL = 20

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const playlist = portfolioData.music.playlist

  // ===== ALL HOOKS FIRST =====
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Track an active fade so we can cancel it if the user spams play/pause
  const fadeRef = useRef<number | null>(null)
  const currentSong = playlist[currentIndex]

  // Target volume (what the user set). When muted, target is 0.
  const targetVolume = isMuted ? 0 : volume

  // ===== FADE HELPERS =====

  const cancelFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current)
      fadeRef.current = null
    }
  }

  /**
   * Smoothly ramp audio.volume from startVol to endVol over FADE_DURATION ms.
   * Calls onComplete when done.
   */
  const fadeTo = (startVol: number, endVol: number, onComplete?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    cancelFade()

    const steps = Math.max(1, Math.floor(FADE_DURATION / FADE_INTERVAL))
    let step = 0
    audio.volume = startVol

    fadeRef.current = window.setInterval(() => {
      step += 1
      const t = step / steps
      // Linear interpolation — simple and predictable
      audio.volume = Math.min(1, Math.max(0, startVol + (endVol - startVol) * t))

      if (step >= steps) {
        audio.volume = endVol
        cancelFade()
        onComplete?.()
      }
    }, FADE_INTERVAL)
  }

  // ===== LOAD NEW SONG WHEN INDEX CHANGES =====
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return
    setError(null)
    setIsLoading(true)
    // Start each new song at volume 0 so we can fade in cleanly
    audio.volume = 0
    audio.src = currentSong.src
    audio.load()
  }, [currentIndex, currentSong])

  // ===== PLAY / PAUSE with FADE =====
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      // Fade IN from current volume (usually 0 on a fresh load) to target
      audio
        .play()
        .then(() => {
          fadeTo(audio.volume, targetVolume)
        })
        .catch(() => {
          setError('Could not play audio. Check the file path.')
          setIsPlaying(false)
        })
    } else {
      // Fade OUT then pause
      fadeTo(audio.volume, 0, () => {
        audio.pause()
      })
    }

    return () => cancelFade()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // ===== VOLUME CHANGES (when not fading) =====
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) return
    // If we're actively fading, don't stomp on it
    if (fadeRef.current !== null) return
    audio.volume = targetVolume
  }, [volume, isMuted, isPlaying, targetVolume])

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelFade()
  }, [])

  // ===== EARLY RETURNS (after all hooks) =====
  if (!portfolioData.music.enabled) return null

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

  // ===== CONTROLS =====
  const togglePlay = () => setIsPlaying((p) => !p)

  const playNext = () => {
    cancelFade()
    setCurrentIndex((i) => (i + 1) % playlist.length)
    setIsPlaying(true)
  }

  const playPrev = () => {
    cancelFade()
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
    // No fade at the end — just go to next (or stop)
    if (playlist.length > 1) {
      playNext()
    } else {
      setIsPlaying(false)
    }
  }

  // Percentages for the slider fills
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const volumePercent = (isMuted ? 0 : volume) * 100

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
              className="w-48 h-48 rounded-xl object-cover shadow-lg flex-shrink-0"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              loading="lazy"
            />

            {/* Player info */}
            <div className="flex-1 w-full min-w-0">
              <h3 className="text-xl font-bold mb-1 truncate">{currentSong.title}</h3>
              <p className="text-sm mb-6 truncate" style={{ color: 'var(--text-secondary)' }}>
                {currentSong.artist}
              </p>

              {/* Progress bar with time labels */}
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs tabular-nums w-10 text-right"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="slider flex-1"
                    style={{ ['--slider-progress' as string]: `${progressPercent}%` }}
                    aria-label="Seek"
                  />
                  <span
                    className="text-xs tabular-nums w-10"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-5">
                <button
                  onClick={playPrev}
                  disabled={playlist.length <= 1}
                  className="p-2 rounded-lg hover:opacity-70 disabled:opacity-30"
                  aria-label="Previous song"
                >
                  <SkipBack size={22} />
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="p-4 rounded-full text-white disabled:opacity-50 shadow-md"
                  style={{ backgroundColor: 'var(--accent)' }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={26} /> : <Play size={26} />}
                </motion.button>
                <button
                  onClick={playNext}
                  disabled={playlist.length <= 1}
                  className="p-2 rounded-lg hover:opacity-70 disabled:opacity-30"
                  aria-label="Next song"
                >
                  <SkipForward size={22} />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg hover:opacity-70 flex-shrink-0"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
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
                  className="slider flex-1"
                  style={{ ['--slider-progress' as string]: `${volumePercent}%` }}
                  aria-label="Volume"
                />
                <span
                  className="text-xs tabular-nums w-10 text-right"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
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
                  <li key={`${song.title}-${i}`}>
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