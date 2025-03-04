"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        // Предположим, что для получения статьи используется article_detail.php
        const res = await fetch(`https://bonusnumber1.com/api/articles/article_detail.php?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        } else {
          console.error("Ошибка загрузки статьи");
        }
      } catch (err) {
        console.error("Ошибка запроса:", err);
      }
    }
    if (id) fetchArticle();
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      // Для обновления используем update_article.php
      const res = await fetch(`https://bonusnumber1.com/api/articles/update_article.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/articles');
      } else {
        console.error("Ошибка при обновлении статьи");
      }
    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  if (!initialData) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Редактировать статью #{id}</h1>
      <ArticleForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
