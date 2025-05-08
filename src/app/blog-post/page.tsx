'use client'

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User, Image as ImageIcon } from "lucide-react"
import { useI18n } from "@/i18n/i18n-context"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { getAssetPath } from '@/lib/utils'

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
const ImagePlaceholder = ({ src, alt, t }: { src: string, alt: string, t: unknown }) => {
  const [error, setError] = useState(false);
  const { t: translate } = useI18n();

  useEffect(() => {
    if (src) {
      // Use the HTMLImageElement for checking if image exists
      const img = document.createElement('img');
      img.onload = () => setError(false);
      img.onerror = () => setError(true);
      img.src = getAssetPath(src);
    } else {
      setError(true);
    }
  }, [src]);

  if (error) {
    return (
      <div className="image-placeholder">
        <ImageIcon size={48} strokeWidth={1.5} />
        <span className="mt-4 text-center block">{translate('blog.imagePlaceholder')}</span>
        {alt && <span className="mt-2 text-sm text-muted-foreground/70 block">{alt}</span>}
      </div>
    );
  }

  // Use Next.js Image component for better performance
  return (
    <div className="relative w-full h-auto min-h-[200px] rounded-lg overflow-hidden">
      <Image 
        src={getAssetPath(src)} 
        alt={alt || ''} 
        className="rounded-lg" 
        fill 
        style={{ objectFit: 'contain' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

// Types for ReactMarkdown components
type ReactMarkdownComponentProps = {
  node?: {
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: Array<{
      tagName?: string;
      properties?: Record<string, unknown>;
    }>;
  };
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  [key: string]: unknown;
}

// Create a wrapper component for markdown components to properly use hooks
const MarkdownComponentsWrapper = () => {
  const { t } = useI18n();
  
  // Custom components for ReactMarkdown
  const components: Record<string, React.ComponentType<ReactMarkdownComponentProps>> = {
    // Override img to use our custom ImagePlaceholder
    img({ node, ...props }: ReactMarkdownComponentProps) {
      return <ImagePlaceholder src={props.src || ''} alt={props.alt || ''} t={t} />;
    },
    
    // Remove h1 from the content since we already display it in the header
    h1() {
      return null;
    },
    
    // Override paragraph to handle images properly
    p({ node, children, ...props }: ReactMarkdownComponentProps) {
      if (
        node?.children?.length === 1 &&
        node?.children[0].tagName === 'img'
      ) {
        const image = node.children[0];
        
        return (
          <ImagePlaceholder 
            src={image.properties?.src as string || ''} 
            alt={image.properties?.alt as string || ''} 
            t={t}
          />
        );
      }
      
      return <p {...props}>{children}</p>;
    }
  };
  
  return components;
}

// Mock blog posts data for static rendering
const staticBlogPosts: BlogPost[] = [
  {
    title: "The Science Behind Language Learning with AI",
    description: "Discover how artificial intelligence is revolutionizing the way we learn languages and making the process more efficient and personalized.",
    image: "/blog/ai-learning.jpg",
    author: "Dr. Sarah Chen",
    date: "Feb 20, 2025",
    readTime: "5 min read",
    category: "Technology",
    slug: "science-behind-language-learning-ai",
    content: "# The Science Behind Language Learning with AI\n\nArtificial intelligence is transforming how we approach language learning, making it more personalized and effective than ever before.\n\n## How AI Personalizes Language Learning\n\nOne of the most significant advantages of AI in language learning is its ability to adapt to each learner's needs. Traditional language courses follow a one-size-fits-all approach, but AI can:\n\n- Analyze your learning patterns and adjust difficulty accordingly\n- Focus on words and phrases you struggle with\n- Provide personalized feedback on pronunciation and grammar\n- Adapt to your learning pace\n\n## Neural Networks and Language Processing\n\nModern AI language tools use sophisticated neural networks that can understand context and nuance in ways that weren't possible just a few years ago. These systems can:\n\n1. Process natural language in real-time\n2. Understand different accents and dialects\n3. Recognize speech patterns and provide targeted feedback\n4. Generate authentic, contextually appropriate responses\n\n## The Role of Spaced Repetition\n\nAI systems excel at implementing scientifically-proven learning techniques like spaced repetition. This method presents information at optimal intervals to maximize retention:\n\n> \"Spaced repetition is far more effective than cramming. When AI systems track exactly what you know and what you don't, they can schedule reviews at the perfect time to strengthen memory without wasting time on what you already know well.\"\n\n## Real-time Feedback and Correction\n\nPerhaps the most valuable aspect of AI language learning is the ability to receive immediate feedback. When you make a mistake in pronunciation or grammar, AI systems can:\n\n- Highlight the specific error\n- Demonstrate the correct form\n- Explain the underlying rule\n- Provide additional practice focused on that particular challenge\n\n## The Future of AI in Language Learning\n\nAs AI technology continues to advance, we can expect even more sophisticated language learning tools that:\n\n- Create immersive virtual reality environments for language practice\n- Develop more natural conversational abilities\n- Adapt to emotional cues and learning preferences\n- Integrate with real-world contexts through augmented reality\n\nThe combination of AI technology with established language learning science is creating unprecedented opportunities for efficient, effective, and enjoyable language acquisition."
  },
  {
    title: "5 Tips for Maintaining Language Learning Motivation",
    description: "Stay motivated on your language learning journey with these proven strategies and practical tips for consistent progress.",
    image: "/blog/motivation.jpg",
    author: "Michael Rodriguez",
    date: "Feb 15, 2025",
    readTime: "4 min read",
    category: "Learning Tips",
    slug: "tips-maintaining-language-learning-motivation",
    content: "# 5 Tips for Maintaining Language Learning Motivation\n\nStaying motivated is often the biggest challenge in language learning. Here are five proven strategies to keep your enthusiasm high and make consistent progress.\n\n## 1. Set Clear, Achievable Goals\n\nVague goals like \"become fluent\" can be overwhelming. Instead, break down your language journey into specific, measurable objectives:\n\n- Complete one chapter in your textbook each week\n- Learn 10 new vocabulary words daily\n- Have a 5-minute conversation with a native speaker twice a week\n- Watch one episode of a TV show in your target language without subtitles\n\nCelebrate these small victories to maintain momentum and see tangible progress.\n\n## 2. Make It Relevant to Your Interests\n\nLanguage learning becomes significantly more engaging when it connects to topics you already enjoy:\n\n- If you love cooking, follow recipes in your target language\n- Sports fans can watch matches with commentary in the language they're learning\n- Music lovers can translate lyrics from their favorite songs\n- Gamers can play games set to their target language\n\n> \"The best language learning happens when you forget you're studying and simply enjoy content in your target language.\"\n\n## 3. Establish a Consistent Routine\n\nConsistency trumps intensity when it comes to language acquisition:\n\n- Set aside specific times each day for language practice\n- Even 15 minutes daily is better than a 3-hour session once a week\n- Track your study streaks to build a habit\n- Create a dedicated study space that puts you in the right mindset\n\n## 4. Find a Community\n\nLanguage learning doesn't have to be a solitary activity:\n\n1. Join online language exchange groups\n2. Participate in virtual or in-person language meetups\n3. Find a study buddy for accountability\n4. Share your progress on social media or language learning forums\n\nThe social aspect not only makes learning more enjoyable but also provides valuable practice opportunities and feedback.\n\n## 5. Embrace the Cultural Context\n\nLanguages exist within rich cultural contexts. Exploring the culture associated with your target language can significantly boost motivation:\n\n- Watch films and TV shows from countries where the language is spoken\n- Try cooking traditional dishes using recipes in your target language\n- Learn about holidays, traditions, and customs\n- Plan a future trip to a region where the language is spoken\n\nWhen you connect with the culture, the language becomes more than just vocabulary and grammar—it becomes a gateway to new experiences and perspectives."
  },
  {
    title: "The Role of Conversation in Language Acquisition",
    description: "Understanding why conversation practice is crucial for language learning and how it affects your brain's language processing.",
    image: "/blog/conversation.jpg",
    author: "Dr. Emma Wilson",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    category: "Research",
    slug: "role-conversation-language-acquisition",
    content: "# The Role of Conversation in Language Acquisition\n\nConversation is not just one aspect of language learning—it may be the most crucial element for achieving true fluency. Research consistently shows that interactive speaking practice creates neural pathways that textbooks alone simply cannot develop.\n\n## The Neurological Impact of Conversation\n\nWhen you engage in conversation, your brain processes language differently than when reading or listening passively:\n\n- Multiple brain regions activate simultaneously\n- Your brain must process information in real-time\n- Neural connections form between comprehension and production areas\n- Stress responses create stronger memory formation\n\n## Why Conversation Accelerates Learning\n\nConversational practice provides unique benefits that other forms of study cannot replicate:\n\n### 1. Real-time Processing\n\nConversation forces your brain to understand and respond without the luxury of pausing or rewinding:\n\n> \"The pressure of real-time interaction creates cognitive demands that strengthen neural pathways responsible for language processing. This is why many learners who excel at reading and writing still struggle with speaking until they've had sufficient conversational practice.\"\n\n### 2. Contextual Learning\n\nConversations naturally provide rich context for vocabulary and grammar:\n\n- Words and phrases are connected to real situations\n- Emotional responses strengthen memory formation\n- Social cues reinforce appropriate usage\n- Immediate feedback corrects misconceptions\n\n### 3. Pronunciation Development\n\nSpeaking aloud is essential for training the physical aspects of language production:\n\n1. Mouth and tongue muscle memory development\n2. Phonological awareness improvement\n3. Prosody and rhythm acquisition\n4. Accent reduction through feedback and adjustment\n\n## Overcoming Conversation Anxiety\n\nMany language learners avoid conversation due to anxiety, creating a significant barrier to progress. Research-backed strategies to overcome this include:\n\n- Starting with structured conversations using prepared phrases\n- Practicing with other learners before native speakers\n- Using AI conversation partners for low-pressure practice\n- Focusing on communication rather than perfection\n\n## Implementing Effective Conversation Practice\n\nTo maximize the benefits of conversational practice:\n\n- Aim for regular, shorter conversations rather than occasional long ones\n- Record yourself to identify patterns in errors and improvements\n- Practice with different partners to adapt to various speaking styles\n- Focus on topics you're passionate about to maintain engagement\n\nThe research is clear: while reading, listening, and grammar study are important, conversation is the catalyst that transforms passive knowledge into active language ability. By prioritizing interactive speaking practice, you can significantly accelerate your journey to fluency."
  }
];

export default function BlogPostPage() {
  const { t } = useI18n();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mainImageError, setMainImageError] = useState(false);
  
  // Get the slug from the query parameters
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  
  useEffect(() => {
    if (!slug) {
      setError(true);
      setLoading(false);
      return;
    }
    
    // First try to find the post in our static data
    const staticPost = staticBlogPosts.find(post => post.slug === slug);
    
    if (staticPost) {
      setPost(staticPost);
      setLoading(false);
    } else {
      // If not found in static data, try to fetch from API
      const fetchPost = async () => {
        try {
          // For GitHub Pages compatibility, we're using static data
          // In a real app with a backend, you would fetch from an API
          setError(true);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching blog post:", err);
          setError(true);
          setLoading(false);
        }
      };
      
      fetchPost();
    }
  }, [slug]);
  
  // Check if the main image exists
  useEffect(() => {
    if (post?.image) {
      // Use the HTMLImageElement for checking if image exists
      const img = document.createElement('img');
      img.onload = () => setMainImageError(false);
      img.onerror = () => setMainImageError(true);
      img.src = getAssetPath(post.image);
    }
  }, [post]);
  
  if (loading) {
    return (
      <div className="container py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-muted rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('blog.postNotFound')}</h1>
        <p className="mb-6 text-muted-foreground">{t('blog.backToBlog')}</p>
        <Link href="/blog">
          <Button variant="default">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />
      
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Button>
        </Link>
      </div>
      
      {/* Blog post header */}
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {post.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4"
        >
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground mb-6"
        >
          {post.description}
        </motion.p>
      </div>
      
      {/* Featured image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        {mainImageError ? (
          <div className="image-placeholder">
            <ImageIcon size={64} strokeWidth={1.5} />
            <span className="mt-4 text-center block">{t('blog.imagePlaceholder')}</span>
          </div>
        ) : (
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image 
              src={getAssetPath(post.image)} 
              alt={post.title} 
              className="rounded-lg" 
              fill 
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        )}
      </motion.div>
      
      {/* Blog content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="blog-content prose prose-lg dark:prose-invert max-w-none"
      >
        <ReactMarkdown
          components={MarkdownComponentsWrapper()}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>
      
      {/* Share section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t"
      >
        <h3 className="text-xl font-bold mb-4">{t('blog.shareThisPost')}</h3>
        <div className="flex gap-4">
          {/* Social share buttons would go here */}
          <Button variant="outline" size="sm">Twitter</Button>
          <Button variant="outline" size="sm">Facebook</Button>
          <Button variant="outline" size="sm">LinkedIn</Button>
        </div>
      </motion.div>
    </div>
  );
}
