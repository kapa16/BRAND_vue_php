<?php

namespace App\Controllers;

class ProductController
{

    protected const TEMPLATE_NAME = 'product.twig';

    public function __invoke()
    {
        return $this->getView([]);
    }
}