// app/components/ArticleForm.jsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Динамически импортируем React Quill для отключения SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ArticleForm({ initialData = {}, onSubmit }) {
  const [slug, setSlug] = useState(initialData.slug || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [publicationDate, setPublicationDate] = useState(
    initialData.publication_date || ""
  );
  const [tags, setTags] = useState(
    Array.isArray(initialData.tags)
      ? initialData.tags.join(", ")
      : initialData.tags || ""
  );
  const [coverImage, setCoverImage] = useState(initialData.cover_image || "");
  const [translations, setTranslations] = useState(
    initialData.translations || []
  );

  // Добавление нового перевода
  const handleAddTranslation = () => {
    setTranslations([
      ...translations,
      { language_code: "", title: "", content: "" },
    ]);
  };

  const handleTranslationChange = (index, field, value) => {
    const newTranslations = [...translations];
    newTranslations[index][field] = value;
    setTranslations(newTranslations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      slug,
      category,
      publication_date: publicationDate,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      cover_image: coverImage,
      translations,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2 w-full bg-gray-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Категория</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full bg-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Дата публикации</label>
        <input
          type="datetime-local"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="border p-2 w-full bg-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Теги (через запятую)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 w-full bg-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Обложка (URL)</label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="border p-2 w-full bg-gray-500"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Переводы</h2>
        {translations.map((trans, index) => (
          <div key={index} className="border p-2 mb-2">
            <div className="mb-2">
              <label className="block mb-1">Язык (код)</label>
              <input
                type="text"
                value={trans.language_code}
                onChange={(e) =>
                  handleTranslationChange(
                    index,
                    "language_code",
                    e.target.value
                  )
                }
                className="border p-2 w-full bg-gray-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Заголовок</label>
              <input
                type="text"
                value={trans.title}
                onChange={(e) =>
                  handleTranslationChange(index, "title", e.target.value)
                }
                className="border p-2 w-full bg-gray-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Контент</label>
              {/* Используем ReactQuill вместо textarea */}
              <ReactQuill
                value={trans.content}
                onChange={(value) =>
                  handleTranslationChange(index, "content", value)
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTranslation}
          className="bg-gray-500 text-white py-1 px-3 rounded"
        >
          Добавить перевод
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Сохранить
      </button>
    </form>
  );
}
