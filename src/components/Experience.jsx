import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Calendar, MapPin, Building, Award, Users, Target } from 'lucide-react'

const Experience = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  const experiences = [
    {
      title: "Summer Intern",
      company: "Mother Dairy (Fruits and Vegetables)",
      location: "Delhi, India",
      period: "June 2025",
      description: "Gained hands-on experience in food processing and quality control at one of India's leading dairy and food processing companies.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      tags: ["Food Processing", "Quality Assurance", "Internship", "Industry Experience"],
      achievements: ["Food safety protocols", "Quality assurance", "Production processes", "Industry standards"],
      icon: "🍎"
    },
    {
      title: "Graphic Designer",
      company: "MASYV Designs",
      location: "Delhi, India",
      period: "June 2025",
      description: "Co-founder and lead graphic designer at MASYV Designs, creating innovative visual solutions and managing creative projects.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      tags: ["Graphic Design", "Co-founder", "Creative Direction", "Brand Identity"],
      achievements: ["Founded design agency", "Led creative projects", "Client management", "Brand development"],
      icon: "🎨"
    },
    {
      title: "Head of Graphic Department",
      company: "FT Professional Chapter",
      location: "Delhi, India",
      period: "2023 - Present",
      description: "Leading the graphic design department after serving as Co-Head last year. Managing visual communication and design projects.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      tags: ["Leadership", "Graphic Design", "Management", "Visual Communication"],
      achievements: ["Promoted from Co-Head to Head", "Led 10+ design projects", "Mentored team members", "Improved department efficiency"],
      icon: "👑"
    },
    {
      title: "Core Team Member",
      company: "Vani - The Debating Society",
      location: "Delhi, India",
      period: "2024 - Present",
      description: "Active core member of the university's  debating society.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      tags: ["Debating", "Public Speaking", "Leadership", "Event Organization"],
      achievements: ["Created engaging graphics for debates, workshops, and competitions", "Organized Events", "Mentored new members", "Collaborated on event planning, promotion, and content strategy"],
      icon: "🎤"
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

    // Grid animation
    if (gridRef.current) {
      gsap.fromTo(gridRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const ExperienceCard = ({ experience, index }) => {
    const cardRef = useRef(null)

    useEffect(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    }, [index])

    return (
      <div ref={cardRef} className="group relative glass-card glass-card-hover overflow-hidden h-full transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender/10 via-pastel-mint/5 to-pastel-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{experience.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-pastel-lavender transition-colors mb-2">
                {experience.title}
              </h3>
              <div className="space-y-1 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-pastel-mint" />
                  <span className="font-medium">{experience.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pastel-pink" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pastel-blue" />
                  <span>{experience.period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-white/80 text-sm leading-relaxed">
            {experience.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 text-xs bg-gradient-to-r from-pastel-mint/20 to-pastel-lavender/20 rounded-full text-pastel-mint border border-pastel-mint/30 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-pastel-pink" />
              <h4 className="text-sm font-semibold text-white">Key Achievements</h4>
            </div>
            <div className="space-y-2">
              {experience.achievements.map((achievement, achievementIndex) => (
                <div key={achievementIndex} className="flex items-start gap-2 p-2 bg-white/5 rounded border border-white/10">
                  <Target className="w-3 h-3 text-pastel-mint mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-white/70">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender/5 to-pastel-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pastel-lavender via-pastel-mint to-pastel-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-pastel-gradient mb-4">
            Experience
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            My professional journey and achievements across various roles and organizations
          </p>
        </div>

        {/* 2x2 Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-tr from-pastel-pink/10 to-pastel-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-pastel-blue/10 to-pastel-lavender/10 rounded-full blur-2xl"></div>
    </section>
  )
}

export default Experience 