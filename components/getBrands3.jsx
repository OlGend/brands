// Это больше не компонент React, а асинхронная функция для получения данных брендов.
export const getBrands = async (y) => {
  const apiOld = "https://bonusnumber1.com/api/brandsNew2/read_sheet.php";
  const apiNew = "https://bonusnumber1.com/api/brandsNew2/read_sheet.php";

  try {
    const res = await fetch("https://bonusnumber1.com/api/brandsNew3/read_sheet.php");

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
