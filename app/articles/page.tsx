// app/articles/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('https://bonusnumber1.com/api/articles/articles_list.php');
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        } else {
          console.error("Ошибка загрузки статей");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, []);

  const handleEdit = (id, e) => {
    e.stopPropagation();
    router.push(`/articles/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Статьи</h1>
        <Link href="/articles/new">
          <p className="bg-blue-500 text-white py-2 px-4 rounded">Создать статью</p>
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-500">
            <th className="py-2 border">ID</th>
            <th className="py-2 border">Slug</th>
            <th className="py-2 border">Категория</th>
            <th className="py-2 border">Дата публикации</th>
            <th className="py-2 border">Действия</th>
          </tr>
        </thead>
        <tbody className='bg-gray-700'>
          {articles.length ? (
            articles.map(article => (
              <tr
                key={article.id}
                className="cursor-pointer hover:bg-gray-500"
                onClick={() => router.push(`/articles/${article.id}`)}
              >
                <td className="py-2 border text-center">{article.id}</td>
                <td className="py-2 border pl-2">{article.slug}</td>
                <td className="py-2 border text-center">{article.category}</td>
                <td className="py-2 border text-center">{article.publication_date}</td>
                <td className="py-2 border text-center">
                  <button
                    onClick={(e) => handleEdit(article.id, e)}
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">Нет статей</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
