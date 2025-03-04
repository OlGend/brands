<?php
// update_article.php
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
$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'), true);

// Проверка, что статья существует
$stmt = $pdo->prepare("SELECT id FROM articles WHERE id = :id");
$stmt->execute([':id' => $id]);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(['error' => 'Статья не найдена']);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("UPDATE articles SET 
      slug = :slug, 
      publication_date = :pubdate, 
      category = :cat, 
      tags = :tags, 
      cover_image = :cover, 
      updated_at = NOW() 
      WHERE id = :id");
    $stmt->execute([
        ':slug'    => $data['slug'],
        ':pubdate' => $data['publication_date'],
        ':cat'     => $data['category'],
        ':tags'    => json_encode($data['tags']),
        ':cover'   => $data['cover_image'],
        ':id'      => $id
    ]);

    // Обновляем переводы: удаляем старые и вставляем новые
    $stmtDel = $pdo->prepare("DELETE FROM article_translations WHERE article_id = :id");
    $stmtDel->execute([':id' => $id]);

    $stmtTrans = $pdo->prepare("INSERT INTO article_translations (article_id, language_code, title, content) 
                                VALUES (:id, :lang, :title, :content)");
    foreach ($data['translations'] as $trans) {
        $stmtTrans->execute([
            ':id'      => $id,
            ':lang'    => $trans['language_code'],
            ':title'   => $trans['title'],
            ':content' => json_encode($trans['content'])
        ]);
    }

    $pdo->commit();
    echo json_encode([
      'id' => $id,
      'slug' => $data['slug'],
      'publication_date' => $data['publication_date'],
      'category' => $data['category'],
      'tags' => $data['tags'],
      'cover_image' => $data['cover_image'],
      'translations' => $data['translations']
    ]);
} catch(Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при обновлении статьи: ' . $e->getMessage()]);
}
?>
