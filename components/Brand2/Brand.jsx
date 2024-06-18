"use client";
import React, { useState, useEffect } from "react";
import { useBrand } from "@/components/Brands2/BrandContext";
import Image from "next/image";

const Brand = () => {
  const { selectedBrand } = useBrand();
  const [DepositMethods, setDepositMethods] = useState("");
  const [WithdrawalMethods, setWithdrawalMethods] = useState("");
  const [RestrictedCountries, setRestrictedCountries] = useState("");
  const [WithdrawalLimits, setWithdrawalLimits] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [categories, setCategories] = useState("");

  // Обновляем состояния при изменении selectedBrand
  useEffect(() => {
    if (selectedBrand) {
      setDepositMethods(selectedBrand.DepositMethods || "");
      setWithdrawalMethods(selectedBrand.WithdrawalMethods || "");
      setRestrictedCountries(selectedBrand.RestrictedCountries || "");
      setWithdrawalLimits(selectedBrand.WithdrawalLimits || "");
      setAdvantages(selectedBrand.advantages || "");
      setCategories(selectedBrand.categories || "");
    }
  }, [selectedBrand]);

  // Функция для обработки отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://bonusnumber1.com/api/brandsNew2/update_brands.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          Tech: selectedBrand.Tech,
          CasinoBrand: selectedBrand.CasinoBrand, // Используйте CasinoBrand из selectedBrand
          CurrentStatus: selectedBrand.CurrentStatus,
          Sandbox: selectedBrand.Sandbox,
          GEO: selectedBrand.GEO,
          LinkImg: selectedBrand.LinkImg,
          Segment2: selectedBrand.Segment2,
          FirstPriority: selectedBrand.FirstPriority,
          Trendsetting: selectedBrand.Trendsetting,
          Hottest: selectedBrand.Hottest,
          QuickSignUp: selectedBrand.QuickSignUp,
          id_brand: selectedBrand.id_brand, // Используйте id_brand из selectedBrand
          review: selectedBrand.review,
          categories: categories, // Из состояния компонента
          categories_value: selectedBrand.categories_value, // Если это требуется отправить
          WithdrawalLimits: WithdrawalLimits, // Из состояния компонента
          advantages: advantages, // Из состояния компонента
          DepositMethods: DepositMethods, // Из состояния компонента
          WithdrawalMethods: WithdrawalMethods, // Из состояния компонента
          RestrictedCountries: RestrictedCountries, // Из состояния компонента
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Данные бренда успешно обновлены.");
        console.log(result);
        // Здесь можете обновить состояние в контексте, если необходимо
      } else {
        // Обработка ответа, если сервер вернул ошибку
        alert("Не удалось обновить данные бренда.");
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      alert("Произошла ошибка при обновлении данных.");
    }
  };

  if (!selectedBrand) return <div>Loading...</div>;

  console.log(selectedBrand);

  return (
    <div className="brand-review flex flex-col items-start relative">
      <div className="flex">
        <Image
          className="mb-3"
          width={100}
          height={100}
          src={selectedBrand.LinkImg}
          alt={selectedBrand.CasinoBrand}
        />
        <div className="id ml-3 flex flex-col"><span>id: {selectedBrand.id_brand}</span><span>Geo: {selectedBrand.GEO}</span></div>
      </div>
      <form onSubmit={handleSubmit} className="w-full overflow-y-scroll">
        <label htmlFor="categories" className="block">
          Categories:
        </label>
        <textarea
          id="categories"
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="mb-3"
        />

        <label htmlFor="WithdrawalLimits" className="block">
          Withdrawal Limits:
        </label>
        <textarea
          id="WithdrawalLimits"
          type="text"
          value={WithdrawalLimits}
          onChange={(e) => setWithdrawalLimits(e.target.value)}
          className="mb-3"
        />

        <label htmlFor="advantages" className="block">
          Advantages:
        </label>
        <textarea
          id="advantages"
          type="text"
          value={advantages}
          onChange={(e) => setAdvantages(e.target.value)}
          className="mb-3"
        />
        <label htmlFor="DepositMethods" className="block">
          Deposit Methods:
        </label>
        <textarea
          id="DepositMethods"
          type="text"
          value={DepositMethods}
          onChange={(e) => setDepositMethods(e.target.value)}
          className="mb-3"
        />

        <label htmlFor="WithdrawalMethods" className="block">
          Game Providers:
        </label>
        <textarea
          id="WithdrawalMethods"
          type="text"
          value={WithdrawalMethods}
          onChange={(e) => setWithdrawalMethods(e.target.value)}
          className="mb-3"
        />

        <label htmlFor="RestrictedCountries" className="block">
          Restricted Countries:
        </label>
        <textarea
          id="RestrictedCountries"
          type="text"
          value={RestrictedCountries}
          onChange={(e) => setRestrictedCountries(e.target.value)}
          className="mb-3"
        />

        <button
          type="submit"
          className="px-4 py-2 btn btn-edit text-white absolute"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Brand;
