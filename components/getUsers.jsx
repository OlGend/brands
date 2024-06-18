// Это больше не компонент React, а асинхронная функция для получения данных брендов.
export const getUsers = async (y) => {


  try {
    const res = await fetch("https://bonusnumber1.com/api/user/get_user_status.php");

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
