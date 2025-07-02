import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react'
import ParticleSystem from './ThreeComponents/ParticleSystem'
import { playSound } from '../utils/sound'

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const canvasRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'text-pastel-lavender' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'text-pastel-mint' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'text-pastel-pink' },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Pinterest', 
      color: 'text-pastel-blue' 
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

    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
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
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
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
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    playSound('chime')
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-pastel-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to collaborate on your next food innovation or design project?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div ref={formRef} className="glass-card p-8 rounded-2xl relative overflow-hidden">
            <form
              action="https://formspree.io/f/xblywaba"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-glass-dark border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pastel-lavender/50 focus:ring-2 focus:ring-pastel-lavender/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-glass-dark border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pastel-mint/50 focus:ring-2 focus:ring-pastel-mint/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-glass-dark border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pastel-pink/50 focus:ring-2 focus:ring-pastel-pink/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-lavender to-pastel-mint text-dark font-semibold rounded-lg hover:from-pastel-mint hover:to-pastel-pink transition-all duration-300 transform hover:scale-105"
              >
                Send
              </button>
            </form>

            {/* Form decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-full blur-2xl"></div>
          </div>

          {/* Contact Info & Social */}
          <div ref={canvasRef} className="space-y-8">
            {/* Contact Info */}
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-pastel-gradient mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-glass-dark rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-pastel-lavender" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">yakshitav@gmail.com</p>
                  </div>
                </div>


                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-glass-dark rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-pastel-pink" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white font-medium">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-serif font-semibold text-pastel-gradient mb-6">
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`group flex items-center gap-3 p-4 glass-card-hover rounded-xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className={`w-10 h-10 bg-glass-dark rounded-full flex items-center justify-center group-hover:bg-${social.color.replace('text-', '')}/20 transition-colors`}>
                      <social.icon className={`w-5 h-5 ${social.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <span className="text-white font-medium group-hover:text-pastel-lavender transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pastel-lavender/10 to-pastel-mint/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tr from-pastel-pink/10 to-pastel-blue/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default Contact 