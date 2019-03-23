<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;

class Product extends Controller
{

    protected function actionGetProducts()
    {
        $limitFrom = +$_GET['from'] ?? 0;
        $limitTo = +$_GET['to'] ?? 0;
        $products = \App\Models\Products\Product::getLimit($limitFrom, $limitTo);
        return json_encode($products);
    }

    protected function actionGetCountProducts(): string
    {
        $countRows = \App\Models\Products\Product::getCountRows();
        return '{
        "result": 1,
        "data": "' . $countRows . '"
        }';
    }

    public function __invoke()
    {
        $action = $_GET['action'] ?? '';

        switch ($action) {
            case 'getproducts':
                echo $this->actionGetProducts();
                break;
            case 'countproducts':
                echo $this->actionGetCountProducts();
                break;
            default:
                echo '{"result": 0}';
        }
    }
}