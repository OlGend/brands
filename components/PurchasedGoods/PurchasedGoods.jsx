"use client";
import React, { useState, useEffect } from "react";
import { getUsers } from "@/components/getUsers";
import { updatePaymentStatusInDB } from "@/components/pushPayment";

const PurchasedGoods = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await getUsers();
        console.log(usersData.records);
        // Трансформируем пользователей, оставляя только транзакции со статусом "Waiting"
        const transformedUsers = usersData.records.map((user) => ({
          ...user,
          status_payment: tryParseJSON(user.status_payment).filter(
            (payment) =>
              payment.status === "Waiting" &&
              !(
                payment.paymentMethod === "USDTTRC20" ||
                payment.paymentMethod === "LTC"
              )
          ),
        }));

        function tryParseJSON(jsonString) {
          try {
            var o = JSON.parse(jsonString);

            // Если o - объект и не null
            if (o && typeof o === "object") {
              return o;
            }
          } catch (e) {}

          // Если разбор не удался, возвращаем пустой массив
          return [];
        }
        setUsers(transformedUsers);
      } catch (err) {
        setError(err.message || "Произошла ошибка при загрузке данных.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const handleUpdateStatus = async (
    paymentMethod,
    paymentAddress,
    paymentSumIn,
    userId,
    USD,
    timestamp
  ) => {
    await updatePaymentStatusInDB(
      paymentMethod,
      paymentAddress,
      paymentSumIn,
      userId,
      USD,
      timestamp,
      () => {
        // Обновляем данные пользователя, удаляя только одобренную транзакцию
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  // Фильтруем транзакции, оставляя все, кроме одобренной
                  status_payment: user.status_payment.filter(
                    (payment) => payment.timestamp !== timestamp
                  ),
                }
              : user
          )
        );
      }
    );
  };

  console.log("users", users);

  return (
    <div className="brands flex flex-col overflow-y-scroll relative">
      <div className="brand flex mb-3">
        <p className="py-2 px-1 w-12 flex justify-center items-center">#</p>
        <p className="py-2 px-1 w-64 flex justify-center items-center">
          USER ID
        </p>
        <p className="py-2 px-1 w-64 flex justify-center items-center">
          Time creating
        </p>
        <p className="py-2 px-1 w-24 flex justify-center items-center">
          Card name
        </p>
        <p className="py-2 px-1 w-48 flex justify-center items-center">email</p>
        <p className="py-2 px-1 w-24 flex justify-center items-center">
          Sum in USD
        </p>
      </div>

      {users.map((user) =>
        user.status_payment.map((payment, paymentIndex) => (
          <div
            className="brand relative flex mb-3"
            key={`${user.id}-${paymentIndex}`}
          >
            <p className="py-2 px-1 w-12 flex justify-center items-center">
              {paymentIndex + 1}
            </p>
            <p className="py-2 px-1 w-64 flex justify-center items-center">
              {user.id}
            </p>
            <p className="py-2 px-1 w-64 flex justify-center items-center">
              {payment.timestamp}
            </p>
            <p className="py-2 px-1 w-24 flex justify-center items-center">
              {payment.paymentMethod}
            </p>
            <p className="py-2 px-1 w-48 flex justify-center items-center">
              {payment.paymentAddress}
            </p>
            <p className="py-2 px-1 w-24 flex justify-center items-center">
              {payment.USD}
            </p>
            <button
              onClick={() =>
                handleUpdateStatus(
                  payment.paymentMethod,
                  payment.paymentAddress,
                  payment.paymentSumIn,
                  user.id,
                  payment.USD,
                  payment.timestamp
                )
              }
              className="btn btn-search w-28"
            >
              Aprove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchasedGoods;

