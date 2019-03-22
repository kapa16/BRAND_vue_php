<?php

namespace App\Controllers;

class IndexController extends Controller
{
    protected const TEMPLATE_NAME = 'index.twig';

    public function __invoke()
    {
        return $this->getView([]);
    }
}