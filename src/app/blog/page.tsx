'use client'

import { motion } from "framer-motion"
import { Clock, User } from "lucide-react"
import { useI18n } from "@/i18n/i18n-context"
import { useEffect, useState } from "react"
import { BlogPost, getBlogPosts } from "@/lib/blog"

export default function BlogPage() {
  const { t } = useI18n()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In client components, we need to fetch the blog posts on the client side
    // This is a simplified approach - in a production app, you might want to use
    // getStaticProps or a similar approach for better performance
    const fetchPosts = async () => {
      try {
        // In a real Next.js app, you'd use an API route to get this data
        // For simplicity in this demo, we're importing the function directly
        // but this would normally be a fetch call to an API endpoint
        const blogPosts = await fetch('/api/blog-posts')
          .then(res => res.json())
          .catch(() => {
            // Fallback data if API route isn't set up yet
            return [
              {
                title: "The Science Behind Language Learning with AI",
                description: "Discover how artificial intelligence is revolutionizing the way we learn languages and making the process more efficient and personalized.",
                image: "/blog/ai-learning.jpg",
                author: "Dr. Sarah Chen",
                date: "Feb 20, 2025",
                readTime: "5 min read",
                category: "Technology",
                slug: "science-behind-language-learning-ai"
              },
              {
                title: "5 Tips for Maintaining Language Learning Motivation",
                description: "Stay motivated on your language learning journey with these proven strategies and practical tips for consistent progress.",
                image: "/blog/motivation.jpg",
                author: "Michael Rodriguez",
                date: "Feb 15, 2025",
                readTime: "4 min read",
                category: "Learning Tips",
                slug: "tips-maintaining-language-learning-motivation"
              },
              {
                title: "The Role of Conversation in Language Acquisition",
                description: "Understanding why conversation practice is crucial for language learning and how it affects your brain's language processing.",
                image: "/blog/conversation.jpg",
                author: "Emma Watson",
                date: "Feb 10, 2025",
                readTime: "6 min read",
                category: "Research",
                slug: "role-conversation-language-acquisition"
              },
              {
                title: "Cultural Immersion: The Secret Ingredient in Language Learning",
                description: "Discover how understanding cultural context accelerates language acquisition and makes the learning process more meaningful and enjoyable.",
                image: "/blog/cultural-immersion.jpg",
                author: "Sophia Martinez",
                date: "Feb 25, 2025",
                readTime: "7 min read",
                category: "Cultural Insights",
                slug: "cultural-immersion-language-learning"
              },
              {
                title: "Spaced Repetition: The Science of Never Forgetting",
                description: "Learn how to implement the powerful spaced repetition technique to remember vocabulary and grammar permanently.",
                image: "/blog/spaced-repetition.jpg",
                author: "Dr. James Wilson",
                date: "Mar 5, 2025",
                readTime: "5 min read",
                category: "Learning Techniques",
                slug: "spaced-repetition-language-learning"
              }
            ];
          });
        
        setPosts(blogPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('blog.title')}
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col space-y-4"
            >
              <div className="relative h-48 overflow-hidden rounded-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="text-primary font-medium">{post.category}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    <time dateTime={post.date}>{post.date}</time>
                  </span>
                </div>
                <div className="group-hover:text-primary">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center gap-x-4 text-sm">
                  <div className="flex items-center gap-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime.replace('min read', t('blog.readTime'))}</span>
                  </div>
                </div>
              </div>
              <a href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">{t('blog.viewArticle')}</span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t('blog.contribute')}{" "}
            <a href="/contact" className="text-primary hover:underline">
              {t('blog.contactUs')}
            </a>
          </p>
        </div>
      </div>
    </motion.main>
  )
}
