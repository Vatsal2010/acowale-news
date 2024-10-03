import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'example'; // Default to 'example' if no query

  const apikey = '246552eb269025713c3b2eea76a63964'; // Replace with your GNews API Key
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=${apikey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
