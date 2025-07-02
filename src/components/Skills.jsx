import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingObjects from './ThreeComponents/FloatingObjects'

const Skills = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const skillsRef = useRef(null)
  const canvasRef = useRef(null)

  const skills = [
    {
      name: "Figma",
      icon: "🎨",
      category: "Design",
      level: 90
    },
    {
      name: "Canva",
      icon: "✨",
      category: "Design",
      level: 85
    },
    {
      name: "Food Science",
      icon: "🧪",
      category: "Science",
      level: 95
    },
    {
      name: "Graphic Design",
      icon: "🎯",
      category: "Design",
      level: 88
    },
    {
      name: "Digital Marketing",
      icon: "📱",
      category: "Marketing",
      level: 80
    },
    {
      name: "Nutritional Analysis",
      icon: "🥗",
      category: "Science",
      level: 92
    },
    {
      name: "Food Safety & Sanitation",
      icon: "🛡️",
      category: "Safety",
      level: 94
    },
    {
      name: "Microbiological Testing",
      icon: "🔬",
      category: "Science",
      level: 90
    },
    {
      name: "Shelf Life Testing",
      icon: "⏰",
      category: "Science",
      level: 88
    },
    {
      name: "HACCP",
      icon: "📋",
      category: "Safety",
      level: 92
    },
    {
      name: "Design Thinking",
      icon: "💡",
      category: "Design",
      level: 85
    },
    {
      name: "Layout Design",
      icon: "📐",
      category: "Design",
      level: 87
    },
    {
      name: "Analytical Skills",
      icon: "📊",
      category: "Analysis",
      level: 93
    },
    {
      name: "Digital Art",
      icon: "🖌️",
      category: "Art",
      level: 82
    },
    {
      name: "Calligraphy",
      icon: "✒️",
      category: "Art",
      level: 78
    },
    {
      name: "Team Management",
      icon: "👥",
      category: "Leadership",
      level: 85
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Title animation
    if (titleRef.current && sectionRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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

    // Skills grid animation
    if (skillsRef.current) {
      gsap.fromTo(skillsRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Canvas animation
    if (canvasRef.current) {
      gsap.fromTo(canvasRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: canvasRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Stagger animation for skill items
    const skillItems = document.querySelectorAll('.skill-item')
    if (skillItems.length > 0 && skillsRef.current) {
      gsap.fromTo('.skill-item',
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const SkillsCard = ({ skill, index }) => {
    const cardRef = useRef(null)

    useEffect(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    }, [index])

    const getCategoryColor = (category) => {
      switch (category) {
        case 'Design':
          return 'text-pastel-lavender border-pastel-lavender/20'
        case 'Science':
          return 'text-pastel-mint border-pastel-mint/20'
        case 'Marketing':
          return 'text-pastel-pink border-pastel-pink/20'
        case 'Safety':
          return 'text-pastel-blue border-pastel-blue/20'
        case 'Analysis':
          return 'text-pastel-peach border-pastel-peach/20'
        default:
          return 'text-pastel-lavender border-pastel-lavender/20'
      }
    }

    return (
      <div ref={cardRef} className="group relative glass-card glass-card-hover p-6 text-center transition-all duration-300 hover:scale-105">
        {/* Icon */}
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {skill.icon}
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pastel-lavender transition-colors">
          {skill.name}
        </h3>

        {/* Category */}
        <div className={`text-sm px-3 py-1 rounded-full border ${getCategoryColor(skill.category)} bg-glass mb-4 inline-block`}>
          {skill.category}
        </div>

        {/* Skill Level */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/60">
            <span>Proficiency</span>
            <span>{skill.level}%</span>
          </div>
          <div className="w-full bg-glass rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-pastel-lavender to-pastel-mint transition-all duration-1000 ease-out"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 w-1 h-1 bg-pastel-lavender rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-pastel-mint rounded-full opacity-60 animate-pulse delay-1000"></div>
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-pastel-pink rounded-full opacity-60 animate-pulse delay-2000"></div>
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-pastel-gradient mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A diverse toolkit combining scientific precision with creative innovation
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillsCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tr from-pastel-pink/10 to-pastel-blue/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default Skills 