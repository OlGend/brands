"use client";
import { useEffect } from "react";

const useFetchUrl = () => {
  useEffect(() => {
    const fetchUrl = async () => {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";
      const url = new URL(currentUrl);
      const urlParams = new URLSearchParams(url.search);
      const keyword = urlParams.get("keyword"); // Получаем значение параметра 'keyword'

      if (keyword) {
        // Сохраняем значение параметра 'keyword' в localStorage
        localStorage.setItem("keyword", keyword);
        console.log("Keyword Saved:", keyword);

        // Проверяем, содержит ли 'keyword' подстроку 'partner1039'
        if (keyword.includes("partner1039")) {
          // Если содержит, сохраняем в localStorage 'source' как 'partner1039'
          localStorage.setItem("source", "partner1039");
          console.log("Source Set to partner1039");
        } else {
          // Если не содержит 'partner1039', устанавливаем 'source' равным '0'
          localStorage.setItem("source", "0");
          console.log("Source Set to 0");
        }
      } else {
        console.log("No Keyword Found");
        // Если параметр 'keyword' отсутствует, можно также решить, нужно ли устанавливать 'source' в '0'
        // localStorage.setItem("source", "0"); // Раскомментируйте, если это необходимо
      }

      // Обрезаем URL, удаляя параметры строки запроса
      const newUrl = url.origin + url.pathname;
      if (typeof window !== "undefined") {
        window.history.replaceState({}, document.title, newUrl);
        console.log("URL Updated:", newUrl);
      }
    };

    fetchUrl();
  }, []); // Пустой массив зависимостей гарантирует, что эффект выполнится только один раз после первого рендеринга
};

export default useFetchUrl;
