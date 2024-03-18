const authenticateUser = async () => {
  try {
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

    const authResponse = await fetch(
      "https://api.nowpayments.io/v1/auth",
      requestOptions
    );

    if (authResponse.ok) {
      const authData = await authResponse.json(); // Извлекаем данные из ответа как объект
      const authToken = authData.token; // Извлекаем значение токена из объекта

      return authToken;
    } else {
      console.error("Failed to authenticate user:", authResponse.status);
      // Возможно, здесь стоит бросить ошибку или выполнить другие действия в зависимости от вашего потока управления
    }
  } catch (error) {
    console.error("Error during user authentication:", error);
    // То же самое - обработайте ошибку в соответствии с вашими потребностями
  }
};
// Предполагается, что функция authenticateUser уже определена в другом месте вашего приложения

// И вызови эту функцию в handlePayoutRequest после успешной выплаты

export const handlePayoutRequest = async (
  paymentMethod,
  address,
  amount,
  user
) => {
  try {
    const jwtToken = await authenticateUser();
    if (!jwtToken) {
      throw new Error("Authentication failed");
    }

    const payoutData = {
      ipn_callback_url: "https://nowpayments.io",
      withdrawals: [
        {
          address,
          currency: paymentMethod,
          amount: parseFloat(amount),
          ipn_callback_url: "https://nowpayments.io",
          userData: user.id,
        },
      ],
    };

    const response = await fetch("https://api.nowpayments.io/v1/payout", {
      method: "POST",
      headers: {
        "x-api-key": "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(payoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // const dataToServer = {
      //   userId: user.id, // Используйте userId, если ваш серверный код ожидает ключ userId
      //   paymentDetails: {
      //     paymentMethod,
      //     address,
      //     amount
      //   }
      // };

      // updatePaymentStatusInDB(dataToServer);
      throw new Error(errorData.message || "Failed to make payout request");
    }

    const result = await response.json();
    console.log("Withdrawal successful", result);
    // Здесь можно обновить состояние UI, например, показать сообщение об успехе
  } catch (error) {
    console.error("Error during payout request:", error);
    // Обработка ошибок, например, показать сообщение об ошибке в UI
  }
};

export const updatePaymentStatusInDB = async (userId, USD, time, method, sum, callback) => {
  try {
    const response = await fetch("https://pickbonus.myawardwallet.com/api/user/update_history.php", {
      // Укажи правильный URL к твоему API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        paymentDetails: {
          USD,
          time,
          method,
          sum
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update payment status");
    }

    // Обработка успешного ответа
    console.log("Payment status updated successfully");
    if (callback) callback();
  } catch (error) {
    console.error("Error updating payment status:", error);
  }
};
