<?php
// create_article.php
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
$data = json_decode(file_get_contents('php://input'), true);

// Валидация данных: проверка наличия slug, формата даты, что tags – массив и т.д.
$slug = $data['slug'];
$pubdate = $data['publication_date'];
$category = $data['category'];
$tags = json_encode($data['tags']);
$cover = $data['cover_image'];

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO articles (slug, publication_date, category, tags, cover_image) 
                           VALUES (:slug, :pubdate, :cat, :tags, :cover)");
    $stmt->execute([
        ':slug'    => $slug,
        ':pubdate' => $pubdate,
        ':cat'     => $category,
        ':tags'    => $tags,
        ':cover'   => $cover
    ]);
    $articleId = $pdo->lastInsertId();

    $stmtTrans = $pdo->prepare("INSERT INTO article_translations (article_id, language_code, title, content) 
                                VALUES (:id, :lang, :title, :content)");
    foreach ($data['translations'] as $trans) {
        $stmtTrans->execute([
            ':id'      => $articleId,
            ':lang'    => $trans['language_code'],
            ':title'   => $trans['title'],
            ':content' => json_encode($trans['content'])
        ]);
    }

    $pdo->commit();
    // Можно выполнить SELECT созданной статьи для возврата клиенту
    echo json_encode([
      'id' => $articleId,
      'slug' => $slug,
      'publication_date' => $pubdate,
      'category' => $category,
      'tags' => $data['tags'],
      'cover_image' => $cover,
      'translations' => $data['translations']
    ]);
} catch(Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при создании статьи: ' . $e->getMessage()]);
}
?>
