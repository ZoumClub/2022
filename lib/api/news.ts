import { NewsArticle } from '@/types/news';
import { fetchData } from './client';

export async function fetchNews(): Promise<NewsArticle[]> {
  return fetchData<NewsArticle>('news_articles');
}