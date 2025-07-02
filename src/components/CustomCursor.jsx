import React, { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [trailPositions, setTrailPositions] = useState([])
  const [isMoving, setIsMoving] = useState(false)
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      
      setTimeout(() => setIsMoving(false), 50)
    }

    const updateTrail = () => {
      setTrailPositions(prev => {
        const newTrail = [...prev, cursorPosition]
        if (newTrail.length > 12) {
          return newTrail.slice(1)
        }
        return newTrail
      })
    }

    const updateFollower = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.2,
        y: prev.y + (cursorPosition.y - prev.y) * 0.2
      }))
    }

    window.addEventListener('mousemove', updateCursor)
    const trailInterval = setInterval(updateTrail, 16)
    const followerInterval = setInterval(updateFollower, 16)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      clearInterval(trailInterval)
      clearInterval(followerInterval)
    }
  }, [cursorPosition])

  return (
    <>
      {/* Main cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x - 12}px`,
          top: `${cursorPosition.y - 12}px`,
          transform: isMoving ? 'scale(1.3)' : 'scale(1)',
        }}
      />
      
      {/* Floating follower */}
      <div
        className="cursor-follower"
        style={{
          left: `${followerPosition.x - 25}px`,
          top: `${followerPosition.y - 25}px`,
          transform: isMoving ? 'scale(1.2) rotate(15deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        <div className="follower-inner">
          <div className="follower-shape"></div>
        </div>
      </div>
      
      {/* Simple dot trail */}
      {trailPositions.slice(-8).map((pos, index) => {
        if (!pos || typeof pos.x === 'undefined' || typeof pos.y === 'undefined') return null
        return (
          <div
            key={`dot-${index}`}
            className="cursor-trail-dot"
            style={{
              left: `${pos.x - 2}px`,
              top: `${pos.y - 2}px`,
              opacity: (index + 1) / 8,
              transform: `scale(${0.3 + (index + 1) * 0.1})`,
            }}
          />
        )
      })}
      
      {/* Connecting lines */}
      {trailPositions.slice(-6).map((pos, index) => {
        if (index === 0 || !pos || typeof pos.x === 'undefined' || typeof pos.y === 'undefined') return null
        const prevPos = trailPositions[trailPositions.length - 6 + index - 1]
        if (!prevPos || typeof prevPos.x === 'undefined' || typeof prevPos.y === 'undefined') return null
        
        const distance = Math.sqrt(
          Math.pow(pos.x - prevPos.x, 2) + Math.pow(pos.y - prevPos.y, 2)
        )
        const angle = Math.atan2(pos.y - prevPos.y, pos.x - prevPos.x) * 180 / Math.PI
        
        return (
          <div
            key={`line-${index}`}
            className="cursor-trail-line"
            style={{
              left: `${prevPos.x}px`,
              top: `${prevPos.y}px`,
              width: `${distance}px`,
              opacity: (index + 1) / 6 * 0.6,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%',
            }}
          />
        )
      })}
    </>
  )
}

export default CustomCursor 