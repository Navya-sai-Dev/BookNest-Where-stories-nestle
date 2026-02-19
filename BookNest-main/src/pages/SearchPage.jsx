import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, X, Sparkles, Bookmark, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchBooks, formatBookData } from '../services/googleBooksApi'
import BookGrid from '../components/Books/BookGrid'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  // Premium search suggestions
  const suggestions = [
    'Literary Classics', 'Modern Fiction', 'Nobel Prize Winners', 
    'Pulitzer Prize Winners', 'Booker Prize Shortlist', 'NY Times Bestsellers',
    'Tech Innovations', 'Design Masterpieces', 'Philosophical Works', 'Historical Epics'
  ]

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError('')
    setHasSearched(true)
    
    try {
      const results = await searchBooks(searchQuery, 24)
      const formattedBooks = results.map(formatBookData)
      setBooks(formattedBooks)
    } catch (err) {
      setError('Failed to search our premium collection. Please try again.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book, type: 'api' } })
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <br/>
                        <br/>
                        <br/>
                        <br/>
      {/* Floating Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 relative z-10">
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
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="tracking-wider">PREMIUM COLLECTION</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight leading-tight">
            Discover Literary
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500"
            >
              Masterpieces
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Explore our curated collection of the world's finest literary works
          </motion.p>
        </motion.div>

        {/* Premium Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search titles, authors, or ISBN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-12 pr-10 py-4 text-lg rounded-xl border-2 border-gray-300/50 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            )}
          </div>
          
          <motion.div 
            className="mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={() => handleSearch()}
              disabled={!query.trim() || loading}
              loading={loading}
              size="xl"
              className="px-10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500"
            >
              <Search className="w-5 h-5 mr-2" />
              <span className="tracking-wider">Search Collection</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Premium Search Suggestions */}
        {!hasSearched && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center tracking-tight">
              Curated Collections
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-2.5 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-full text-sm text-gray-700 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl p-6 text-center shadow-sm">
              <p className="text-red-700 font-medium">{error}</p>
              <Button 
                variant="ghost" 
                onClick={() => handleSearch()}
                className="mt-4 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300"
              >
                Retry Search
              </Button>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {hasSearched && !loading && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-gray-900 tracking-tight">
                  {books.length > 0 ? (
                    <span>
                      Showing <span className="text-amber-600">{books.length}</span> results for 
                      <span className="italic"> "{query}"</span>
                    </span>
                  ) : (
                    `No matches found for "${query}"`
                  )}
                </h2>
                
                {books.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span>Refine Results</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Book Grid with Premium Styling */}
          <BookGrid
            books={books}
            loading={loading}
            onBookClick={handleBookClick}
            type="api"
            emptyMessage={
              hasSearched 
                ? `Our curators couldn't find matches for "${query}". Try a different term.` 
                : (
                  <div className="text-center py-16">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Begin Your Literary Journey</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Search our exclusive collection to discover your next masterpiece
                    </p>
                  </div>
                )
            }
            bookCardProps={{
              className: "bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-amber-300/50 shadow-sm hover:shadow-md transition-all duration-300",
              imageClass: "group-hover:scale-105 transition-transform duration-500"
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default SearchPage