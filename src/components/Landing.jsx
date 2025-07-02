import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import profileImage from '../assets/profile.jpg'

const SaturnIcon = (props) => (
  <svg
    width={props.size || 28}
    height={props.size || 28}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="10" fill="#FDE68A" stroke="#F59E42" strokeWidth="2" />
    <ellipse cx="24" cy="28" rx="18" ry="6" fill="none" stroke="#F59E42" strokeWidth="2" />
    <ellipse cx="24" cy="20" rx="14" ry="4" fill="none" stroke="#F59E42" strokeWidth="1.5" opacity="0.5" />
  </svg>
)

const Landing = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const imageRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
      '-=0.3'
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )

    // Floating animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div ref={imageRef} className="mb-8 relative group">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden glass-card border-4 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <img
              src={profileImage}
              alt="Yakshita - Food Technologist & Visual Designer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-pastel-lavender/20 to-pastel-mint/20 rounded-full blur-xl animate-pulse group-hover:from-pastel-lavender/30 group-hover:to-pastel-mint/30 transition-all duration-500"></div>
          
          {/* Floating accent elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-pastel-pink rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pastel-mint rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 delay-100 animate-pulse"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pastel-blue rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 delay-200 animate-pulse"></div>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-serif font-bold mb-6 text-pastel-gradient glow-text">
          Hi, I'm Yakshita
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-2xl md:text-3xl font-sans font-light mb-8 text-white/90 dark:text-white/90 light-mode:text-maroon">
          a <span className="text-pastel-mint font-medium">Food Technologist</span> &{' '}
          <span className="text-pastel-pink font-medium">Visual Designer</span>
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/70 dark:text-white/70 light-mode:text-maroon/80 max-w-2xl mx-auto leading-relaxed">
          Fueling Innovation with Aesthetic Precision.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-pastel-lavender animate-bounce-slow">
          <SaturnIcon size={32} className="mb-2" />
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark/40 dark:via-dark/20 dark:to-dark/40 pointer-events-none"></div>
    </section>
  )
}

export default Landing 