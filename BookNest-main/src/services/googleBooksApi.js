const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

export const searchBooks = async (query, maxResults = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }
    
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error searching books:', error)
    throw error
  }
}

export const getBookById = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/${bookId}?key=${API_KEY}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch book details')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching book details:', error)
    throw error
  }
}

export const formatBookData = (book) => {
  const volumeInfo = book.volumeInfo || {}
  
  return {
    id: book.id,
    title: volumeInfo.title || 'No Title',
    authors: volumeInfo.authors || ['Unknown Author'],
    description: volumeInfo.description || 'No description available',
    coverImage: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || '/api/placeholder/150/200',
    publisher: volumeInfo.publisher || 'Unknown Publisher',
    publishedDate: volumeInfo.publishedDate || 'Unknown Date',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || ['Uncategorized'],
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    language: volumeInfo.language || 'en',
    previewLink: volumeInfo.previewLink || '',
    infoLink: volumeInfo.infoLink || ''
  }
}