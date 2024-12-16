import { NewsArticle } from '@/types/news';
import { fetchNews } from '@/lib/api/news';
import { useApi } from './useApi';

export function useNews() {
  return useApi<NewsArticle>(fetchNews, {
    errorMessage: 'Failed to load news articles',
  });
}