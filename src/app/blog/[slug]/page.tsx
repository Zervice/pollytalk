'use client'

import { useParams } from 'next/navigation'
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User, Image as ImageIcon } from "lucide-react"
import { useI18n } from "@/i18n/i18n-context"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'

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

// Custom Markdown Renderer
const CustomMarkdownRenderer = ({ content }: { content: string }) => {
  const { t } = useI18n();
  
  if (!content) return null;
  
  // Remove frontmatter if present
  let processedContent = content;
  if (processedContent.startsWith('---')) {
    const endOfFrontmatter = processedContent.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      processedContent = processedContent.substring(endOfFrontmatter + 3).trim();
    }
  }
  
  // Process the content line by line for better control
  const lines = processedContent.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let currentOrderedList: string[] = [];
  let inList = false;
  let inOrderedList = false;
  let foundFirstH1 = false;
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (trimmedLine === '') {
      // If we were building a paragraph, finish it
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      // If we were in a list, finish it
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3">
            {currentList.map((item, idx) => (
              <li key={`li-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      
      // If we were in an ordered list, finish it
      if (inOrderedList && currentOrderedList.length > 0) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3">
            {currentOrderedList.map((item, idx) => (
              <li key={`oli-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        currentOrderedList = [];
        inOrderedList = false;
      }
      
      continue;
    }
    
    // Handle headers
    if (trimmedLine.startsWith('# ')) {
      // Skip the first H1 heading since it's already displayed in the page header
      if (!foundFirstH1) {
        foundFirstH1 = true;
        continue;
      }
      
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      // Finish any open list
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3">
            {currentList.map((item, idx) => (
              <li key={`li-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      
      // Finish any open ordered list
      if (inOrderedList && currentOrderedList.length > 0) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3">
            {currentOrderedList.map((item, idx) => (
              <li key={`oli-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        currentOrderedList = [];
        inOrderedList = false;
      }
      
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-3xl font-bold my-6">
          {formatInlineMarkdown(trimmedLine.substring(2))}
        </h1>
      );
      continue;
    }
    
    // Handle h2
    if (trimmedLine.startsWith('## ')) {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      // Finish any open list
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3">
            {currentList.map((item, idx) => (
              <li key={`li-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      
      // Finish any open ordered list
      if (inOrderedList && currentOrderedList.length > 0) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3">
            {currentOrderedList.map((item, idx) => (
              <li key={`oli-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        currentOrderedList = [];
        inOrderedList = false;
      }
      
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-2xl font-bold my-4">
          {formatInlineMarkdown(trimmedLine.substring(3))}
        </h2>
      );
      continue;
    }
    
    // Handle h3
    if (trimmedLine.startsWith('### ')) {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      // Finish any open list
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3">
            {currentList.map((item, idx) => (
              <li key={`li-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      
      // Finish any open ordered list
      if (inOrderedList && currentOrderedList.length > 0) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3">
            {currentOrderedList.map((item, idx) => (
              <li key={`oli-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        currentOrderedList = [];
        inOrderedList = false;
      }
      
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-xl font-semibold my-3">
          {formatInlineMarkdown(trimmedLine.substring(4))}
        </h3>
      );
      continue;
    }
    
    // Handle unordered lists
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      // Finish any open ordered list
      if (inOrderedList && currentOrderedList.length > 0) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3">
            {currentOrderedList.map((item, idx) => (
              <li key={`oli-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
        currentOrderedList = [];
        inOrderedList = false;
      }
      
      inList = true;
      const listItemContent = trimmedLine.substring(2);
      currentList.push(listItemContent);
      continue;
    }
    
    // Handle ordered lists (numbered lists)
    const orderedListMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/);
    if (orderedListMatch) {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      // Finish any open unordered list
      if (inList && currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3">
            {currentList.map((item, idx) => (
              <li key={`li-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
      
      inOrderedList = true;
      const listItemContent = orderedListMatch[2];
      currentOrderedList.push(listItemContent);
      continue;
    }
    
    // Handle horizontal rules
    if (trimmedLine === '---' || trimmedLine === '***' || trimmedLine === '___') {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      elements.push(<hr key={`hr-${elements.length}`} className="my-6 border-t border-border" />);
      continue;
    }
    
    // Handle images
    const imageMatch = trimmedLine.match(/^!\[(.*)\]\((.*)\)$/);
    if (imageMatch) {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      const alt = imageMatch[1];
      const src = imageMatch[2];
      
      elements.push(
        <div key={`img-${elements.length}`} className="my-6">
          <ImagePlaceholder src={src} alt={alt} t={t} />
        </div>
      );
      continue;
    }
    
    // Handle blockquotes
    if (trimmedLine.startsWith('> ')) {
      // Finish any open paragraph
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>
            {formatInlineMarkdown(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
      
      elements.push(
        <blockquote key={`quote-${elements.length}`} className="border-l-4 border-border pl-4 italic my-4">
          {formatInlineMarkdown(trimmedLine.substring(2))}
        </blockquote>
      );
      continue;
    }
    
    // Regular paragraph text
    currentParagraph.push(trimmedLine);
  }
  
  // Handle any remaining paragraph
  if (currentParagraph.length > 0) {
    elements.push(
      <p key={`p-${elements.length}`}>
        {formatInlineMarkdown(currentParagraph.join(' '))}
      </p>
    );
  }
  
  // Handle any remaining list
  if (inList && currentList.length > 0) {
    elements.push(
      <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-3">
        {currentList.map((item, idx) => (
          <li key={`li-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  }
  
  // Handle any remaining ordered list
  if (inOrderedList && currentOrderedList.length > 0) {
    elements.push(
      <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-3">
        {currentOrderedList.map((item, idx) => (
          <li key={`oli-${elements.length}-${idx}`}>{formatInlineMarkdown(item)}</li>
        ))}
      </ol>
    );
  }
  
  return <div className="blog-content">{elements}</div>;
};

// Image component with placeholder
const ImagePlaceholder = ({ src, alt, t }: { src: string, alt: string, t: any }) => {
  const [imgError, setImgError] = useState(false);
  
  if (!src || imgError) {
    return (
      <div className="image-placeholder">
        <ImageIcon size={48} strokeWidth={1.5} />
        <span className="mt-4 text-center block">{t('blog.imagePlaceholder')}</span>
        {alt && <span className="mt-2 text-sm text-muted-foreground/70 block">{alt}</span>}
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt || t('blog.imageAlt')} 
      onError={() => setImgError(true)}
      className="mx-auto rounded-lg"
    />
  );
};

// Format inline markdown (bold, italic, links)
const formatInlineMarkdown = (text: string) => {
  if (!text) return '';
  
  // Process the text for inline formatting
  let formattedText = text;
  
  // Replace bold text
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedText = formattedText.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Replace italic text
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Replace links
  formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
  
  // Replace inline code
  formattedText = formattedText.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
  
  return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export default function BlogPostPage() {
  const { t } = useI18n()
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mainImageError, setMainImageError] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog-posts/${slug}`)
          .catch(() => {
            throw new Error('API route not available');
          });
          
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post?.image) {
      // Reset error state when post changes
      setMainImageError(false);
      
      // Check if the image exists
      const img = new Image();
      img.onload = () => setMainImageError(false);
      img.onerror = () => setMainImageError(true);
      img.src = post.image;
    } else {
      setMainImageError(true);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p className="text-muted-foreground">{error || 'The requested blog post could not be found.'}</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />
      
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-x-4 text-sm">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
            {!mainImageError && post.image ? (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 border border-border rounded-lg">
                <div className="text-center p-6">
                  <ImageIcon size={64} strokeWidth={1.5} className="mx-auto text-muted-foreground mb-4" />
                  <span className="text-lg font-medium block mb-2">{t('blog.imagePlaceholder')}</span>
                  <span className="text-sm text-muted-foreground block max-w-md">{post.title}</span>
                </div>
              </div>
            )}
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <CustomMarkdownRenderer content={post.content} />
          </div>
        </div>

        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">{t('blog.shareThisPost')}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Twitter</Button>
            <Button variant="outline" size="sm">Facebook</Button>
            <Button variant="outline" size="sm">LinkedIn</Button>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
