"use client";
import React, { useState, useEffect } from "react";
import { getUsers } from "@/components/getUsers";
import { updatePaymentStatusInDB } from "@/components/pushPayment";

const Withdrawals = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await getUsers();
        const cryptoPaymentMethods = ["USDTTRC20", "LTC"];
        const transformedUsers = usersData.records.map((user) => ({
          ...user,
          status_payment: tryParseJSON(user.status_payment).filter(
            (payment) =>
              payment.status === "Waiting" &&
              cryptoPaymentMethods.includes(payment.paymentMethod)
          ),
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

  function tryParseJSON(jsonString) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    } catch (e) {}
    return [];
  }

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  console.log("USERS", users);

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
    const authenticateUser = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: "and@karmabs.com",
        password: "Ytvn3daw!",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api.nowpayments.io/v1/auth",
          requestOptions
        );
        if (!response.ok) throw new Error("Authentication failed");
        const authData = await response.json();
        return `Bearer ${authData.token}`;
      } catch (error) {
        console.error("Error during user authentication:", error);
      }
    };

    const sendPayoutRequest = async (userId, amount, currency, address) => {
      const jwtToken = await authenticateUser();
      if (!jwtToken) {
        console.error("Authentication failed");
        return;
      }

      console.log("------", amount, currency, address);

      const payoutData = {
        ipn_callback_url: "https://nowpayments.io",
        withdrawals: [
          {
            address,
            currency,
            amount,
            ipn_callback_url: "https://nowpayments.io",
          },
        ],
      };

      try {
        const response = await fetch("https://api.nowpayments.io/v1/payout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC",
            Authorization: jwtToken,
          },
          body: JSON.stringify(payoutData),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const result = await response.json();
        console.log("Payout initiated:", result);
      } catch (error) {
        console.error("Failed to initiate payout:", error);
      }
    };
    sendPayoutRequest(userId, paymentSumIn, paymentMethod, paymentAddress);
  };

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
        <p className="py-2 px-1 w-48 flex justify-center items-center">
          Sum in currency
        </p>
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
              {payment.paymentSumIn}
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
            {/* <button
              onClick={() =>
                sendPayoutRequest(
                  user.id,
                  payment.paymentSumIn,
                  payment.paymentMethod,
                  payment.paymentAddress
                )
              }
            >
              Initiate Payout
            </button> */}
          </div>
        ))
      )}
    </div>
  );
};

export default Withdrawals;
