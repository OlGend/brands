"use client";
import React, { useState, useEffect } from "react";
import { getUsers } from "@/components/getUsers";
import { updatePaymentStatusInDB } from "@/components/pushPayment";

const Notification = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await getUsers();
        console.log(usersData.records);
        const transformedUsers = usersData.records.map(user => ({
          ...user,
          status_payment: JSON.parse(user.status_payment)
        }));
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

  const handleUpdateStatus = async (userId, USD, time, method, sumIn) => {
    await updatePaymentStatusInDB(userId, USD, time, method, sumIn, () => {
      // Удаляем пользователя из списка или обновляем его данные
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    });
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
          Currency
        </p>
        <p className="py-2 px-1 w-24 flex justify-center items-center">
          Sum in currency
        </p>
        <p className="py-2 px-1 w-24 flex justify-center items-center">
          Sum in USD
        </p>
      </div>
      {users.map((user, index) => (
      
        <div className={`brand relative flex mb-3`} key={index}>
          <p className="py-2 px-1 w-12 flex justify-center items-center">
            {index}
          </p>
          <p className="py-2 px-1 w-64 flex justify-center items-center">
            {user.id}
          </p>
          <p className="py-2 px-1 w-64 flex justify-center items-center">
            {user.status_payment.timestamp}
          </p>
          <p className="py-2 px-1 w-24 flex justify-center items-center">
            {user.status_payment.paymentMethod}
          </p>
          <p className="py-2 px-1 w-24 flex justify-center items-center">
            {user.status_payment.paymentSumIn}
          </p>
          <p className="py-2 px-1 w-24 flex justify-center items-center">
            {user.status_payment.USD}
          </p>
          <button
            // onClick={() =>
            //   handlePayoutRequest(
            //     user.status_payment.paymentMethod,
            //     user.status_payment.paymentAddress,
            //     user.status_payment.paymentSumIn,
            //     user.id
            //   )
            // }
            onClick={() => handleUpdateStatus(user.id, user.status_payment.USD, user.status_payment.timestamp, user.status_payment.paymentMethod, user.status_payment.paymentSumIn)}
            className="btn btn-search w-28"
          >
            Aprove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
