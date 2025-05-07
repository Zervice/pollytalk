import { NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/blog';

// Configure for static export
export const dynamic = 'force-static';

// Define the context type for dynamic route parameters
type Context = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: Request, context: Context) {
  try {
    // Await the params Promise to get the slug
    const params = await context.params;
    const { slug } = params;
    
    const post = getBlogPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
