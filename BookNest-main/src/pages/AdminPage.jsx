import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, BarChart3, BookOpen, Calendar, Eye } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getLocalBooks, addLocalBook, updateLocalBook, deleteLocalBook } from '../services/localBooksApi'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import Input from '../components/UI/Input'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const AdminPage = () => {
  const { user, profile, isAdmin, loading: authLoading } = useAuth()
  const [books, setBooks] = useState([])
  const [booksLoading, setBooksLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    category: '',
    publisher: '',
    publishedDate: '',
    pageCount: ''
  })
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      loadBooks()
    }
  }, [user, isAdmin, authLoading])

  const loadBooks = async () => {
    setBooksLoading(true)
    try {
      const localBooks = await getLocalBooks()
      setBooks(localBooks)
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setBooksLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const bookData = {
        ...formData,
        pageCount: formData.pageCount ? parseInt(formData.pageCount) : 0
      }

      if (editingBook) {
        await updateLocalBook(editingBook.id, bookData)
      } else {
        await addLocalBook(bookData)
      }

      // Reset form and reload books
      setFormData({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        category: '',
        publisher: '',
        publishedDate: '',
        pageCount: ''
      })
      setShowAddForm(false)
      setEditingBook(null)
      loadBooks()
    } catch (error) {
      alert('Error saving book: ' + error.message)
    }
  }

  const handleEdit = (book) => {
    setFormData({
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      coverImage: book.cover_image || '',
      category: book.category || '',
      publisher: book.publisher || '',
      publishedDate: book.published_date || '',
      pageCount: book.page_count ? book.page_count.toString() : ''
    })
    setEditingBook(book)
    setShowAddForm(true)
  }

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteLocalBook(bookId)
        loadBooks()
      } catch (error) {
        alert('Error deleting book: ' + error.message)
      }
    }
  }

  const handleViewBook = (book) => {
    navigate(`/book/${book.id}`, { state: { book, type: 'local' } })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  // Access denied for non-admin users
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <br/>
                        <br/>
                        <br/>
                        <br/>
        <Card className="p-8 text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            {!user 
              ? 'You need to sign in to access the admin panel.'
              : 'You do not have administrator privileges to access this page.'
            }
          </p>
          <Button onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your local book collection</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {profile?.full_name || user.email}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Books</p>
                <p className="text-2xl font-bold text-gray-900">{books.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recently Added</p>
                <p className="text-2xl font-bold text-gray-900">
                  {books.filter(book => {
                    const bookDate = new Date(book.created_at)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return bookDate > weekAgo
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-secondary-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {[...new Set(books.map(book => book.category).filter(Boolean))].length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-accent-600" />
            </div>
          </Card>
        </div>

        {/* Add Book Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="mb-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Book
          </Button>
        </div>

        {/* Add/Edit Book Form */}
        {showAddForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <Input
                  label="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                />
                <Input
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
                <Input
                  label="Publisher"
                  value={formData.publisher}
                  onChange={(e) => setFormData({...formData, publisher: e.target.value})}
                />
                <Input
                  label="Published Date"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                />
                <Input
                  label="Page Count"
                  type="number"
                  value={formData.pageCount}
                  onChange={(e) => setFormData({...formData, pageCount: e.target.value})}
                />
              </div>
              
              <Input
                label="Cover Image URL"
                value={formData.coverImage}
                onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                placeholder="https://example.com/cover.jpg"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter book description..."
                />
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit">
                  {editingBook ? 'Update Book' : 'Add Book'}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingBook(null)
                    setFormData({
                      title: '',
                      author: '',
                      description: '',
                      coverImage: '',
                      category: '',
                      publisher: '',
                      publishedDate: '',
                      pageCount: ''
                    })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Books List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Local Books</h2>
          
          {booksLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Books Added Yet</h3>
              <p className="text-gray-500 mb-4">Start building your local collection by adding your first book.</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Book
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="pb-3 font-medium text-gray-900">Title</th>
                    <th className="pb-3 font-medium text-gray-900">Author</th>
                    <th className="pb-3 font-medium text-gray-900">Category</th>
                    <th className="pb-3 font-medium text-gray-900">Added</th>
                    <th className="pb-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border-b border-gray-100">
                      <td className="py-4 font-medium text-gray-900">{book.title}</td>
                      <td className="py-4 text-gray-600">{book.author}</td>
                      <td className="py-4">
                        {book.category && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                            {book.category}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-gray-600">
                        {new Date(book.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewBook(book)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(book)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(book.id)}
                            className="text-error-600 hover:text-error-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default AdminPage