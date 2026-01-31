import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { blogPosts, getBlogCategories, getPostsByCategory, getFeaturedPosts } from '@/data/blogPosts';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...getBlogCategories()];
  const featuredPosts = getFeaturedPosts();
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title="Blog - Spice Knowledge & Recipes | Prayan Masale"
        description="Discover the world of spices with Prayan Masale's blog. Learn about health benefits, cooking tips, authentic recipes, and spice storage guides from our experts."
        keywords="spice blog, cooking tips, health benefits of spices, indian recipes, organic spices, spice storage, turmeric benefits, cooking guides"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="website"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Spice Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the secrets of authentic Indian spices, learn healthy cooking tips, 
            and explore traditional recipes with Prayan Masale's expert guides.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'All' && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=300&fit=crop';
                      }}
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600">
                      Featured
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.titleHindi && (
                      <p className="text-orange-600 font-medium mb-2">
                        {post.titleHindi}
                      </p>
                    )}
                    <p className="text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {searchTerm ? `Search Results (${filteredPosts.length})` : 
             selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchTerm ? 'No articles found matching your search.' : 'No articles in this category yet.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=200&fit=crop';
                      }}
                    />
                    <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.titleHindi && (
                      <p className="text-orange-600 text-sm font-medium mb-2">
                        {post.titleHindi}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">{post.author}</span>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Stay Updated with Spice Knowledge
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest articles, recipes, and spice tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button className="bg-orange-600 hover:bg-orange-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;