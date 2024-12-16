"use client";

import { useState } from "react";
import { useNews } from "@/lib/hooks/useNews";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSection } from "@/components/ui/loading-section";
import { ErrorSection } from "@/components/ui/error-section";
import { NewsArticleDialog } from "@/components/dialogs/NewsArticleDialog";
import { formatDate } from "@/lib/utils";
import { NewsArticle } from "@/types/news";

export default function NewsSection() {
  const { data: articles, isLoading, error } = useNews();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  if (isLoading) {
    return <LoadingSection title="Car News" count={3} />;
  }

  if (error) {
    return <ErrorSection title="Car News" error={error} />;
  }

  if (!articles?.length) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Car News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(article.published_at)}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="px-0"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <NewsArticleDialog
        article={selectedArticle}
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}