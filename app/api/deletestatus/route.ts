// // // API-эндпоинт в Next.js для обновления статуса выплаты.

// // // API-эндпоинт в Next.js для обновления статуса выплаты.


// // Импорт типов для API роутов
// import type { NextApiRequest, NextApiResponse } from 'next';
// import pool from "@/app/libs/mysql";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // Проверяем, что метод запроса - POST
//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { id: userId, paymentDetails } = req.body;
//   console.log(userId, paymentDetails)

//   try {
//     const db = await pool.getConnection();
//     const query = `
//           UPDATE users
//           SET payment_history = 'UpdatedNew22', status_payment = NULL
//           WHERE id = ?;
//         `;
//     // Здесь предполагается, что 'test_vk1' - это идентификатор пользователя. Замените это на нужное значение.
//     await db.query(query, ["test_vk1"]);

//     // Возвращаем успешный ответ
//     res.status(200).json({ message: "Статус выплаты успешно обновлен" });
//   } catch (error) {
//     console.error("Ошибка при обновлении статуса выплаты:", error);
//     res.status(500).json({ error: "Ошибка при обновлении данных" });
//   } finally {
//     if (db) await db.release();
//   }
// }

// // Для Next.js API роутов обычно используют export default
// // export default POST;



// // import pool from "@/app/libs/mysql";
// // import { NextResponse, NextRequest } from "next/server"; // Импортируем NextResponse для ответа.

// // export async function POST(req: NextRequest, res: NextResponse) {
// //   // Проверяем, что метод запроса - POST.
// //   if (req.method !== "POST") {
// //     // Устанавливаем разрешенные методы для ответа.
// //     res.setHeader("Allow", ["POST"]);
// //     return res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }

// //   const { userId, paymentDetails } = req.body; // Получаем данные из запроса.
// //   console.log("UUUUU", userId)
// //   let db;
// //   try {
// //     db = await pool.getConnection();
// //     const query = `
// //           UPDATE users
// //           SET payment_history = JSON_SET(IFNULL(payment_history, '[]'), CONCAT('$[', COALESCE(JSON_LENGTH(payment_history), 0), ']'), ?),
// //               status_payment = NULL
// //           WHERE id = ?
// //         `;
// //     const paymentDetailsString = JSON.stringify(paymentDetails);
// //     await db.query(query, [paymentDetailsString, paymentDetailsString, "test_vk1"]);

// //     // Возвращаем успешный ответ с использованием NextResponse для единообразия.
// //     return new NextResponse(
// //       JSON.stringify({ message: "Статус выплаты успешно обновлен" }),
// //       { status: 200, headers: { "Content-Type": "application/json" } }
// //     );
// //   } catch (error) {
// //     console.error("Ошибка при обновлении статуса выплаты:", error);
// //     return new NextResponse(
// //       JSON.stringify({ error: "Ошибка при обновлении данных" }),
// //       { status: 500, headers: { "Content-Type": "application/json" } }
// //     );
// //   } finally {
// //     if (db) await db.release();
// //   }
// // }
