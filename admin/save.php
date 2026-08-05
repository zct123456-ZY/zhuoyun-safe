<?php
session_start();
require_once __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

if (empty($_SESSION['auth'])) {
    echo json_encode(['ok' => false, 'msg' => '未登录']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data || empty($data['type'])) {
    echo json_encode(['ok' => false, 'msg' => '参数错误']);
    exit;
}

$type = ($data['type'] === 'jobs') ? 'jobs' : 'news';
$action = isset($data['action']) ? $data['action'] : 'save';

if (!is_file(CONTENT_FILE)) {
    echo json_encode(['ok' => false, 'msg' => '内容文件不存在']);
    exit;
}

$content = json_decode(file_get_contents(CONTENT_FILE), true);
if (!isset($content[$type]) || !is_array($content[$type])) {
    $content[$type] = [];
}

if ($action === 'delete') {
    $id = isset($data['id']) ? (string) $data['id'] : '';
    $content[$type] = array_values(array_filter($content[$type], function ($x) use ($id) {
        return (string) $x['id'] !== $id;
    }));
} else {
    $item = isset($data['item']) ? $data['item'] : null;
    if (!is_array($item)) {
        echo json_encode(['ok' => false, 'msg' => '条目为空']);
        exit;
    }
    // 仅保留允许的文本字段，防止注入多余键
    $allowed = ['id', 'title', 'salary', 'location', 'type', 'deadline', 'date',
                'tags', 'summary', 'body', 'cat', 'catLabel'];
    $clean = [];
    foreach ($allowed as $k) {
        if (isset($item[$k])) {
            $clean[$k] = is_array($item[$k]) ? $item[$k] : (string) $item[$k];
        }
    }
    if (empty($clean['id'])) {
        $clean['id'] = ($type === 'jobs' ? 'j' : 'n') . time();
        $content[$type][] = $clean;
    } else {
        foreach ($content[$type] as &$x) {
            if ((string) $x['id'] === (string) $clean['id']) {
                $x = $clean;
                break;
            }
        }
    }
}

$fp = fopen(CONTENT_FILE, 'c');
if (flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    flock($fp, LOCK_UN);
    echo json_encode(['ok' => true, 'msg' => '已保存']);
} else {
    echo json_encode(['ok' => false, 'msg' => '写入锁失败']);
}
fclose($fp);
