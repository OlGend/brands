
async function getIp() {
  let defLng;
  try {
    const response = await fetch("https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW");
    const data = await response.json();
    if (typeof window !== "undefined") {
      localStorage.setItem("country", data.country);
    }
    // defLng = data.country.toLowerCase();
    defLng = data.country;

  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    defLng = "au"; // Установка значения по умолчанию в случае ошибки
  }
  return defLng; // Возвращаем defLng
}

export default getIp;



