import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const post = getBlogPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching blog post with slug: ${params.slug}`, error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
