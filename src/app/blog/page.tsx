'use client'

import { motion } from "framer-motion"
import { CalendarIcon, Clock, User } from "lucide-react"

const posts = [
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
]

export default function BlogPage() {
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
            PollyChat Blog
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            Insights and tips for better language learning
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-primary/20">
                  PollyChat
                </div>
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
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              <a href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View article</span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Want to contribute to our blog?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </motion.main>
  )
}
