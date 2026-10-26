// src/app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    if (!tag) {
      return NextResponse.json({ revalidated: false, message: 'Tag parameter missing' }, { status: 400 });
    }

    // ✅ Cache clear
    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  } catch (err) {
    return NextResponse.json({ revalidated: false, error: err.message }, { status: 500 });
  }
}