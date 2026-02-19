import { useState } from 'react'
import { Star, Calendar, User, BookOpen } from 'lucide-react'
import Card from '../UI/Card'
import FavoriteButton from './FavoriteButton'

const BookCard = ({ book, onClick, type = 'api' }) => {
  const [imageError, setImageError] = useState(false)
  
  // Handle different data structures for API vs local books
  const bookData = type === 'api' ? {
    title: book.title,
    authors: book.authors,
    coverImage: book.coverImage,
    publishedDate: book.publishedDate,
    categories: book.categories,
    averageRating: book.averageRating,
    description: book.description
  } : type === 'mixed' ? {
    // Handle favorites which can be mixed types
    title: book.title,
    authors: book.authors || [book.author],
    coverImage: book.coverImage || book.cover_image,
    publishedDate: book.publishedDate || book.published_date,
    categories: book.categories || [book.category],
    averageRating: book.averageRating || 0,
    description: book.description
  } : {
    title: book.title,
    authors: [book.author],
    coverImage: book.cover_image,
    publishedDate: book.published_date,
    categories: [book.category],
    averageRating: 0,
    description: book.description
  }

  const truncateText = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <Card 
      className="p-0 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg group relative"
      onClick={() => onClick && onClick(book)}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {!imageError ? (
          <img
            src={bookData.coverImage}
            alt={bookData.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FavoriteButton book={book} bookType={type} />
        </div>
        
        {/* Rating badge */}
        {bookData.averageRating > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">
              {bookData.averageRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
            {truncateText(bookData.title, 50)}
          </h3>
          <div className="flex items-center space-x-1 mt-1">
            <User className="w-3 h-3 text-gray-400" />
            <p className="text-xs text-gray-600 line-clamp-1">
              {bookData.authors.join(', ')}
            </p>
          </div>
        </div>

        {bookData.description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {truncateText(bookData.description, 80)}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {bookData.publishedDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {new Date(bookData.publishedDate).getFullYear() || bookData.publishedDate}
              </span>
            </div>
          )}
          
          {bookData.categories && bookData.categories[0] && (
            <span className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full font-medium">
              {bookData.categories[0]}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export default BookCard