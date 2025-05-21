import React from 'react';
import { Calendar, Clock, User, ArrowLeft, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';
import { getAssetPath } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Simple translation function (can be replaced with your i18n system)
const translations: Record<string, string> = {
  'blog.readTime': 'min read',
  'blog.backToBlog': 'Back to Blog',
  'blog.imagePlaceholder': 'Image not available',
};

const t = (key: string): string => translations[key] || key;

// Custom CSS for blog content
const blogContentStyles = `
  .blog-content h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .blog-content h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .blog-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .blog-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .blog-content ul, .blog-content ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .blog-content ul {
    list-style-type: disc;
  }
  
  .blog-content ol {
    list-style-type: decimal;
  }
  
  .blog-content li {
    margin-bottom: 0.5rem;
  }
  
  .blog-content a {
    color: #3b82f6;
    text-decoration: underline;
  }
  
  .blog-content blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    font-style: italic;
    margin: 1rem 0;
  }
  
  .blog-content code {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  .blog-content pre {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .blog-content img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 0.5rem;
    display: block;
  }
  
  .blog-content strong {
    font-weight: 700;
  }
  
  .blog-content em {
    font-style: italic;
  }
  
  .image-placeholder {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    margin: 1.5rem auto;
    width: 100%;
    max-width: 600px;
    height: 300px;
    color: #6b7280;
  }
  
  .dark .image-placeholder {
    background-color: #1e293b;
    color: #9ca3af;
  }
`;

// Image component with placeholder
const ImageComponent = ({ src, alt }: { src?: string; alt?: string }) => {
  if (!src) {
    return (
      <div className="image-placeholder">
        <ImageIcon size={48} />
        <span className="mt-4 text-center block">{t('blog.imagePlaceholder')}</span>
        {alt && <span className="mt-2 text-sm text-muted-foreground/70 block">{alt}</span>}
      </div>
    );
  }

  // Use Next.js Image component with unoptimized prop for static export
  return (
    <div className="relative w-full h-auto min-h-[200px]">
      <Image 
        src={getAssetPath(src)} 
        alt={alt || ''} 
        className="rounded-lg" 
        fill
        style={{ objectFit: 'contain' }}
        unoptimized={true} // Important for static export
      />
    </div>
  );
};

interface BlogPostPageProps {
  post: BlogPost;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-background">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-x-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>
            
            {post.image && (
              <div className="relative w-full h-auto aspect-video overflow-hidden rounded-lg mb-8">
                <ImageComponent src={post.image} alt={post.title} />
              </div>
            )}
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />
          
          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                img: ({ node, ...props }) => <ImageComponent src={props.src} alt={props.alt} />,
                // Remove h1 from the content since we already display it in the header
                h1: () => null,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
};

export default BlogPostPage;
