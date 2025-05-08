'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function ClientRouter({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isRouting, setIsRouting] = useState(false)
  
  useEffect(() => {
    // Check if we have a route parameter from the 404.html redirect
    const routeParam = searchParams.get('route')
    
    if (routeParam && pathname === '/') {
      // We're at the root with a route parameter, so we need to route to the actual path
      setIsRouting(true)
      
      // Extract the blog slug if it's a blog post
      if (routeParam.startsWith('blogs/')) {
        const slug = routeParam.replace('blogs/', '')
        // Route to the blog post page with the slug as a query parameter
        router.replace(`/blog-post?slug=${slug}`)
      } else {
        // Route to the specified path
        router.replace(`/${routeParam}`)
      }
    }
  }, [pathname, router, searchParams])
  
  // Handle direct navigation to /blogs/slug paths
  useEffect(() => {
    if (pathname.startsWith('/blogs/')) {
      setIsRouting(true)
      const slug = pathname.replace('/blogs/', '')
      router.replace(`/blog-post?slug=${slug}`)
    }
  }, [pathname, router])
  
  // Show a loading state while routing
  if (isRouting) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  }
  
  return <>{children}</>
}
