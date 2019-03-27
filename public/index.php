<?php

require_once '../vendor/autoload.php';
$ctrl = $_GET['ctrl'] ?? 'Index';
$ctrl = str_replace('_', '\\', $ctrl);
$className = '\App\Controllers\\' . $ctrl;
$controller = new $className();
$controller();
