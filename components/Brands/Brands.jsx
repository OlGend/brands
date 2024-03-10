"use client";
import React, { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands";
import { useBrand } from "@/components/Brands/BrandContext";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { setSelectedBrand: setGlobalSelectedBrand } = useBrand();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filter, setFilter] = useState({
    Tech: "",
    CasinoBrand: "",
    GEO: "",
    CurrentStatus: "",
    id_brand: "",
  });

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getBrands();
      setBrands(brandsData.brandsNew);
      setFilteredBrands(brandsData.brandsNew); // Инициализируйте отфильтрованные бренды всеми брендами
      if (brandsData.brandsNew && brandsData.brandsNew.length > 0) {
        setSelectedBrand(brandsData.brandsNew[0]);
        setGlobalSelectedBrand(brandsData.brandsNew[0]);
      }
    };

    fetchBrands();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Если поле GEO, то преобразуем значение к верхнему регистру
    const newValue = name === "GEO" ? value.toUpperCase() : value;
    setFilter((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSearch = () => {
    const { Tech, CasinoBrand, GEO, CurrentStatus, id_brand } = filter;
    const result = brands.filter(
      (brand) =>
        (Tech ? brand.Tech.includes(Tech) : true) &&
        (CasinoBrand ? brand.CasinoBrand.includes(CasinoBrand) : true) &&
        (GEO ? brand.GEO.includes(GEO) : true) &&
        (CurrentStatus ? brand.CurrentStatus.includes(CurrentStatus) : true) &&
        (id_brand ? brand.id_brand.includes(id_brand) : true)
    );
    setFilteredBrands(result);

    // Сброс фильтров после поиска
    setFilter({
      Tech: "",
      CasinoBrand: "",
      GEO: "",
      CurrentStatus: "",
      id_brand: "",
    });
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand); // Обновление локального состояния выбранного бренда
    setGlobalSelectedBrand(brand); // Обновление глобального состояния выбранного бренда
  };

  return (
    <div>
      <p className="count mb-2">
        Count: <strong>{filteredBrands.length}</strong>
      </p>
      <div className="filters brand flex mb-3">
        <p className="py-2 px-1 w-12 flex justify-center items-center">#</p>
        <input
          type="text"
          name="Tech"
          placeholder="Tech"
          value={filter.Tech}
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
                {brand.Tech}
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
  );
};

export default Brands;
