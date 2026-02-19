import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, BookOpen, LogIn, RefreshCw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getUserFavorites } from '../services/favoritesApi'
import BookGrid from '../components/Books/BookGrid'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('FavoritesPage useEffect - authLoading:', authLoading, 'user:', !!user)
    
    if (!authLoading) {
      if (user) {
        loadFavorites()
      } else {
        setLoading(false)
      }
    }
  }, [user, authLoading])

  const loadFavorites = async () => {
    try {
      console.log('Loading favorites...')
      setError('')
      setLoading(true)
      
      // Add a timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
      
      const favoritesPromise = getUserFavorites()
      
      const favs = await Promise.race([favoritesPromise, timeoutPromise])
      console.log('Loaded favorites:', favs)
      setFavorites(favs || [])
    } catch (error) {
      console.error('Error loading favorites:', error)
      setError(error.message === 'Request timeout' ? 'Request timed out. Please try again.' : 'Failed to load favorites')
      setFavorites([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleBookClick = (favorite) => {
    const book = favorite.book_data
    const bookType = book.type || 'api'
    const bookId = bookType === 'api' ? book.id : book.id
    
    navigate(`/book/${bookId}`, { 
      state: { book, type: bookType } 
    })
  }

  const handleRetry = () => {
    if (user) {
      loadFavorites()
    }
  }

  // Show loading while auth is loading
  if (authLoading) {
    console.log('Showing auth loading spinner')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  // Show sign in required if no user
  if (!user) {
    console.log('No user, showing sign in required')
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your favorite books.</p>
          <Button onClick={() => navigate('/')}>
            <LogIn className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  // Transform favorites data for BookGrid
  const favoriteBooks = favorites.map(fav => ({
    ...fav.book_data,
    favoriteId: fav.id
  }))

  console.log('Rendering favorites page with', favoriteBooks.length, 'books')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <br/>
                        <br/>
                        <br/>
                        <br/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-3 fill-current" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Favorite Books
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal collection of beloved books
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-700 mb-3">{error}</p>
              <Button 
                variant="ghost" 
                onClick={handleRetry}
                className="text-red-600 hover:text-red-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="text-gray-600 mt-4">Loading your favorite books...</p>
            </div>
          </div>
        )}

        {/* Stats - Only show when not loading */}
        {!loading && (
          <div className="max-w-md mx-auto mb-8">
            <Card className="p-6 text-center">
              <div className="flex items-center justify-center space-x-4">
                <div>
                  <p className="text-2xl font-bold text-primary-600">{favorites.length}</p>
                  <p className="text-sm text-gray-600">Favorite Books</p>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <p className="text-2xl font-bold text-secondary-600">
                    {[...new Set(favorites.map(fav => {
                      const book = fav.book_data
                      return book.categories?.[0] || book.category || 'Uncategorized'
                    }))].length}
                  </p>
                  <p className="text-sm text-gray-600">Categories</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Books Grid - Only show when not loading */}
        {!loading && (
          <BookGrid
            books={favoriteBooks}
            loading={false}
            onBookClick={handleBookClick}
            type="mixed"
            emptyMessage="You haven't added any books to your favorites yet. Start exploring and save books you love!"
          />
        )}
      </div>
    </div>
  )
}

export default FavoritesPage