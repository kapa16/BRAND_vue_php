<?php

namespace App\Controllers\Api;

class Product extends ApiController
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

        if ($action) {
            $action = 'action' . $action;
            $this->$action();
        }

        if ($this->data) {
            echo $this->success();
        } else {
            echo $this->error();
        }
    }
}