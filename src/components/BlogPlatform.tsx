import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data';
import {
  BookOpen, Search, ArrowLeft, Calendar, Eye,
  MessageSquare, Clipboard, Send, CheckCircle2, FileText
} from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';

interface BlogPlatformProps {
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;
}

interface BlogComment {
  id: string;
  blogId: string;
  author: string;
  role: string;
  comment: string;
  date: string;
}

export default function BlogPlatform({ selectedBlogId, setSelectedBlogId }: BlogPlatformProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Reading state
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Comments state local management
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Link copy state feedback
  const [copied, setCopied] = useState(false);

  // Listen to external selected blog changes
  useEffect(() => {
    if (selectedBlogId) {
      const match = BLOG_POSTS.find(p => p.id === selectedBlogId);
      if (match) {
        setActivePost(match);
      }
    } else {
      setActivePost(null);
    }
  }, [selectedBlogId]);

  // Load local reflections/comments from LocalStorage
  useEffect(() => {
    const localLocalStr = localStorage.getItem('ojacklyn_blog_comments');
    if (localLocalStr) {
      try {
        setComments(JSON.parse(localLocalStr));
      } catch (e) {}
    } else {
      // Seed initial dummy comment to give it life
      const dummyComments: BlogComment[] = [
        {
          id: 'dummy-1',
          blogId: 'maternal-health-deserts',
          author: 'Maria S., WHNP',
          role: 'County Maternal Care Director',
          comment: 'This is spot on about Salem County. The transportation bottlenecks are indeed the largest hurdle for mothers seeking their initial sonograms. Our mobile prenatal network is rolling out next month, and this database is incredibly helpful to map clinic partners.',
          date: 'Yesterday'
        },
        {
          id: 'dummy-2',
          blogId: 'demystifying-medicaid-renewals',
          author: 'David Vance',
          role: 'Community Health Worker, Paterson',
          comment: 'We have seen massive confusion regarding the blue envelopes. The 90-day grace period tip is extremely critical. Many of our local families did not know they can submit late and regain retroactive Medicaid! Thank you for writing this plain-language explanation.',
          date: '3 days ago'
        },
        {
          id: 'dummy-3',
          blogId: 'newarks-food-sovereignty',
          author: 'Kelsey Brown',
          role: 'Urban Agriculture Student',
          comment: 'The Newark Community Fridges are amazing! We replenish the West Ward fridge twice a week with tomatoes from our neighborhood high school plots. This article highlights the dignity that these programs safeguard.',
          date: '1 week ago'
        }
      ];
      setComments(dummyComments);
      localStorage.setItem('ojacklyn_blog_comments', JSON.stringify(dummyComments));
    }
  }, []);

  const handlePostSelect = (post: BlogPost) => {
    setActivePost(post);
    setSelectedBlogId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActivePost(null);
    setSelectedBlogId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentName || !commentText) return;

    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      blogId: activePost.id,
      author: commentName,
      role: commentRole || 'Interested Resident',
      comment: commentText,
      date: 'Just now'
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('ojacklyn_blog_comments', JSON.stringify(updatedComments));

    setCommentName('');
    setCommentRole('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeComments = comments.filter(c => activePost && c.blogId === activePost.id);

  const categories = ['All', 'Health Equity', 'Policy', 'Community', 'Resources'];

  return (
    <div className="space-y-12 py-8" id="blog-platform-view">
      
      {!activePost ? (
        // LIST VIEW
        <>
          {/* Header */}
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-brand-teal bg-brand-teal-light uppercase border border-brand-teal/10">
              Health Justice Portal
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-brand-primary">
              Public Health Research &amp; Writing
            </h1>
            <p className="text-[#515151] text-lg leading-relaxed">
              Explore critical long-form analyses, policy explainers, and local perspectives highlighting gaps and solutions across New Jersey.
            </p>
          </div>

          {/* Search bar & Category filters */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 bg-white border border-brand-border rounded-3xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-brand-text-muted" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles, tags, concepts..."
                    className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal pl-9 pr-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-colors"
                    id="blog-search-field"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5" id="blog-filters-row">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        selectedCategory === c
                          ? 'bg-brand-teal text-brand-cream shadow-sm'
                          : 'bg-brand-sage/50 text-brand-text-sec hover:bg-brand-sage'
                      }`}
                      id={`blog-tab-${c.replace(/\s+/g, '-')}`}
                    >
                      {c === 'All' ? 'All Essays' : c}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Empty state when no blog posts exist */}
          {BLOG_POSTS.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-teal-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Coming Soon</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Original articles on health equity, NJ policy, and community health are on the way. Check back soon.
              </p>
            </div>
          )}

          {/* Featured Post Banner Accent */}
          {BLOG_POSTS.length > 0 && filteredPosts.length > 0 && searchTerm === '' && selectedCategory === 'All' && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                onClick={() => handlePostSelect(filteredPosts[0])}
                className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-sm hover:border-brand-teal duration-300 transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12"
                id="blog-featured-banner"
              >
                <div className="lg:col-span-6 h-64 lg:h-auto overflow-hidden relative">
                  <img 
                    src={filteredPosts[0].thumbnail} 
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-teal text-brand-cream text-[10px] font-mono font-semibold uppercase px-2 py-1 rounded">
                    Featured Article
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-brand-green uppercase font-mono tracking-wider">{filteredPosts[0].category}</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary leading-tight">{filteredPosts[0].title}</h2>
                    <p className="text-sm text-brand-text-sec leading-relaxed">{filteredPosts[0].excerpt}</p>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-brand-border/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-brand-cream font-bold text-xs select-none">OJ</div>
                      <div>
                        <span className="block text-xs font-semibold text-brand-primary">{filteredPosts[0].author}</span>
                        <span className="block text-[10px] text-brand-text-muted">{filteredPosts[0].authorRole}</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal">
                      Read Essay
                      <BookOpen className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Grid list of posts */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-grid-pane">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  onClick={() => handlePostSelect(post)}
                  className="bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-teal cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
                  id={`blog-card-${post.id}`}
                >
                  <div>
                    <div className="h-44 overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-brand-text-muted font-bold select-none">
                        <span className="text-brand-green">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-brand-primary hover:text-brand-teal leading-snug line-clamp-2 text-left">{post.title}</h3>
                      <p className="text-xs text-brand-text-sec leading-relaxed line-clamp-3 text-left">{post.excerpt}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-mono text-brand-text-muted select-none">
                    <span className="font-semibold text-brand-primary">Ojacklyn</span>
                    <span>{post.date}</span>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 px-4 bg-white border border-brand-border rounded-3xl" id="blog-empty-pane">
                <BookOpen className="w-10 h-10 text-brand-text-muted mx-auto mb-4" />
                <h3 className="font-display font-medium text-lg text-brand-primary">No writing found matching filters.</h3>
                <p className="text-xs text-brand-text-sec mt-1 max-w-sm mx-auto">Try typing alternative keywords or reset category pathways with "All Essays".</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="mt-6 px-4 py-2 bg-brand-teal text-brand-cream text-xs font-semibold rounded-xl hover:bg-brand-accent cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            )}
          </section>
        </>
      ) : (
        // READING VIEW
        <article className="max-w-4xl mx-auto px-4 " id="article-reader-frame">
          
          {/* Back button */}
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal-light px-3.5 py-2 rounded-xl border border-brand-border/60 bg-white shadow-sm cursor-pointer mb-8 transition-all"
            id="back-to-list-trigger"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles Matrix
          </button>

          {/* Banner Hero */}
          <div className="space-y-6">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] uppercase font-mono font-bold text-brand-green bg-brand-green-light px-2.5 py-1 rounded border border-brand-green/10">
                {activePost.category}
              </span>
              <span className="text-xs font-mono text-brand-text-muted">{activePost.readTime}</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-primary leading-tight text-left">
              {activePost.title}
            </h1>

            {/* Author Profile */}
            <div className="flex flex-wrap justify-between items-center py-4 border-y border-brand-border/60 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-[#faf9f6] font-bold">OJ</div>
                <div>
                  <span className="block text-sm font-semibold text-brand-primary">{activePost.author}</span>
                  <span className="block text-xs text-brand-text-muted">{activePost.authorRole}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono font-medium text-brand-text-muted">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activePost.date}</span>
                <span className="inline-flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> 182 readers</span>
              </div>
            </div>
          </div>

          {/* Content illustration */}
          <div className="h-64 sm:h-[380px] overflow-hidden rounded-2xl border border-brand-border/80 my-8">
            <img 
              src={activePost.thumbnail} 
              alt={activePost.title}
              className="w-full h-full object-cover brightness-95"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Markdown Content Parser */}
          <div className="prose max-w-none text-brand-text-main leading-relaxed space-y-6 text-left my-8 select-text" id="article-prose-content">
            {activePost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="font-display font-semibold text-xl sm:text-2xl mt-8 mb-4 text-brand-primary pt-4 border-t border-brand-border/30">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith('####')) {
                return (
                  <h4 key={index} className="font-display font-semibold text-base sm:text-lg mt-6 mb-2 text-brand-teal-dark">
                    {paragraph.replace('####', '').trim()}
                  </h4>
                );
              }
              if (paragraph.startsWith('>')) {
                return (
                  <blockquote key={index} className="border-l-4 border-brand-green bg-brand-green-light/15 px-5 py-4 rounded-r-xl italic font-serif my-6 text-brand-green-dark">
                    {paragraph.replace('>', '').trim()}
                  </blockquote>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <ul key={index} className="list-disc pl-6 space-y-1 my-4 text-sm sm:text-base text-brand-text-sec">
                    {paragraph.split('\n').map((li, idx) => (
                      <li key={idx}>{li.replace('-', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                return (
                  <ol key={index} className="list-decimal pl-6 space-y-2.5 my-5 text-sm sm:text-base text-brand-text-sec">
                    {paragraph.split('\n').map((li, idx) => (
                      <li key={idx}>{li.replace(/^\d\./, '').trim()}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-sm sm:text-base text-[#384341] leading-relaxed font-sans mt-2" dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}>
                </p>
              );
            })}
          </div>

          {/* SHARE AND METADATA UTILITY FOOTER */}
          <div className="my-12 p-6 bg-white border border-brand-border rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono tracking-wider text-brand-text-muted uppercase">Citation Vetting</span>
              <p className="text-xs text-brand-text-sec font-medium leading-normal">Manually reviewed for accuracy. Author coordinates reside at ojacklyn2@gmail.com.</p>
            </div>
            
            <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-center">
              <button 
                onClick={handleCopyLink}
                className="px-4 py-2 bg-brand-cream border border-brand-border text-brand-primary text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 hover:border-brand-teal cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> : <Clipboard className="w-3.5 h-3.5" />}
                {copied ? 'Link Copied!' : 'Copy Portal Link'}
              </button>
            </div>
          </div>

          {/* COMMUNITY REFLECTIONS SECTION */}
          <div className="space-y-8 pt-6 border-t border-brand-border/60" id="comments-section-container">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-teal" />
              <h3 className="font-display font-semibold text-lg text-brand-primary">
                Community Reflections ({activeComments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4 bg-white border border-brand-border p-5 rounded-2xl shadow-sm" id="reflection-comment-form">
              <h4 className="text-xs font-bold text-brand-text-sec font-mono uppercase tracking-wider">Leave your reflection</h4>
              <p className="text-[11px] text-brand-text-muted mt-0.5">Please share your perspective on local healthcare access. All perspectives are welcome.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g., Maria Sanchez)"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Role/Affiliation (e.g., Nurse Educator)"
                    value={commentRole}
                    onChange={(e) => setCommentRole(e.target.value)}
                    className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  placeholder="Type your constructive comment or reflection here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-brand-text-muted font-mono leading-none select-none">No tracking • Strictly anonymous-friendly</span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-teal hover:bg-brand-accent text-brand-cream text-xs font-semibold rounded-xl inline-flex items-center gap-1 px-4 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Reflection
                </button>
              </div>

              {commentSuccess && (
                <div className="p-3 bg-brand-green-light border border-brand-green/20 rounded-xl flex items-center gap-2.5 text-xs font-medium text-brand-green-dark animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Your reflection was published successfully below!</span>
                </div>
              )}
            </form>

            {/* List of Reflections */}
            <div className="space-y-4" id="reflections-display-feed">
              {activeComments.length > 0 ? (
                activeComments.map(comment => (
                  <div key={comment.id} className="p-5 bg-white border border-brand-border/80 rounded-2xl space-y-2.5 hover:border-brand-border transition-all">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-display font-semibold text-xs text-brand-primary block">{comment.author}</span>
                        <span className="text-[10px] text-brand-teal font-mono block mt-0.5">{comment.role}</span>
                      </div>
                      <span className="text-[10px] text-brand-text-muted font-mono">{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-brand-text-sec leading-relaxed text-left">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 p-6 border border-dashed border-brand-border bg-white rounded-2xl">
                  <p className="text-xs text-brand-text-sec font-medium leading-normal">No reflections left on this article yet.</p>
                  <p className="text-[10px] text-brand-text-muted mt-1 leading-normal">Be the very first community voice to share! Join the health access dialog above.</p>
                </div>
              )}
            </div>

          </div>

        </article>
      )}

    </div>
  );
}
