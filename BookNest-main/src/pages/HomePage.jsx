import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Users, Shield, Sparkles, Gem, Award, Bookmark, ChevronDown, Apple } from 'lucide-react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const features = [
    {
      icon: Search,
      title: 'Bibliophile Discovery',
      description: 'Our proprietary search technology surfaces the rarest literary gems from exclusive collections worldwide',
      color: 'bg-gradient-to-br from-blue-500/20 to-blue-600/30',
      accent: 'from-blue-500 to-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Curated Collections',
      description: 'Hand-selected by our team of elite librarians and literary experts',
      color: 'bg-gradient-to-br from-emerald-500/20 to-teal-600/30',
      accent: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Concierge Service',
      description: '24/7 access to our team of literary consultants and rare book specialists',
      color: 'bg-gradient-to-br from-amber-500/20 to-amber-600/30',
      accent: 'from-amber-500 to-amber-600'
    }
  ]

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden font-sans antialiased">

      <br/>
      <br/>
      <br/>
      <br/>
      {/* Hero Section - Ultra Premium */}
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Luxury Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent rounded-full" />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-blue-500/10 rounded-full shadow-lg backdrop-blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-amber-500/10 rounded-full shadow-lg backdrop-blur-sm" />
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-emerald-500/10 rounded-full shadow-lg backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md text-gray-800 px-5 py-1.5 rounded-full text-xs font-medium mb-8 shadow-lg border border-gray-200/50"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="tracking-wider">PREMIER EDITION</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-8 tracking-tight leading-tight">
              The Ultimate{' '}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="italic font-light"
              >
                Literary
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500"
              >
                Experience
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            >
              A sanctuary for the most discerning bibliophiles, offering unparalleled access to the world's rarest literary collections.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <Link to="/search">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                >
                  <Search className="w-5 h-5 mr-2" />
                  <span className="tracking-wider">Begin Journey</span>
                </Button>
              </Link>
              
              <Link to="/team">
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="w-full sm:w-auto bg-white/90 backdrop-blur-md hover:bg-white border border-gray-300/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span className="tracking-wider">Our Curators</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* macOS-style Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-6 h-10 rounded-full border border-gray-400/50 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-0.5 h-3 bg-gray-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Premium Features Section - macOS-style Cards */}
      <div ref={ref} className="max-w-7xl mx-auto px-8 py-32 relative">
        {/* Floating Background Elements */}
        <div className="absolute -top-32 left-0 right-0 h-64 bg-gradient-to-b from-white to-transparent z-0" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl" />
        
        <div className="relative z-10">
          <motion.div 
            variants={variants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Exclusive Features</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6 tracking-tight">
              Designed for <span className="italic font-light">Discerning</span> Taste
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Every detail crafted to meet the highest standards of literary excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={variants}
                  initial="hidden"
                  animate={controls}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card 
                    className="p-8 text-left transform transition-all duration-500 hover:-translate-y-1.5 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl rounded-xl overflow-hidden"
                  >
                    {/* Gradient Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.accent}`} />
                    
                    <div className={`w-16 h-16 mb-6 rounded-xl ${feature.color} flex items-center justify-center shadow-inner backdrop-blur-sm`}>
                      <Icon className="w-7 h-7 text-gray-800" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm">
                      {feature.description}
                    </p>
                    
                    {/* macOS-style Learn More */}
                    <div className="mt-6 flex items-center text-sm font-medium text-blue-500">
                      <span>Learn more</span>
                      <ChevronDown className="w-4 h-4 ml-1 transform group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Ultra Premium CTA Section */}
      <div className="relative py-32 overflow-hidden">
        {/* Luxury Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-500/10 rounded-full filter blur-xl" />
        
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-12 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm relative overflow-hidden"
          >
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gray-600/50 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gray-600/50 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gray-600/50 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gray-600/50 rounded-br-2xl" />
            
            <div className="inline-flex items-center space-x-3 mb-6">
              <Apple className="w-6 h-6 text-gray-300" />
              <span className="text-sm uppercase tracking-widest text-gray-300 font-medium">Exclusively on BookNest</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 tracking-tight leading-tight">
              Elevate Your <span className="italic font-light">Literary</span> Journey
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Join our community of distinguished readers and gain privileged access to the world's most exclusive collections
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/search">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white"
                >
                  <Search className="w-5 h-5 mr-2" />
                  <span className="tracking-wider">Explore Now</span>
                </Button>
              </Link>
              
              <Link to="/admin">
                <Button 
                  variant="ghost" 
                  size="xl" 
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="tracking-wider">Concierge Access</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* macOS-style Footer */}
      <div className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <Gem className="w-5 h-5 text-amber-400" />
                <span className="text-lg font-medium text-white tracking-tight">BookNest</span>
              </div>
              <p className="text-sm text-gray-500 font-light mb-6">
                The ultimate destination for discerning bibliophiles and collectors of rare literature.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Apple className="w-4 h-4 text-gray-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">Discover</h3>
              <Link to="/search" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Featured Collections</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Rare Finds</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Curator's Picks</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">New Arrivals</Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">Services</h3>
              <Link to="/admin" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Concierge</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Appraisals</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Restoration</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Membership</Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">Company</h3>
              <Link to="/team" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Our Curators</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">History</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Press</Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Careers</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600 mb-4 md:mb-0">© {new Date().getFullYear()} BookNest. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200">Privacy</Link>
              <Link to="/policy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200">Terms</Link>
              <Link to="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage