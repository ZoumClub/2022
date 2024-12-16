import { NewsArticle } from '@/types';
import { api } from '@/lib/api/client';
import { useQuery } from '../query/useQuery';

export function useNews() {
  return useQuery<NewsArticle>('news', api.news.list);
}