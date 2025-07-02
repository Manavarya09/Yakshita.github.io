import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Calendar, MapPin, Building } from 'lucide-react'
import bscImage from '../assets/bsc.jpg'
import amritaImage from '../assets/amrita.jpg'

const Education = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const foodTechRef = useRef(null)
  const designRef = useRef(null)

  const foodTechExperience = [
    {
      title: "BSc(Hons)  Food Technology",
      company: "Lady Irwin College (DU)",
      location: "Delhi, India",
      period: "2023 - Expected 2027",
      description: "Pursuing a comprehensive degree in Food Technology with focus on food science, processing, safety, and innovation. Learning advanced techniques in molecular gastronomy and sustainable food production.",
      image: bscImage,
      tags: ["Food Science", "Food Engineering", "Research", "Innovation"],
      achievements: ["Core Subjects in Food Science", "Food Testing", "Food Safety protocols", "Sustainable practices"]
    },
    {
      title: "Class 12 - Science",
      company: "Amrita Vidyalayam",
      location: "India",
      period: "2008 - 2022",
      description: "Completed primary and secondary education with focus on Physics, Chemistry, and Biology. Developed strong foundation in sciences and academic excellence throughout schooling years.",
      image: amritaImage,
      tags: ["Physics", "Chemistry", "Biology", "Psychology"],
      achievements: ["Completed Nursery to Class 12", "PCB stream specialization", "Co-curricular activities", "Academic excellence"]
    }
  ]

  const designExperience = []

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

    // Food Tech experience animation
    if (foodTechRef.current) {
      gsap.fromTo(foodTechRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: foodTechRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Design experience animation
    if (designRef.current) {
      gsap.fromTo(designRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: designRef.current,
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
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.2,
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

    return (
      <div ref={cardRef} className="group relative glass-card glass-card-hover overflow-hidden h-auto w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Image - Left Side */}
          <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
          </div>

          {/* Content - Right Side */}
          <div className="lg:w-2/3 p-8 space-y-6">
            <div>
              <h3 className="text-3xl lg:text-4xl font-semibold text-white group-hover:text-pastel-lavender transition-colors mb-4">
                {experience.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/60 mb-6">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span className="font-medium">{experience.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{experience.period}</span>
                </div>
              </div>
            </div>
            
            <p className="text-white/70 text-lg leading-relaxed">
              {experience.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {experience.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-4 py-2 text-sm bg-glass rounded-full text-pastel-mint border border-pastel-mint/20 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-pastel-pink">Key Achievements:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-start gap-3">
                    <span className="text-pastel-mint mt-1 text-lg">•</span>
                    <span className="text-white/60">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-lavender/5 to-pastel-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-pastel-gradient mb-4">
            Education
          </h2>
        </div>

        {/* Education Cards - Full Width Layout */}
        <div ref={foodTechRef} className="space-y-12">
          {foodTechExperience.map((experience, index) => (
            <div key={index} className="w-full">
              <ExperienceCard experience={experience} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-tr from-pastel-pink/10 to-pastel-blue/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default Education 