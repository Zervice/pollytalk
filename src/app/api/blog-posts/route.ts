import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  try {
    const posts = getBlogPosts();
    
    // Return only the metadata, not the full content
    const postsWithoutContent = posts.map(({ content, ...rest }) => rest);
    
    return NextResponse.json(postsWithoutContent);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
