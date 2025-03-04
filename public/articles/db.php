<?php
$dsn = 'mysql:host=ny509616.mysql.tools;dbname=ny509616_test;charset=utf8mb4';
$username = 'ny509616_test';
$password = 'gN@M6;h7z7';

try {
    $pdo = new PDO($dsn, $username, $password);
    // Режим ошибок - исключения
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Выборка по умолчанию - ассоциативный массив
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}
?>
