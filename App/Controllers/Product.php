<?php

namespace App\Controllers;

class Product extends Controller
{
    protected const TEMPLATE_NAME = 'product.twig';

    public function __invoke()
    {
        echo $this->render([]);
    }
}