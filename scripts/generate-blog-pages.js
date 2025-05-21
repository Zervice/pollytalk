/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
/* eslint-enable @typescript-eslint/no-require-imports */

// Paths
const contentDir = path.join(process.cwd(), 'src/content/blog');
const outputDir = path.join(process.cwd(), 'src/app/blog');

// Create blog directories if they don't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all blog posts
const getBlogPosts = () => {
  const fileNames = fs.readdirSync(contentDir);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        slug,
        content: matterResult.content,
        ...matterResult.data,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

// Generate blog pages
const generateBlogPages = () => {
  const posts = getBlogPosts();
  
  posts.forEach((post) => {
    const blogDir = path.join(outputDir, post.slug);
    
    // Create directory for this blog post
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    
    // Create page.tsx file for this blog post
    const pageContent = `
import { getBlogPostBySlug } from '@/lib/blog';
import { Metadata } from 'next';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Generate metadata for this blog post
export const metadata: Metadata = {
  title: '${post.title} - PollyTalkie',
  description: '${post.description.replace(/'/g, "\\'")}',
};

// Simple translation function (can be replaced with your i18n system)
const translations: Record<string, string> = {
  'blog.readTime': 'min read',
  'blog.backToBlog': 'Back to Blog',
  'blog.imagePlaceholder': 'Image not available',
};

const t = (key: string): string => translations[key] || key;

// Custom CSS for blog content
const blogContentStyles = \`
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
\`;

export default function BlogPostPage() {
  const post = getBlogPostBySlug('${post.slug}');
  
  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Blog Post Not Found
          </h1>
          <p className="mt-4 text-muted-foreground">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog/" className="mt-8 inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-background">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog/" className="inline-flex items-center text-primary hover:underline">
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
              <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg mb-8">
                <Image 
                  src={getAssetPath(post.image)} 
                  alt={post.title} 
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized={true} // Important for static export
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />
          
          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                img: ({ node, ...props }) => (
                  <div className="relative w-full h-auto min-h-[200px] my-6">
                    <Image 
                      src={getAssetPath(props.src || '')} 
                      alt={props.alt || ''} 
                      fill
                      style={{ objectFit: 'contain' }}
                      unoptimized={true} // Important for static export
                      className="rounded-lg"
                    />
                  </div>
                ),
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
}
`;
    
    fs.writeFileSync(path.join(blogDir, 'page.tsx'), pageContent.trim());
    console.log(`Generated page for ${post.slug}`);
  });
  
  console.log('All blog pages generated successfully!');
};

// Run the generator
generateBlogPages();
