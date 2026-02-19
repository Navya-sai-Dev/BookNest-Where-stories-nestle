import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { addToFavorites, removeFromFavorites, isFavorite } from '../../services/favoritesApi'

const FavoriteButton = ({ book, bookType = 'api', className = '' }) => {
  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user && book) {
      checkFavoriteStatus()
    }
  }, [user, book])

  const checkFavoriteStatus = async () => {
    try {
      const bookId = bookType === 'api' ? book.id : `local_${book.id}`
      const favStatus = await isFavorite(bookId)
      setIsFav(favStatus)
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  const toggleFavorite = async (e) => {
    e.stopPropagation()
    
    if (!user) return

    setLoading(true)
    try {
      const bookId = bookType === 'api' ? book.id : `local_${book.id}`
      
      // Prepare book data for storage
      const bookData = bookType === 'api' ? {
        id: book.id,
        title: book.title,
        authors: book.authors,
        coverImage: book.coverImage,
        description: book.description,
        publishedDate: book.publishedDate,
        categories: book.categories,
        type: 'api'
      } : {
        id: book.id,
        title: book.title,
        author: book.author,
        cover_image: book.cover_image,
        description: book.description,
        published_date: book.published_date,
        category: book.category,
        type: 'local'
      }

      if (isFav) {
        await removeFromFavorites(bookId)
        setIsFav(false)
      } else {
        await addToFavorites(bookId, bookData)
        setIsFav(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`p-2 rounded-full transition-all duration-200 ${
        isFav 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <Heart 
        className={`w-4 h-4 ${isFav ? 'fill-current' : ''} ${loading ? 'animate-pulse' : ''}`} 
      />
    </button>
  )
}

export default FavoriteButton