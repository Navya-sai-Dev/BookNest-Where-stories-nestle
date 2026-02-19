import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, BookOpen, Menu, X, Users, Shield, Heart, User, LogIn, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from '../Auth/AuthModal'
import Button from '../UI/Button'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [signingOut, setSigningOut] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut, isAdmin } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const publicNavItems = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Team', path: '/team', icon: Users }
  ]

  const userNavItems = [
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User }
  ]

  const adminNavItems = [
    { name: 'Admin', path: '/admin', icon: Shield }
  ]

  const allNavItems = [
    ...publicNavItems,
    ...(user ? userNavItems : []),
    ...(isAdmin ? adminNavItems : [])
  ]

  const isActive = (path) => location.pathname === path

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      await signOut()
      setIsMobileMenuOpen(false)
      setUserMenuOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setSigningOut(false)
    }
  }

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? 'bg-white/90 border-b border-gray-200/40 shadow-sm' : 'bg-white/80'
        }`}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-sm">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                BookNest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {allNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-primary-100/50 to-primary-50 text-primary-700 shadow-inner'
                        : 'text-gray-700 hover:bg-gray-100/50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {profile?.full_name || user.email.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 origin-top-right bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 overflow-hidden"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="px-4 py-3 border-b border-gray-200/50">
                          <p className="text-sm font-medium text-gray-900">
                            {profile?.full_name || user.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors flex items-center"
                            disabled={signingOut}
                          >
                            {signingOut ? 'Signing Out...' : 'Sign Out'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAuthClick('signin')}
                    className="border border-gray-300/50 hover:border-gray-400/50"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                    className="shadow-sm hover:shadow-md"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-100/50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-6 py-4 border-t border-gray-200/50">
                <div className="flex flex-col space-y-2">
                  {allNavItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.path)}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left w-full ${
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-primary-100/50 to-primary-50 text-primary-700 shadow-inner'
                            : 'text-gray-700 hover:bg-gray-100/50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </motion.button>
                    )
                  })}
                  
                  {/* Mobile Auth */}
                  <div className="pt-4 border-t border-gray-200/50 mt-4">
                    {user ? (
                      <div className="px-4 space-y-3">
                        <p className="text-sm text-gray-700">
                          Signed in as {profile?.full_name || user.email}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSignOut}
                          loading={signingOut}
                          disabled={signingOut}
                          className="w-full border border-gray-300/50 hover:border-gray-400/50"
                        >
                          {signingOut ? 'Signing Out...' : 'Sign Out'}
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            handleAuthClick('signin')
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full border border-gray-300/50 hover:border-gray-400/50"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            handleAuthClick('signup')
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full shadow-sm hover:shadow-md"
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                    
                  </div>
                </div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  )
}

export default Navbar