import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, User, Calendar, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser] = useState({ id: 1, name: 'John Doe', email: 'john@example.com' });

  // Mock data for demonstration
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: 'Getting Started with React Hooks',
        content: 'React Hooks have revolutionized the way we write React components. In this comprehensive guide, we\'ll explore useState, useEffect, and custom hooks. Hooks allow you to use state and other React features without writing a class component. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.',
        author: { name: 'Jane Smith', id: 2 },
        createdAt: '2024-01-15T10:30:00Z',
        likes: 42,
        comments: 8,
        views: 156,
        tags: ['React', 'JavaScript', 'Frontend']
      },
      {
        id: 2,
        title: 'Building Scalable Node.js Applications',
        content: 'Node.js has become the backbone of modern web development. Learn how to structure your applications for maximum scalability and maintainability. We\'ll cover best practices for organizing code, handling errors, implementing authentication, and optimizing performance. From setting up your development environment to deploying to production, this guide covers everything you need to know.',
        author: { name: 'Mike Johnson', id: 3 },
        createdAt: '2024-01-12T14:20:00Z',
        likes: 38,
        comments: 12,
        views: 203,
        tags: ['Node.js', 'Backend', 'JavaScript']
      },
      {
        id: 3,
        title: 'Modern CSS Techniques and Best Practices',
        content: 'CSS has evolved tremendously over the years. Discover the latest techniques including CSS Grid, Flexbox, custom properties, and modern layout methods. We\'ll explore how to create responsive designs that work across all devices, implement dark mode, and use CSS-in-JS solutions. This post also covers performance optimization and accessibility considerations.',
        author: { name: 'Sarah Wilson', id: 4 },
        createdAt: '2024-01-10T09:15:00Z',
        likes: 29,
        comments: 6,
        views: 98,
        tags: ['CSS', 'Design', 'Frontend']
      }
    ];
    setPosts(mockPosts);
  }, []);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: currentUser,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        views: 0,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', tags: '' });
      setIsWriting(false);
      setCurrentView('home');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const PostCard = ({ post, isPreview = true }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        <h2 
          className={`font-bold text-gray-900 mb-3 ${isPreview ? 'text-xl cursor-pointer hover:text-blue-600' : 'text-2xl'}`}
          onClick={() => isPreview && (setSelectedPost(post), setCurrentView('post'))}
        >
          {post.title}
        </h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {isPreview ? `${post.content.substring(0, 200)}...` : post.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{post.views}</span>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );

  const WritePost = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a New Post</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your post title..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tags separated by commas..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write your post content here..."
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Publish Post
            </button>
            <button
              onClick={() => (setIsWriting(false), setCurrentView('home'))}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                BlogSpace
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button
                onClick={() => (setCurrentView('write'), setIsWriting(true))}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Write</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to BlogSpace
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover amazing stories, insights, and knowledge from our community of writers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'post' && selectedPost && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setCurrentView('home')}
              className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Posts
            </button>
            <PostCard post={selectedPost} isPreview={false} />
            
            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="ml-2 font-semibold text-gray-900">Alex Chen</span>
                    <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700">Great article! This really helped me understand the concepts better.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="ml-2 font-semibold text-gray-900">Emma Davis</span>
                    <span className="ml-2 text-sm text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-gray-700">Thanks for sharing this! Looking forward to more content like this.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write a comment..."
                />
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'write' && <WritePost />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BlogSpace</h3>
              <p className="text-gray-400">A modern blogging platform built with MERN stack technology.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Create Posts</li>
                <li>Search & Filter</li>
                <li>Comments</li>
                <li>User Profiles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Guidelines</li>
                <li>Support</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlogSpace. Built with React, Node.js, Express, and MongoDB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogApp;
