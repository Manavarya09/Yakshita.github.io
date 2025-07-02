import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutImage from '../assets/about.jpg'

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Text animation
    if (textRef.current && sectionRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Image animation
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, x: 100 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-pastel-gradient">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pastel-lavender to-pastel-mint rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-white/90">
                I'm a dedicated and curious <span className="text-pastel-mint font-medium">Food Technology student</span> with a passion for science, creativity, and innovation. My academic journey has equipped me with a strong understanding of food processing, quality control, safety standards, and sustainable practices in the food industry.
              </p>
              
              <p className="text-white/90">
                Alongside my scientific background, I have a keen interest in <span className="text-pastel-pink font-medium">graphic design</span>, which allows me to combine technical knowledge with visual communication—whether it's designing logos, eye-catching posts and reels to story templates, brand-driven content, product prototyping and informative infographics.
              </p>
              
              <p className="text-white/90">
                I enjoy working at the intersection of food science and creative design, bringing both logic and aesthetics into everything I do.
              </p>
            </div>
          </div>

          {/* Photo Display */}
          <div ref={imageRef} className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden glass-card group">
            <img
              src={aboutImage}
              alt="Yakshita - Food Technologist & Visual Designer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative border glow */}
            <div className="absolute inset-0 rounded-2xl border border-pastel-lavender/20 group-hover:border-pastel-lavender/40 transition-colors duration-500"></div>
            
            {/* Floating accent elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-pastel-mint rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-pastel-pink rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
            <div className="absolute top-1/2 right-6 w-1 h-1 bg-pastel-blue rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-pastel-pink/10 to-pastel-blue/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default About 