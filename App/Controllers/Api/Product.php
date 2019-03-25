<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;

class Product extends Controller
{
    protected function actionGetProducts(): void
    {
        $limitFrom = +$_GET['from'] ?? 0;
        $limitTo = +$_GET['to'] ?? 0;
        $this->data = \App\Models\Products\Product::getLimit($limitFrom, $limitTo);
    }

    protected function actionGetCountProducts(): void
    {
        $this->data = \App\Models\Products\Product::getCountRows();
    }

    public function __invoke()
    {
        $action = $_GET['action'] ?? '';

        switch ($action) {
            case 'getproducts':
                $this->actionGetProducts();
                break;
            case 'countproducts':
                $this->actionGetCountProducts();
                break;
        }

        if ($this->data) {
            echo $this->success();
        } else {
            echo $this->error();
        }
    }
}