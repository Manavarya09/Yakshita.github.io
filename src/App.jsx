import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { FileText } from 'lucide-react'
import WelcomePage from './components/WelcomePage'
import Landing from './components/Landing'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ThemeToggle from './components/ThemeToggle'
import LoadingScreen from './components/LoadingScreen'
import ParticleSystem from './components/ThreeComponents/ParticleSystem'
import { playSound } from './utils/sound'

gsap.registerPlugin(ScrollTrigger)

// Global Stars Background Component
const GlobalStarsBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#E6E6FA" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#F0FFF0" />
        <pointLight position={[0, 10, 0]} intensity={0.4} color="#FFE4E1" />
        
        <ParticleSystem count={800} size={0.015} />
      </Canvas>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)
  const [theme, setTheme] = useState('dark')
  const [isCvLoading, setIsCvLoading] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Update body background and text color based on theme
    if (theme === 'dark') {
      document.body.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #0F1419 100%)'
      document.body.style.color = '#ffffff'
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark-mode')
    } else {
      document.body.style.background = 'linear-gradient(135deg, #FFE4E1 0%, #FFE5D9 100%)'
      document.body.style.color = '#800000'
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    }
  }, [theme])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  const handleViewCV = () => {
    playSound('pop')
    setIsCvLoading(true)
    
    // Try multiple methods to open CV in new tab
    const openCV = () => {
      // Method 1: Direct window.open
      const cvWindow = window.open('/cv.pdf', '_blank', 'noopener,noreferrer')
      
      if (cvWindow) {
        // Success - window opened
        setTimeout(() => {
          setIsCvLoading(false)
          if (cvWindow.closed) {
            // Window was closed, CV might not exist
            alert('CV file not found. Please ensure cv.pdf is in the public folder.')
          }
        }, 1000)
        return true
      }
      
      // Method 2: Create a temporary link and click it
      const link = document.createElement('a')
      link.href = '/cv.pdf'
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Method 3: Use location.href with a small delay
      setTimeout(() => {
        setIsCvLoading(false)
        // If we're still here, the link method might have worked
        // If not, show the popup blocked message
        if (!cvWindow || cvWindow.closed) {
          alert('Popup blocked. Please:\n1. Right-click the button and select "Open in new tab"\n2. Or allow popups for this site\n3. Or manually navigate to /cv.pdf')
        }
      }, 500)
      
      return false
    }
    
    // Check if CV exists first
    fetch('/cv.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          openCV()
        } else {
          setIsCvLoading(false)
          alert('CV file not found. Please ensure cv.pdf is in the public folder.')
        }
      })
      .catch(error => {
        setIsCvLoading(false)
        console.error('Error checking CV:', error)
        alert('Unable to access CV. Please ensure cv.pdf is in the public folder.')
      })
  }

  // For section transitions, play a sound when the main sections mount
  useEffect(() => {
    playSound('whoosh')
  }, [showWelcome])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (showWelcome) {
    return <WelcomePage onComplete={handleWelcomeComplete} />
  }

  return (
    <main ref={containerRef} className="relative">
      <GlobalStarsBackground />
      <CustomCursor />
      
      {/* Fixed controls */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      {/* CV Button - Fixed bottom left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        <button
          onClick={handleViewCV}
          onContextMenu={(e) => {
            e.preventDefault()
            window.open('/cv.pdf', '_blank')
          }}
          disabled={isCvLoading}
          className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-pastel-lavender to-pastel-mint text-dark font-semibold rounded-2xl shadow-2xl hover:from-pastel-mint hover:to-pastel-pink transition-all duration-300 transform hover:scale-105 hover:shadow-pastel-lavender/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          title="Click to view CV in new tab. Right-click for alternative opening method."
        >
          {isCvLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
              <span>Opening CV...</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>View my CV</span>
            </>
          )}
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-lavender to-pastel-mint rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
        </button>
        
        {/* Direct link as fallback */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-pastel-lavender hover:text-pastel-mint transition-colors duration-300 text-center opacity-70 hover:opacity-100"
        >
          Direct CV Link
        </a>
      </div>

      {/* Sections */}
      <Landing />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Contact />
    </main>
  )
}

export default App 