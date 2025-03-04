<?php
// articles_list.php
$allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001"
  ];
  
  if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
  }
  
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Если это OPTIONS-запрос (предварительный запрос CORS), завершаем выполнение
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
session_start();
// if (!isset($_SESSION['admin'])) {
//     http_response_code(401);
//     exit;
// }

require 'db.php';

$stmt = $pdo->query("SELECT * FROM articles");
$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($articles);
?>
