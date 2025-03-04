<?php
// upload.php
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

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
$maxSize = 2 * 1024 * 1024; // 2MB

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Файл не был загружен']);
    exit;
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Ошибка загрузки файла']);
    exit;
}

if (!in_array(mime_content_type($file['tmp_name']), $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный тип файла']);
    exit;
}

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'Размер файла превышает допустимый лимит']);
    exit;
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_') . '.' . $extension;
$destination = __DIR__ . '/uploads/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    http_response_code(500);
    echo json_encode(['error' => 'Не удалось сохранить файл']);
    exit;
}

echo json_encode(['url' => '/uploads/' . $filename]);
?>
