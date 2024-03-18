

// import { NextResponse } from 'next/server';
// import pool from '@/app/libs/mysql';
// import { RowDataPacket, FieldPacket } from 'mysql2';

// export async function GET() {
//   let db;
//   try {
//     db = await pool.getConnection();
//     const query = 'SELECT * FROM users';
//     // Приведение к типу через unknown
//     const [rows] = await db.execute(query) as unknown as [RowDataPacket[], FieldPacket[]];

//     // Фильтрация и преобразование данных после получения из БД
//     const filteredRows = rows.filter((row) => {
//       // Попытка разобрать JSON, содержащийся в status_payment
//       try {
//         const statusPaymentData = JSON.parse(row.status_payment);
//         // Проверка наличия статуса "Waiting" в объекте
//         return statusPaymentData !== null;
//       } catch (e) {
//         // В случае ошибки разбора JSON, пропускаем эту запись
//         return false;
//       }
//     }).map((row) => {
//       // Преобразование строки в массив объектов
//       try {
//         row.status_payment = JSON.parse(row.status_payment);
//       } catch (e) {
//         row.status_payment = {}; // В случае ошибки присваиваем пустой объект
//       }
//       return row;
//     });
//     return NextResponse.json(filteredRows);
//   } catch (error) {
//     console.error('Ошибка при работе с базой данных:', error);
//     return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
//   } finally {
//     if (db) {
//       try {
//         await db.release();
//       } catch (releaseError) {
//         console.error('Ошибка при освобождении подключения:', releaseError);
//       }
//     }
//   }
// }
// // SHOW PROCESSLIST