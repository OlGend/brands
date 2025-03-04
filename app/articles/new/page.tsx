// app/articles/new/page.jsx
"use client";

import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export default function NewArticlePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch('https://bonusnumber1.com/api/articles/articles.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/articles');
      } else {
        console.error("Ошибка при создании статьи");
      }
    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Создать новую статью</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  );
}
