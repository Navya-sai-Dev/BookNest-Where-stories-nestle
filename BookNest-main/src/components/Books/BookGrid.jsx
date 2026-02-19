import BookCard from './BookCard'
import LoadingSpinner from '../UI/LoadingSpinner'

const BookGrid = ({ books, loading, onBookClick, type = 'api', emptyMessage = 'No books found' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Books Found</h3>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {books.map((book, index) => (
        <BookCard
          key={type === 'api' ? book.id : book.id || index}
          book={book}
          onClick={onBookClick}
          type={type}
        />
      ))}
    </div>
  )
}

export default BookGrid