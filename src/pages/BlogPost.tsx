import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { getBlogPostBySlug, blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = getBlogPostBySlug(slug || '');
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-4">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')}>
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title={post.seoTitle}
        description={post.seoDescription}
        keywords={post.seoKeywords.join(', ')}
        image={post.image}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="article"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <Badge className="bg-orange-600">{post.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishDate)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            
            {post.titleHindi && (
              <h2 className="text-xl lg:text-2xl text-orange-600 font-medium mb-4">
                {post.titleHindi}
              </h2>
            )}
            
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop';
              }}
            />
          </div>

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-6 lg:p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\n/g, '<br>')
                    .replace(/#{1,6}\s(.+)/g, (match, title) => {
                      const level = match.indexOf(' ');
                      return `<h${level} class="text-${4-level}xl font-bold text-gray-800 mt-8 mb-4">${title}</h${level}>`;
                    })
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/- (.+)/g, '<li>$1</li>')
                    .replace(/(\d+)\. (.+)/g, '<li>$2</li>')
                }}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{post.author}</h4>
                  <p className="text-gray-600">
                    Expert contributor at Prayan Masale, sharing knowledge about authentic Indian spices and healthy cooking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=150&fit=crop';
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Try These Spices?
              </h3>
              <p className="text-orange-100 mb-6">
                Get premium organic spices delivered to your doorstep. 
                Experience the authentic taste and health benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/shop')}
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  Shop Spices
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/recipes')}
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  View Recipes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;