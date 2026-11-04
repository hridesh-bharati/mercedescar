// src/app/blogs/[id]/page.jsx
import { dbService } from '@/services/dbService';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mercedesgaragedubai.com';
const SITE_NAME = 'Mercedes Garage Dubai';

async function getBlog(id) {
  try {
    const res = await dbService.getAll('blogs');
    if (res.success && res.data) {
      return res.data.find((b) => b.id === id) || null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  const title = blog.title
    ? `${blog.title} | Mercedes Garage Dubai Blog`
    : `Mercedes Blog | ${SITE_NAME}`;

  const rawDesc = blog.content || '';
  const description =
    rawDesc
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 152)
      .replace(/\s+\S*$/, '') + '…';

  const image =
    blog.imageUrl || blog.image || `${SITE_URL}/images/servicesman.avif`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blogs/${resolvedParams.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs/${resolvedParams.id}`,
      siteName: SITE_NAME,
      images: [{ url: image, alt: blog.title }],
      locale: 'en_AE',
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author || 'Mercedes Garage Dubai'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  const image =
    blog.imageUrl || blog.image || `${SITE_URL}/images/servicesman.avif`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.content?.slice(0, 200),
    image: image,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Organization',
      name: blog.author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${resolvedParams.id}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `${SITE_URL}/blogs/${resolvedParams.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
      <BlogDetailClient blog={blog} blogId={resolvedParams.id} />
    </>
  );
}