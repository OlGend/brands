<?php

// необходимые HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// функция для отправки данных в Customer.IO
function sendToCustomerIO($userId, $customerId, $subject, $body) {
    // Определение siteId и apiKey на основе customerId
    switch ($customerId) {
        case 'GURU':
            $siteId = 'b0e62a74234c966830e3';
            $apiKey = '8603e3e2dbd3bac74072';
            break;
        case 'Topbonus':
            $siteId = 'c66fd63e6649019676fd';
            $apiKey = 'acc8ed37902664c0dab2';
            break;
        default:
            $siteId = 'b0e62a74234c966830e3';
            $apiKey = '8603e3e2dbd3bac74072';
            break;
    }

    // Подготовка данных события
    $eventName = 'sent_email'; // Замените на ваше имя события

    $credentials = $siteId . ':' . $apiKey;
    $base64Credentials = base64_encode($credentials);

    $url = 'https://track-eu.customer.io/api/v1/customers/' . $userId . '/events';
    $headers = [
        'Content-Type: application/json',
        'Authorization: Basic ' . $base64Credentials,
    ];

    $eventData = [
        'name' => $eventName,
        'data' => [
            'subject' => $subject,
            'body' => $body,
        ],
    ];

    $jsonDataWithEvent = json_encode($eventData);

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataWithEvent);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);

    if ($response === false) {
        logMessage('Curl error: ' . curl_error($curl));
        return false;
    } else {
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        if ($httpCode !== 200) {
            logMessage('CustomerIO error. HTTP Code: ' . $httpCode . ', Response: ' . $response);
            return false;
        } else {
            logMessage('Data sent to Customer.IO successfully.');
            return true;
        }
    }

    curl_close($curl);
}

function logMessage($message) {
    error_log($message); // Замените на вашу систему логирования
}

// Получение данных из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверка наличия необходимых данных
if (isset($data['userId']) && isset($data['customerId']) && isset($data['subject']) && isset($data['body'])) {
    $result = sendToCustomerIO($data['userId'], $data['customerId'], $data['subject'], $data['body']);
    if ($result) {
        // код ответа - 200 OK
        http_response_code(200);
        echo json_encode(["message" => "Data sent to Customer.IO successfully."]);
    } else {
        // код ответа - 500 Внутренняя ошибка сервера
        http_response_code(500);
        echo json_encode(["message" => "Failed to send data to Customer.IO."]);
    }
} else {
    // код ответа - 400 Неверный запрос
    http_response_code(400);
    echo json_encode(["message" => "Invalid input data."]);
}
?>
