// Это больше не компонент React, а асинхронная функция для получения данных брендов.
export const getBrands = async (y) => {
  const apiOld = "https://pickbonus.myawardwallet.com/api/brandsNew2/read_sheet.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brandsNew2/read_sheet.php";

  try {
    const res = await fetch("https://pickbonus.myawardwallet.com/api/brandsNew2/read_sheet.php");

    if (res.ok) {
      const responseData = await res.json();

      return responseData; // Возвращаем отфильтрованные данные
    } else {
      console.error("Failed to fetch data:", res.status);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
