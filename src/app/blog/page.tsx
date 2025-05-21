import { Clock, User } from "lucide-react"
import { BlogPost, getBlogPosts } from "@/lib/blog"
import Link from "next/link"
import { getAssetPath } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog - PollyTalkie',
  description: 'Read the latest articles about language learning, AI, and more',
}

export default function BlogPage() {
  // Get blog posts at build time
  const posts = getBlogPosts();
  
  // Use dictionary for translations (simplified for this example)
  const translations: Record<string, string> = {
    'blog.title': 'Blog',
    'blog.subtitle': 'Latest articles about language learning, AI, and more',
    'blog.readTime': 'min read',
    'blog.viewArticle': 'View article',
    'blog.contribute': 'Want to contribute to our blog?',
    'blog.contactUs': 'Contact us',
  };
  
  // Simple translation function
  const t = (key: string): string => translations[key] || key;

  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-background">
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
          {posts.map((post: BlogPost, index: number) => (
            <Link href={`/blog/${post.slug}/`} key={post.slug} className="block">
              <article className="group relative flex flex-col space-y-4 cursor-pointer">
                <div className="relative h-48 overflow-hidden rounded-lg">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${getAssetPath(post.image)})`,
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
                <span className="sr-only">{t('blog.viewArticle')}</span>
              </article>
            </Link>
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
    </main>
  );
}
