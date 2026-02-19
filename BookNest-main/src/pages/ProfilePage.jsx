import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Shield, Edit2, Save, X, Heart, BookOpen, LogIn, RefreshCw, Gem, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { getUserFavorites } from '../services/favoritesApi'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import Input from '../components/UI/Input'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProfilePage = () => {
  const { user, profile, updateProfile, signOut, loading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    full_name: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        if (profile) {
          setFormData({
            full_name: profile.full_name || ''
          })
        }
        loadUserData()
      } else {
        setLoading(false)
      }
    }
  }, [user, profile, authLoading])

  const loadUserData = async () => {
    try {
      setError('')
      setLoading(true)
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
      
      const favoritesPromise = getUserFavorites()
      
      const favs = await Promise.race([favoritesPromise, timeoutPromise])
      setFavorites(favs || [])
    } catch (error) {
      setError(error.message === 'Request timeout' ? 'Request timed out. Please try again.' : 'Failed to load user data')
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!formData.full_name.trim()) {
      setError('Full name cannot be empty')
      return
    }

    setUpdating(true)
    setError('')
    
    try {
      const { error: updateError } = await updateProfile(formData)
      if (updateError) {
        setError(updateError.message || 'Failed to update profile')
      } else {
        setEditing(false)
      }
    } catch (error) {
      setError('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleRetry = () => {
    if (user) {
      loadUserData()
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-12 text-center max-w-md mx-auto bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4 tracking-tight">Sign In Required</h2>
            <p className="text-gray-600 mb-8 font-light">Please sign in to view your premium profile.</p>
            <Button 
              onClick={() => navigate('/')}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Go to Home
            </Button>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <br/>
      <br/>
      <br/>
      <br/>
      {/* Floating Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 relative z-10">
        {/* Luxurious Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md text-gray-800 px-5 py-1.5 rounded-full text-xs font-medium mb-8 shadow-lg border border-gray-200/50"
          >
            <Gem className="w-4 h-4 text-amber-500" />
            <span className="tracking-wider">PREMIUM PROFILE</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight leading-tight">
            My Literary
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500"
            >
              Journey
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Your personalized dashboard for literary exploration
          </motion.p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl p-6 text-center shadow-sm">
              <p className="text-red-700 font-medium mb-4">{error}</p>
              <Button 
                variant="ghost" 
                onClick={handleRetry}
                className="text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-medium text-gray-900 tracking-tight">Profile Information</h2>
                  {!editing ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditing(true)}
                      className="border border-gray-300/50 hover:border-gray-400/50"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditing(false)
                          setError('')
                          setFormData({ full_name: profile?.full_name || '' })
                        }}
                        className="border border-gray-300/50 hover:border-gray-400/50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleUpdateProfile}
                        loading={updating}
                        className="shadow-md hover:shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${editing ? 'bg-amber-100/50' : 'bg-gray-100/50'}`}>
                      <User className={`w-5 h-5 ${editing ? 'text-amber-600' : 'text-gray-500'}`} />
                    </div>
                    {editing ? (
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Your full name"
                        className="flex-1 border-gray-300/50 focus:border-amber-400/50 focus:ring-amber-400/30"
                      />
                    ) : (
                      <div>
                        <p className="font-medium text-gray-900 text-lg">
                          {profile?.full_name || 'No name set'}
                        </p>
                        <p className="text-sm text-gray-500">Full Name</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100/50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-lg">{user.email}</p>
                      <p className="text-sm text-gray-500">Email Address</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100/50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-lg">
                        {profile?.created_at 
                          ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                          : 'Recently joined'
                        }
                      </p>
                      <p className="text-sm text-gray-500">Member Since</p>
                    </div>
                  </div>

                  {profile?.is_admin && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100/50 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-600 text-lg">Administrator</p>
                        <p className="text-sm text-gray-500">Admin Access Enabled</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Account Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl font-medium text-gray-900 mb-6 tracking-tight">Account Actions</h2>
                <div className="space-y-4">
                  <Button
                    variant="danger"
                    onClick={handleSignOut}
                    className="w-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    Sign Out
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-8 text-center bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg">
                  <LoadingSpinner size="md" />
                  <p className="text-gray-600 mt-4 font-light">Loading your literary stats...</p>
                </Card>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="p-8 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 tracking-tight">Your Literary Stats</h3>
                    <div className="space-y-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100/50 flex items-center justify-center">
                          <Heart className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="text-4xl font-bold text-red-500">{favorites.length}</p>
                        <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">Favorite Books</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100/50 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-green-500" />
                        </div>
                        <p className="text-4xl font-bold text-green-500">
                          {[...new Set(favorites.map(fav => {
                            const book = fav.book_data
                            return book.categories?.[0] || book.category || 'Uncategorized'
                          }))].length}
                        </p>
                        <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">Categories Explored</p>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100/50 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-amber-500" />
                        </div>
                        <p className="text-4xl font-bold text-amber-500">
                          {profile?.created_at 
                            ? Math.floor((Date.now() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24))
                            : 0
                          }
                        </p>
                        <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">Days as Member</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Recent Favorites */}
                {favorites.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Card className="p-8 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className="text-lg font-medium text-gray-900 mb-6 tracking-tight">Recent Treasures</h3>
                      <div className="space-y-4">
                        {favorites.slice(0, 3).map((fav) => {
                          const book = fav.book_data
                          return (
                            <motion.div 
                              key={fav.id} 
                              whileHover={{ x: 5 }}
                              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50/50 transition-colors cursor-pointer"
                              onClick={() => navigate(`/book/${book.id}`, { state: { book, type: 'api' } })}
                            >
                              <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden shadow-sm">
                                <img
                                  src={book.coverImage || book.cover_image}
                                  alt={book.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {book.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {book.authors?.[0] || book.author}
                                </p>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Card className="p-8 text-center bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100/50 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-tight">Your Collection Awaits</h3>
                      <p className="text-sm text-gray-500 mb-6 font-light">
                        Start building your personal library of literary treasures
                      </p>
                      <Button
                        size="sm"
                        onClick={() => navigate('/search')}
                        className="shadow-sm hover:shadow-md"
                      >
                        Discover Books
                      </Button>
                    </Card>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage