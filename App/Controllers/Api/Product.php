<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;

class Product extends Controller
{
    public function __invoke()
    {
        $limitFrom = +$_GET['from'] ?? 0;
        $limitTo = +$_GET['to'] ?? 0;
        $products = \App\Models\Products\Product::getLimit($limitFrom, $limitTo);
        echo json_encode($products);
    }
}