<?php
// login.php
session_start();
require 'db.php'; // подключение к базе через PDO

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username'], $data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверные данные']);
    exit;
}

$username = $data['username'];
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :username");
$stmt->execute([':username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password_hash'])) {
    $_SESSION['admin'] = true;
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Неверный логин или пароль']);
}
?>
