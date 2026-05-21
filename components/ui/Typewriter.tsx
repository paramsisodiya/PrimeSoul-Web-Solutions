'use client'

import { useState, useEffect, useCallback } from 'react'

interface TypewriterProps {
  words: string[]
  className?: string
  style?: React.CSSProperties
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function Typewriter({
  words,
  className = '',
  style = {},
  speed = 80,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const fullWord = words[currentWordIndex]

    if (!isDeleting) {
      setCurrentText(fullWord.substring(0, currentText.length + 1))
      if (currentText === fullWord) {
        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }
    } else {
      setCurrentText(fullWord.substring(0, currentText.length - 1))
      if (currentText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, pauseTime])

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, deleteSpeed, speed])

  return (
    <span className={className} style={style}>
      {currentText}
      <span className="animate-pulse" style={{ opacity: 0.7 }}>|</span>
    </span>
  )
}
