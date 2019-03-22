<?php

use \App\Controllers\IndexController;

require_once '../vendor/autoload.php';

$page = $_GET['page'] ?? '';

if ($page === 'product') {
    $controller = new IndexController('product.twig');
    echo $controller->actionIndex();
    exit;
}

$controller = new IndexController('index.twig');
echo $controller->actionIndex();