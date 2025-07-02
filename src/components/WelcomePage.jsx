import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, Sparkles, Star, Zap, Heart, Code, Palette, Coffee } from 'lucide-react'
import CustomCursor from './CustomCursor'
import { playSound } from '../utils/sound'

const WelcomePage = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    // Mouse move handler for interactive background
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Wait for refs to be available
    if (!titleRef.current) return

    const tl = gsap.timeline()

    // Initial setup
    tl.set([titleRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.9
    })

    // Animate title in with stagger
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 2,
      ease: "elastic.out(1, 0.5)"
    })

    // Show button after a delay
    tl.call(() => {
      setShowButton(true)
    }, [], 2.5)

    // Animate button in when it's available
    tl.call(() => {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)"
        })
      }
    }, [], 2.7)

    // Animate floating elements
    const floatingElements = document.querySelectorAll('.floating-element')
    gsap.to(floatingElements, {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      stagger: 0.2,
      repeat: -1,
      yoyo: true
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleDiveIn = () => {
    playSound('pop')
    const tl = gsap.timeline()

    // Button click animation
    if (buttonRef.current) {
      tl.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.in"
      })
      .to(buttonRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out"
      })
    }

    // Create ripple effect
    const ripple = document.createElement('div')
    ripple.className = 'absolute w-0 h-0 bg-white/20 rounded-full pointer-events-none'
    ripple.style.left = mousePosition.x + 'px'
    ripple.style.top = mousePosition.y + 'px'
    ripple.style.transform = 'translate(-50%, -50%)'
    document.body.appendChild(ripple)

    gsap.to(ripple, {
      width: '100vw',
      height: '100vw',
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => document.body.removeChild(ripple)
    })

    // Fade out content with stagger
    const elementsToAnimate = [titleRef.current]
    if (buttonRef.current) elementsToAnimate.push(buttonRef.current)
    
    tl.to(elementsToAnimate, {
      opacity: 0,
      y: -50,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.in",
      stagger: 0.1
    }, 0.3)

    // Scale and fade out container with particle explosion
    if (containerRef.current) {
      tl.to(containerRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0.5)
    }

    // Complete transition
    tl.call(() => {
      setIsVisible(false)
      setTimeout(() => {
        onComplete()
      }, 300)
    }, [], 1.5)
  }

  // Particle burst effect
  const createParticleBurst = (x, y) => {
    const colors = [
      'rgba(230,230,250,0.85)', // pastel lavender
      'rgba(240,255,240,0.85)', // pastel mint
      'rgba(255,228,225,0.85)', // pastel pink
      'rgba(224,246,255,0.85)', // pastel blue
      'rgba(255,229,217,0.85)'  // pastel peach
    ]
    const numParticles = 18
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div')
      const angle = (Math.PI * 2 * i) / numParticles + Math.random() * 0.2
      const distance = 60 + Math.random() * 40
      const size = 8 + Math.random() * 8
      const color = colors[Math.floor(Math.random() * colors.length)]
      particle.style.position = 'fixed'
      particle.style.left = `${x - size / 2}px`
      particle.style.top = `${y - size / 2}px`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.borderRadius = '50%'
      particle.style.background = color
      particle.style.pointerEvents = 'none'
      particle.style.zIndex = 99999
      particle.style.opacity = 1
      particle.style.boxShadow = '0 0 16px 2px ' + color
      document.body.appendChild(particle)
      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.5 + Math.random() * 0.7,
        opacity: 0,
        duration: 0.9 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => document.body.removeChild(particle)
      })
    }
  }

  // Attach burst to click/tap
  useEffect(() => {
    if (!containerRef.current) return
    const handleBurst = (e) => {
      // Only trigger for left click or touch
      if (e.type === 'click' && e.button !== 0) return
      let x, y
      if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX
        y = e.touches[0].clientY
      } else {
        x = e.clientX
        y = e.clientY
      }
      createParticleBurst(x, y)
    }
    const node = containerRef.current
    node.addEventListener('click', handleBurst)
    node.addEventListener('touchstart', handleBurst)
    return () => {
      node.removeEventListener('click', handleBurst)
      node.removeEventListener('touchstart', handleBurst)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-gradient-to-br from-dark via-dark-blue to-dark overflow-hidden">
      <CustomCursor />
      
      {/* Interactive Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-pastel-lavender/10 via-pastel-mint/10 to-pastel-pink/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pastel-blue/5 to-transparent"></div>
        
        {/* Large floating orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pastel-lavender/15 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pastel-mint/15 rounded-full blur-3xl animate-float"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.015}px, ${(mousePosition.y - window.innerHeight / 2) * -0.015}px)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pastel-pink/15 rounded-full blur-3xl animate-float"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div ref={titleRef} className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-4 sm:mb-6 lg:mb-8 text-pastel-gradient glow-text leading-tight animate-text-glow">
            <span className="block">Do you want to</span>
            <span className="block text-pastel-mint">dive in my</span>
            <span className="block">portfolio?</span>
          </h1>
        </div>

        {/* Dive In Button */}
        {showButton && (
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <button
              ref={buttonRef}
              onClick={handleDiveIn}
              className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-pastel-lavender to-pastel-mint text-dark font-bold text-lg sm:text-xl rounded-2xl shadow-2xl hover:from-pastel-mint hover:to-pastel-pink transition-all duration-500 transform hover:scale-105 active:scale-95 hover:shadow-pastel-lavender/25 animate-pulse-glow touch-manipulation"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Dive In</span>
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform duration-300" />
              </div>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pastel-lavender to-pastel-mint rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        )}

        {/* Floating Icons */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 floating-element">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pastel-lavender/30 rounded-full blur-sm flex items-center justify-center">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-pastel-lavender" />
          </div>
        </div>
        <div className="absolute top-20 sm:top-40 right-4 sm:right-32 floating-element" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pastel-mint/30 rounded-full blur-sm flex items-center justify-center">
            <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-pastel-mint" />
          </div>
        </div>
        <div className="absolute bottom-20 sm:bottom-40 left-4 sm:left-32 floating-element" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pastel-pink/30 rounded-full blur-sm flex items-center justify-center">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pastel-pink" />
          </div>
        </div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 floating-element" style={{ animationDelay: '3s' }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pastel-blue/30 rounded-full blur-sm flex items-center justify-center">
            <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-pastel-blue" />
          </div>
        </div>

        {/* Additional floating elements for larger screens */}
        <div className="hidden lg:block absolute top-1/3 left-1/6 floating-element" style={{ animationDelay: '0.5s' }}>
          <div className="w-12 h-12 bg-pastel-lavender/20 rounded-full blur-sm flex items-center justify-center">
            <Star className="w-6 h-6 text-pastel-lavender" />
          </div>
        </div>
        <div className="hidden lg:block absolute top-1/4 right-1/6 floating-element" style={{ animationDelay: '1.5s' }}>
          <div className="w-10 h-10 bg-pastel-mint/20 rounded-full blur-sm flex items-center justify-center">
            <Zap className="w-5 h-5 text-pastel-mint" />
          </div>
        </div>
      </div>

      {/* Particle System */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pastel-lavender/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-dark/30 pointer-events-none"></div>
      
      {/* Mobile-specific enhancements */}
      <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-pastel-lavender/60 text-center">
        <p className="animate-pulse">Tap to explore</p>
        <div className="mt-2 flex justify-center">
          <div className="w-2 h-2 bg-pastel-lavender/40 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage 