<?php
// article_detail.php
// session_start();
// if (!isset($_SESSION['admin'])) {
//     http_response_code(401);
//     exit;
// }
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

require 'db.php';

$id = $_GET['id']; // убедитесь, что идёт фильтрация/валидация

$stmt = $pdo->prepare("SELECT * FROM articles WHERE id = :id");
$stmt->execute([':id' => $id]);
$article = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$article) {
    http_response_code(404);
    echo json_encode(['error' => 'Статья не найдена']);
    exit;
}

$stmt2 = $pdo->prepare("SELECT language_code, title, content FROM article_translations WHERE article_id = :id");
$stmt2->execute([':id' => $id]);
$translations = $stmt2->fetchAll(PDO::FETCH_ASSOC);

$article['translations'] = $translations;
echo json_encode($article);
?>
