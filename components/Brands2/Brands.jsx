"use client";
import React, { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands2";
import { useBrand } from "@/components/Brands2/BrandContext";
import Loader from "@/components/Loader/Loader";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { setSelectedBrand: setGlobalSelectedBrand } = useBrand();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filter, setFilter] = useState({
    categories: "",
    CasinoBrand: "",
    GEO: "",
    CurrentStatus: "",
    id_brand: "",
  });
  const [loading, setLoading] = useState(false);
  const fetchBrands = async () => {
    setLoading(true); // Начало загрузки

    try {
      // Сначала обновляем бренды
      await updateBrands();

      // После обновления запрашиваем актуальный список брендов
      const brandsData = await getBrands();
      if (brandsData.brandsNew && brandsData.brandsNew.length > 0) {
        setBrands(brandsData.brandsNew);
        setFilteredBrands(brandsData.brandsNew); // Инициализируем отфильтрованные бренды всеми брендами
        setSelectedBrand(brandsData.brandsNew[0]);
        setGlobalSelectedBrand(brandsData.brandsNew[0]);
      } else {
        console.log("Получен пустой список брендов");
      }
    } catch (error) {
      console.error(
        "Произошла ошибка при обновлении или получении брендов:",
        error
      );
    } finally {
      setLoading(false); // Загрузка завершена
    }
  };

  useEffect(() => {
    fetchBrands(); // Вызов fetchBrands при монтировании компонента
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Если поле GEO, то преобразуем значение к верхнему регистру
    const newValue = name === "GEO" ? value.toUpperCase() : value;
    setFilter((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSearch = () => {
    const { categories, CasinoBrand, GEO, CurrentStatus, id_brand } = filter;
    const result = brands.filter(
      (brand) =>
        (categories
          ? brand.categories &&
            brand.categories.toLowerCase().includes(categories.toLowerCase())
          : true) &&
        (CasinoBrand
          ? brand.CasinoBrand &&
            brand.CasinoBrand.toLowerCase().includes(CasinoBrand.toLowerCase())
          : true) &&
        (GEO
          ? brand.GEO && brand.GEO.toLowerCase().includes(GEO.toLowerCase())
          : true) &&
        (CurrentStatus
          ? brand.CurrentStatus &&
            brand.CurrentStatus.toLowerCase().includes(
              CurrentStatus.toLowerCase()
            )
          : true) &&
        (id_brand ? brand.id_brand && brand.id_brand.includes(id_brand) : true)
    );
    setFilteredBrands(result);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand); // Обновление локального состояния выбранного бренда
    setGlobalSelectedBrand(brand); // Обновление глобального состояния выбранного бренда
  };

  const updateBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://bonusnumber1.com/api/brandsNew2/rebrand.php",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при обновлении брендов");
      }

      const result = await response.json();
      console.log("Бренды успешно обновлены", result);
    } catch (error) {
      console.error("Произошла ошибка при обновлении брендов:", error);
    } finally {
      setLoading(false); // Гарантируем, что состояние загрузки будет сброшено в любом случае
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative">
          <button className="btn btn-update" onClick={fetchBrands}>
            Update Brands
          </button>
          <div>
            <p className="count mb-2">
              Count: <strong>{filteredBrands.length}</strong>
            </p>
            <div className="filters brand flex mb-3">
              <p className="py-2 px-1 w-12 flex justify-center items-center">
                #
              </p>
              <input
                type="text"
                name="categories"
                placeholder="Categories"
                value={filter.categories}
                onChange={handleFilterChange}
                className="py-2 px-3 w-64"
              />
              <input
                type="text"
                name="CasinoBrand"
                placeholder="Casino Name"
                value={filter.CasinoBrand}
                onChange={handleFilterChange}
                className="py-2 px-1 w-32"
              />
              <input
                type="text"
                name="GEO"
                placeholder="GEO"
                value={filter.GEO}
                onChange={handleFilterChange}
                className="py-2 px-1 w-12"
              />
              <select
                name="CurrentStatus"
                value={filter.CurrentStatus}
                onChange={handleFilterChange}
                className="py-2 px-1 w-32"
              >
                <option value="">Current Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Stop">Stop</option>
                <option value="Hold">Hold</option>
              </select>
              <input
                type="text"
                name="id_brand"
                placeholder="Id"
                value={filter.id_brand}
                onChange={handleFilterChange}
                className="py-2 px-1 w-12"
              />
              <button className="btn btn-search" onClick={handleSearch}>
                Search
              </button>
            </div>

            <div>
              <div className="brands flex flex-col overflow-y-scroll relative">
                {filteredBrands.map((brand, index) => (
                  <div
                    onClick={() => handleBrandClick(brand)}
                    className={`brand relative flex mb-3`}
                    key={index}
                  >
                    <p className="py-2 px-1 w-12 flex justify-center items-center">
                      {index}
                    </p>
                    <p className="py-2 px-1 w-64 flex justify-center items-center">
                      {brand.categories}
                    </p>
                    <p className="py-2 px-1 w-32 flex justify-center items-center">
                      {brand.CasinoBrand}
                    </p>
                    <p className="py-2 px-1 w-12 flex justify-center items-center">
                      {brand.GEO}
                    </p>
                    <p className="py-2 px-1 w-32 flex justify-center items-center">
                      {brand.CurrentStatus}
                    </p>
                    <p className="py-2 px-1 w-12 flex justify-center items-center">
                      {brand.id_brand}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Brands;
