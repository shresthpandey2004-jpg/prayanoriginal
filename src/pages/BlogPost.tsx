import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { getBlogPostBySlug } from '@/data/blogPosts';
import '@/styles/blog.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title={post.seoTitle}
        description={post.seoDescription}
        keywords={post.seoKeywords.join(', ')}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="article"
        image={post.image}
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/blog" 
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            {post.titleHindi && (
              <p className="text-xl text-orange-600 font-medium mb-6">
                {post.titleHindi}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg mb-8"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop';
              }}
            />
          </header>

          {/* Article Content */}
          <div className="max-w-none">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="blog-content">
                {post.content.split('\n\n').map((section, index) => {
                  const trimmedSection = section.trim();
                  
                  if (!trimmedSection) return null;
                  
                  // Handle main headings
                  if (trimmedSection.startsWith('# ')) {
                    return (
                      <h1 key={index}>
                        {trimmedSection.replace('# ', '')}
                      </h1>
                    );
                  }
                  
                  // Handle sub headings
                  if (trimmedSection.startsWith('## ')) {
                    return (
                      <h2 key={index}>
                        {trimmedSection.replace('## ', '')}
                      </h2>
                    );
                  }
                  
                  // Handle sub-sub headings
                  if (trimmedSection.startsWith('### ')) {
                    return (
                      <h3 key={index}>
                        {trimmedSection.replace('### ', '')}
                      </h3>
                    );
                  }
                  
                  // Handle recipe boxes
                  if (trimmedSection.includes('**Ingredients:**') || trimmedSection.includes('**Instructions:**')) {
                    return (
                      <div key={index} className="recipe-box">
                        {trimmedSection.split('\n').map((line, lineIndex) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return (
                              <h4 key={lineIndex} className="text-green-700 font-semibold text-lg mb-3">
                                {line.replace(/\*\*/g, '')}
                              </h4>
                            );
                          }
                          if (line.startsWith('- ')) {
                            return (
                              <div key={lineIndex} className="ingredients-list">
                                <ul>
                                  <li>{line.replace('- ', '')}</li>
                                </ul>
                              </div>
                            );
                          }
                          if (/^\d+\./.test(line)) {
                            return (
                              <ol key={lineIndex} className="instructions-list">
                                <li>{line.replace(/^\d+\.\s/, '')}</li>
                              </ol>
                            );
                          }
                          return line ? <p key={lineIndex}>{line}</p> : null;
                        })}
                      </div>
                    );
                  }
                  
                  // Handle bullet points
                  if (trimmedSection.includes('\n- ') || trimmedSection.startsWith('- ')) {
                    const items = trimmedSection.split('\n').filter(item => item.trim().startsWith('- '));
                    return (
                      <ul key={index} className="space-y-2 mb-6">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-orange-500 mr-3 mt-1">•</span>
                            <span>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  
                  // Handle numbered lists
                  if (/^\d+\./.test(trimmedSection) || trimmedSection.includes('\n1.')) {
                    const items = trimmedSection.split('\n').filter(item => /^\d+\./.test(item.trim()));
                    return (
                      <ol key={index} className="instructions-list space-y-3 mb-6">
                        {items.map((item, i) => (
                          <li key={i}>
                            {item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  
                  // Handle highlighted content
                  if (trimmedSection.includes('**') && trimmedSection.length < 200) {
                    return (
                      <div key={index} className="blog-highlight">
                        <p className="font-semibold text-orange-800 mb-0">
                          {trimmedSection.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </p>
                      </div>
                    );
                  }
                  
                  // Regular paragraphs with bold text support
                  return (
                    <p key={index} className="mb-4">
                      {trimmedSection.split('**').map((part, i) => 
                        i % 2 === 1 ? 
                          <strong key={i} className="font-semibold text-gray-800">{part}</strong> : 
                          part
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Category: <span className="font-medium">{post.category}</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Share Article
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
                  Subscribe to Blog
                </Button>
              </div>
            </div>
          </footer>
        </article>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;